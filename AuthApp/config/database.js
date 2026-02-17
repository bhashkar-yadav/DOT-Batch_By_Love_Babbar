const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGOB_URL);
        console.log("DB connected successfully");
    } 
    catch (err) {
        console.log("DB connection issues");
        console.error(err);
        process.exit(1);
    }
}
