require("dotenv").config();
const mongoose = require("mongoose");

const { DATABASE_URL } = process.env

const connectToDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log("Database Connected");
    } catch (error) {
        console.log(error);
    }
};

connectToDB();