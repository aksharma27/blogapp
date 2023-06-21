const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to db")
    } catch (e) {
        console.log("Error " + e.message);
    }
}

module.exports = connectDB;