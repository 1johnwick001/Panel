import mongoose from "mongoose";


const clientSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"cant be blank"]
    },
    email:{
        type:String,
        required:[true,"cant be blank"],
        unique:true
    },
    countryCode:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:[true,"cant be blank"],
       
    },
    password:{
        type:String,
        required:[true,"cant be blank"],
        minlength:[6,"Too Shorty!"]
    },
    conf_password:{
        type:String,
        required:[true,"cant be blank"]
    },
    forgetPassOtp:Number
    
},{timestamps:true})

const Client = mongoose.model("Client",clientSchema)

export default Client