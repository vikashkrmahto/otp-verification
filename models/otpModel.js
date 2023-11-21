const mongoose = require('mongoose');
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

module.exports = mongoose.Model('OTP',otpSchema);