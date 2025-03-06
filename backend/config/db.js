require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("MongoDB Connected Successfully ✔️");
    } catch (error) {
        console.log("Error while connecting the Database: ", error.message);
    }
};

module.exports = connectDB;
