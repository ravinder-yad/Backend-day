const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    Phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    Department: {
        type: String,
        required: true,
        trim: true
    },

    Role: {
        type: String,
        required: true,
        trim: true
    },

    JoiningDate: {
        type: Date,
        required: true
    }

}, { timestamps: true });


const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
