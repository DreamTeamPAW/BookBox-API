const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("", {
        });
        console.log("Connected to DB");
    } catch (err) {
        console.error( err);
        process.exit(1);
    }
};

module.exports = connectDB;
