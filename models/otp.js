const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, //to whom
    otp: { type: String, required: true }, // the OTP String
    createdAt: { type: Date, default: Date.now },
    expiresAt: Date,
});

const Otp = mongoose.model('OTP', otpSchema);

module.exports = Otp;