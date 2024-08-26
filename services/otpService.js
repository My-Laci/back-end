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

    exports.sendOTP = async ({ email, subject, message, duration = 5 }) => {
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
                html: `
                <div style="font-family: 'Nunito Sans', Arial, sans-serif; color: #333;">
                    <div style="text-align: center; margin-bottom: 20px;">
                    </div>
                    <h2 style="background-color: #01BAF2; color: white; padding: 10px 0; text-align: center; margin: 0;">
                        Your One-Time Password (OTP)
                    </h2>
                    <div style="padding: 20px; border: 1px solid #ddd;">
                        <p style="font-size: 18px; margin-bottom: 10px;">${message}</p>
                        <p style="color: #01BAF2; font-size: 30px; font-weight: bold; text-align: center; letter-spacing: 5px;">
                            ${generatedOTP}
                        </p>
                        <p style="font-size: 16px; margin-top: 10px;">
                            This code <span style="color: #F18931; font-weight: bold;">expires in ${duration} minute(s)</span>.
                        </p>
                        <p style="font-size: 14px; color: #555; margin-top: 20px;">
                            If you did not request this code, please ignore this email.
                        </p>
                    </div>
                    <div style="text-align: center; margin-top: 20px;">
                        <p style="font-size: 12px; color: #aaa;">&copy;2024 Copyright Laci Team. All rights reserved.</p>
                    </div>
                </div>`,

            };
            await sendEmail(mailOptions);

            //save otp record
            const hashedTOP = await await bcrypt.hash(generatedOTP, 10);
            const newOTP = await new OTP({
                email,
                otp: hashedTOP,
                createdAt: Date.now(),
                expiresAt: Date.now() + 60000 * +duration, // 60000 ms = 1 minute
            })

            const createdOTPRecord = await newOTP.save();
            return createdOTPRecord;

        } catch (error) {
            throw Error;
        }
    }

    exports.verifyOTP = async ({ email, otp }) => {
        try {
            if (!(email && otp)) {
                throw Error("Provide values for email and otp");
            }

            const matchedOTPRecord = await OTP.findOne({ email });

            if (!(matchedOTPRecord)) {
                throw Error("No OTP records found")
            }

            const { expiresAt, otp: hashedOTP } = matchedOTPRecord;

            if (expiresAt < Date.now()) {
                await OTP.deleteOne({ email });
                throw Error("Code has expired. Request for a new one.");
            }

            //not expired yet, verify value
            const validOTP = await bcrypt.compare(otp, hashedOTP);

            if (!validOTP) {
                throw Error("Invalid OTP. Please try again.");
            }

            // OTP is valid and not expired
            return { success: true, message: "OTP verified successfully" };


        } catch (error) {
            throw Error(error.message || "An error occurred during OTP verification");
        }
    }

    exports.deleteOTP = async (email) => {
        try {
            await OTP.deleteOne({ email })
        } catch (error) {
            throw error;
        }
    }