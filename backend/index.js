const express= require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const details= require('./models/model1.js');
const { createDNSRecords,deleteDNSRecords,listDNSRecords, updateDNSRecord } = require('./manageDomians.js');
const app= express();

app.use(cors());

mongoose.connect('mongodb+srv://ktrinadhgv369:Giresh%40369@dns.cfujzaa.mongodb.net/?retryWrites=true&w=majority&appName=dns')
  .then(() => console.log('Connected to database')).catch((err)=>console.log(err));

app.listen(3001,console.log("serever running succesfully"));

app.use(express.json())

app.post("/details",async(req,res)=>{
    const {name,email,phonenumber,password}=req.body;
    try {
        const id=uuidv4();
        const result = await details.create(
            {
                id:id,
                name:name,
                email:email,
                phonenumber:phonenumber,
                password:password,
            }
        )
        console.log(result);
        res.status(200).json(result);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

app.get("/details/:name",async(req,res)=>{
    const name= req.params.name;
    try {
        const result = await details.find({
            name:name,
        })
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
app.get("/dns",async(req,res)=>{
   const hostedZoneId='Z041476135ZEM73STQAYU';
    try {
        const result= await listDNSRecords(hostedZoneId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
app.post("/dns",async(req,res)=>{
    const {oldrecord,newRecord}=req.body;
    const hostedZoneId='Z041476135ZEM73STQAYU';
    try {
        const result=await updateDNSRecord(hostedZoneId,oldrecord,newRecord);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
})
app.delete("/dns",async(req,res)=>{
    const record=req.body;
    const hostedZoneId='Z041476135ZEM73STQAYU';
    try {
        const result=await deleteDNSRecords(hostedZoneId,record);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
})
app.post("/adddns",async(req,res)=>{
    const hostedZoneId='Z041476135ZEM73STQAYU';
    try {
        const result=await createDNSRecords(hostedZoneId,req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
})

app.put("/edit/:id",async(req,res)=>{
    const id=req.params.id
    try {
        const result = await details.findOne({id:id})
        const response = await details.findByIdAndUpdate(result._id,{name:req.body.name},{new:true}) 
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
    
})
app.put("/editp/:id",async(req,res)=>{
    const id=req.params.id
    try {
        const result = await details.findOne({id:id})
        const response = await details.findByIdAndUpdate(result._id,{password:req.body.new},{new:true}) 
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
    
})
app.get('/', (req, res) => {
    res.send('Hello World!');
});





