const OTP = require("../models/otp");
const sendEmail = require("./sendEmailService");
const bcrypt = require('bcrypt');
const { AUTH_EMAIL, AUTH_PASS } = process.env;

const generateOTP = async () => {
    try {
        return (otp = `${Math.floor(100000 + Math.random() * 900000)}`)
    } catch (error) {
        throw Error;
    }
}

exports.sendOTP = async ({ email, subject, message, duration = 1 }) => {
    try {
        if (!(email && subject && message)) {
            throw Error("Provide values for emial, subject, message");
        }

        //clear any old record
        await OTP.deleteOne({ email });

        //generate PIN
        const generatedOTP = await generateOTP();

        //send email
        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html: `<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generatedOTP}</b></p><p>This code <b> expires in ${duration} hour(s) </b>.</p>`,

        };
        await sendEmail(mailOptions);

        //save otp record
        const hashedTOP = await await bcrypt.hash(generatedOTP, 10);
        const newOTP = await new OTP({
            email,
            otp: hashedTOP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 * +duration,
        })

        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;

    } catch (error) {
        throw Error;
    }
}