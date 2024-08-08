const Otp = require("../models/otp");
const otpService = require('../services/otpService')

exports.otp = async (req, res) => {
    try {
        const { email, subject, message, duration } = req.body;

        const createdOTP = await otpService.sendOTP({
            email,
            subject,
            message,
            duration,
        });
        res.status(200).json(createdOTP);
    } catch (error) {
        res.status(400).send(error.message);
    }
};