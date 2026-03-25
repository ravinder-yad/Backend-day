const File = require("../models/models");

// Upload File
const uploadFile = async (req, res) => {
    try {
        const { title, publicId, size, uploadedAt, images } = req.body;

        const imageFiles = req.files.map(file => file.filename);

        if (!title) {
            return res.status(400).json({
                message: "Title and Image URL are required"
            });
        }

        const newFile = await File.create({
            title,
            images: imageFiles,
            publicId,
            size,
            uploadedAt: uploadedAt || Date.now()
        });

        res.status(201).json({
            success: true,
            message: "File uploaded successfully",
            data: newFile
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "File upload failed",
            error: error.message
        });
    }
};

// Get All Files
const getAllFiles = async (req, res) => {
    try {
        const files = await File.find().sort({ uploadedAt: -1 });

        res.status(200).json({
            success: true,
            count: files.length,
            data: files
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch files",
            error: error.message
        });
    }
};

// Delete Single File (DB only)
const deleteFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({
                success: false,
                message: "File not found"
            });
        }

        await file.deleteOne();

        res.status(200).json({
            success: true,
            message: "File deleted successfully (DB only)"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Delete failed",
            error: error.message
        });
    }
};

// Delete All Files (DB only)
const deleteAllFiles = async (req, res) => {
    try {
        const result = await File.deleteMany();

        res.status(200).json({
            success: true,
            message: "All files deleted successfully (DB only)",
            deletedCount: result.deletedCount
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Delete all failed",
            error: error.message
        });
    }
};

module.exports = {
    uploadFile,
    getAllFiles,
    deleteFile,
    deleteAllFiles
};