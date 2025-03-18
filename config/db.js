const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@projektpaw.otvli.mongodb.net/library?retryWrites=true&w=majority&appName=ProjektPAW`
        );
        console.log("Connected to DB");
    } catch (err) {
        console.error( err);
        process.exit(1);
    }
};

module.exports = connectDB;