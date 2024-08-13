const User = require("../models/user");
const { sendOTP, verifyOTP, deleteOTP } = require("./otpService");

exports.sendVerificationOTP = async (id) => {
    try {
        const _id = id;
        const existingUser = await User.findOne({ _id });

        if (!existingUser) {
            throw Error("There's no account for the provided email.")
        }

        if (existingUser.isVerified) {
            throw Error("The email for this account is already verified.")
        }

        const otpDetails = {
            email: existingUser.email,
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

exports.verifyOTP = async ({ id, otp }) => {
    try {
        const _id = id;
        const existingUser = await User.findOne({ _id });
        if (!existingUser) {
            throw Error("There's no account for the provided email.")
        }

        const validOTP = await verifyOTP({ email: existingUser.email, otp });
        if (!validOTP) {
            throw Error("Invalid code provided.")
        }
        await User.updateOne({ email: existingUser.email }, { isVerified: true });
        await deleteOTP(existingUser.email);
    } catch (error) {
        throw error;
    }
}