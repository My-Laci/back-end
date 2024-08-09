const User = require("../models/user");
const { sendOTP } = require("./otpService");

exports.sendVerificationOTPEmail = async (email) => {
    try {
        // check if an account exists by the email
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw Error("There's no account for the provided email.")
        }

        const otpDetails = {
            email,
            subject: "Email Verification",
            message: "Verify your email with the code below.",
            duration: 5,
        };

        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;
    } catch (error) {
        throw error;
    }
}