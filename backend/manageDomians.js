const { route53, route53domains } = require('./configureaws');

const createDNSRecords = async (hostedZoneId, records) => {
    const params = {
        HostedZoneId: hostedZoneId,
        ChangeBatch: {
            Changes: [{
                Action: 'UPSERT',
                ResourceRecordSet: {
                    Name: records.Name,
                    Type: records.Type,
                    TTL: records.TTL,
                    ResourceRecords:records.ResourceRecords
                }
            }]
        }
    };

    try {
        const data = await route53.changeResourceRecordSets(params).promise();
        console.log("DNS records created/updated:", data);
        return(data)
    } catch (err) {
        console.error("Error creating/updating DNS records:", err);
    }
};

const deleteDNSRecords = async (hostedZoneId, records) => {
    console.log(records)
    const params = {
        HostedZoneId: hostedZoneId,
        ChangeBatch: {
            Changes:[{
                Action: 'DELETE',
                ResourceRecordSet: {
                    Name: records.Name,
                    Type: records.Type,
                    TTL: records.TTL,
                    ResourceRecords: records.ResourceRecords
                }
            }]
        }
    };

    try {
        const data = await route53.changeResourceRecordSets(params).promise();
        console.log("DNS records deleted:", data);
        return(data);
    } catch (err) {
        console.error("Error deleting DNS records:", err);
    }
};
async function updateDNSRecord(hostedZoneId, oldRecord, newRecord) {
    if (oldRecord.Name !== newRecord.Name || oldRecord.Type !== newRecord.Type) {
        await deleteDNSRecords(hostedZoneId,  oldRecord);
    }
    

    return await createDNSRecords(hostedZoneId,  newRecord);
}

const listDNSRecords = async (hostedZoneId) => {
    const params = {
        HostedZoneId: hostedZoneId,

    };

    try {
        const records = [];
        let isTruncated = false;
        let nextRecordName, nextRecordType, nextRecordIdentifier;

        do {
            if (nextRecordName) {
                params.StartRecordName = nextRecordName;
                params.StartRecordType = nextRecordType;
                params.StartRecordIdentifier = nextRecordIdentifier;
            }

            const data = await route53.listResourceRecordSets(params).promise();
            records.push(...data.ResourceRecordSets);
            isTruncated = data.IsTruncated;
            if (isTruncated) {
                nextRecordName = data.NextRecordName;
                nextRecordType = data.NextRecordType;
                nextRecordIdentifier = data.NextRecordIdentifier;
            }
        } while (isTruncated);

        return records;
    } catch (err) {
        console.error("Error listing DNS records:", err);
    }
};

module.exports = {  createDNSRecords,deleteDNSRecords,listDNSRecords,updateDNSRecord };
