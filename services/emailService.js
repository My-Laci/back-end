const User = require("../models/user");
// const TempUser = require('../models/tempUser');
const { sendOTP, verifyOTP, deleteOTP } = require("./otpService");

exports.sendVerificationOTP = async (email) => {
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

// exports.sendVerificationOTPSignUp = async (email) => {
//     try {
//         // check if an account exists by the email
//         const existingUser = await TempUser.findOne({ email });
//         if (!existingUser) {
//             throw Error("There's no account for the provided email.")
//         }

//         const otpDetails = {
//             email,
//             subject: "Email Verification",
//             message: "Verify your email with the code below.",
//             duration: 5,
//         };

//         const createdOTP = await sendOTP(otpDetails);
//         return createdOTP;
//     } catch (error) {
//         throw error;
//     }
// }

exports.verifyOTP = async ({ email, otp }) => {
    try {
        const validOTP = await verifyOTP({ email, otp });
        if (!validOTP) {
            throw Error("Invalid code provided.")
        }
        await User.updateOne({ email }, { isVerified: true });
        await deleteOTP(email);
    } catch (error) {
        throw error;
    }
}

// exports.verifyOTPSignUp = async ({ email, otp }) => {
//     try {
//         const validOTP = await verifyOTP({ email, otp });
//         if (!validOTP) {
//             throw Error("Invalid code provided.")
//         }
//         await User.updateOne({ email }, { verified: true });
//         await deleteOTP(email);
//     } catch (error) {
//         throw error;
//     }

// }