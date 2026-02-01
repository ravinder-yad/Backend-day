const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    FullName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    MobileNumber: { type: String, required: true },
    Address: { type: String, required: true },
    Gender: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
