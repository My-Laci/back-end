const emailVerifService = require("../services/emailService");
const User = require('../models/User');

exports.sendVerificationOTP = async (req, res) => {
    try {
        const _id = req.params.id;
        const existingUser = await User.findOne({ _id });

        const createdEmailVerificationOTP = await emailVerifService.sendVerificationOTP(existingUser.email);
        res.status(200).json(createdEmailVerificationOTP);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { id } = req.params;
        let { otp } = req.body;
        if (!(otp)) throw Error("Empty OTP details are not allowed");

        await emailVerifService.verifyOTP({ id, otp });
        res.status(200).json({ id, verified: true });
    } catch (error) {
        res.status(400).send({ id, verified: true, message: error.message });
    }
};