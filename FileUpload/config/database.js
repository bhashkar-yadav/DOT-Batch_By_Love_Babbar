const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        console.log("✅ DB Connection Successful");
    } 
    catch (error) {
        console.error("❌ DB Connection Failed");
        console.error(error.message);
        process.exit(1);
    }
};