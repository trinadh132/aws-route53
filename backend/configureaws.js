require('dotenv').config({path: "C:\\Users\\Public\\fullstack\\DNS Webpage\\backend\\access.env"});
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});


const route53 = new AWS.Route53();
const route53domains = new AWS.Route53Domains();

module.exports = { route53, route53domains };