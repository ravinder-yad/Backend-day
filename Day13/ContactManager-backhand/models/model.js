const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    profileurl: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: false
    }
})

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
