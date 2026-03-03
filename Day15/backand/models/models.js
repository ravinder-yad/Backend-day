const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true,
        unique: true
    },

    Phone: {
        type: String,
        required: true
    },

    Department: {
        type: String,
        required: true
    },

    Role: {
        type: String,
        required: true
    },

    JoiningDate: {
        type: Date,
        required: true
    }

});


const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;