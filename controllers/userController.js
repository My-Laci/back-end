const userService = require("../services/userService");
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
require("dotenv").config();

const { DATABASE_URL } = process.env;

const storage = new GridFsStorage({
    url: DATABASE_URL,
    file: (req, file) => {
        return {
            filename: `profile_${Date.now()}_${file.originalname}`,  // Unique filename
            bucketName: 'userProfileImages',  // Bucket name for GridFS
        };
    },
});

const uploadUserImage = multer({ storage });

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) throw Error("User ID is required.");

        const user = await userService.getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateFullName = async (req, res) => {
    try {
        const { id } = req.params;
        const { newFullName } = req.body;
        if (!newFullName) throw Error("Please provide the new full name.");

        await userService.updateFullName(id, newFullName);
        res.status(200).json({ id, fullNameChanged: true });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateEmail = async (req, res) => {
    try {
        const { id } = req.params;
        const { newEmail } = req.body;

        console.log(id);

        if (!(newEmail)) {
            throw Error("New email addresses are required.");
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newEmail)) {
            throw Error("Invalid new email entered.");
        }

        await userService.updateEmail(id, newEmail);

        res.status(200).json({
            status: true,
            message: "Email updated successfully.",
            data: { id: id, newEmail: newEmail, emailChanged: true },
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) throw Error("Please provide all required fields.");

        await userService.updatePassword({ id, oldPassword, newPassword });
        res.status(200).json({ id, passwordChanged: true });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) throw Error("An email is required.");
        const createdPasswordResetOTP = await userService.sendPasswordResetOTP(email);
        res.status(200).json(createdPasswordResetOTP);
    } catch (error) {
        res.statu(400).send(error.message);
    }
};

exports.resetPassword = async (req, res) => {
    try {
        let { email, otp, newPassword } = req.body;
        if (!(email && otp && newPassword)) throw Error("Please provide the credentials needed.");

        await userService.resetPassword({ email, otp, newPassword });
        res.status(200).json({ email, passwordreset: true });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.updateProfileImage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.file) throw Error("No image file uploaded");

        // Call service to update profile image
        const updatedUser = await userService.updateProfileImage(id, req.file.filename);
        res.status(200).json({ status: true, message: "Profile image updated successfully", updatedUser });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Controller method to handle profile image retrieval
exports.getProfileImage = async (req, res) => {
    try {
        const filename = req.params.id;

        // Call service to retrieve profile image
        await userService.getProfileImage(filename, res);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports = uploadUserImage;