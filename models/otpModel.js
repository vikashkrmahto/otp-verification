const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const otpSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*5
    }
})

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            `<h1>Please confirm your otp</h1>
            <p>Here is your otp code ${otp}</p>`
        );
        console.log("Email sent successfully : ",mailResponse)
    }catch(error){
        console.log(error.message);
    }
}

otpSchema.pre("save",async function(next){
    console.log("New document saved to the database");
    if(this.isNew){
        sendVerificationEmail(this.email,this.otp)
    }
    next();
})

module.exports = mongoose.Model('OTP',otpSchema);