const mongoose =require("mongoose");


const signup= new mongoose.Schema(
    {

        id:{
            type:String,
            required:true,
        },
        name:{
            type:String,
            required: [true,"Please enter the Name"],
        },
        email:{
            type:String,
            required: true,
        },
        phonenumber:{
            type:String,
            required : true,
        },
        password:{
            type:String,
            required:true,
        }

    }
)
const details= mongoose.model('detail',signup)

module.exports =details