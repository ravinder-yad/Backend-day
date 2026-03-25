const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    publicId: {
        type: String
    },
    size: {
        type: Number
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("File", fileSchema);