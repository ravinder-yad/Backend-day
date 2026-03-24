const File = require("../models/models");
const fs = require("fs");
const path = require("path");

const uploadFile = async (req, res) => {
    try {
        const files = req.files;
        const { title } = req.body;

        if (!files || files.length === 0) {
            return res.status(400).json({ message: "Files are required" });
        }

        const images = files.map(file => file.filename);

        // Replace backslashes with forward slashes for URL compatibility
        const safePath = files[0].path.replace(/\\/g, '/');

        const newFile = await File.create({
            title,
            imageUrl: safePath,
            publicId: images.join(', '),
            size: files.reduce((acc, file) => acc + file.size, 0)
        });

        res.status(201).json({
            message: "Files uploaded successfully",
            count: files.length,
            filenames: images,
            data: newFile
        });

    } catch (error) {
        res.status(500).json({
            message: "File upload failed",
            error: error.message
        });
    }
};

const getAllFiles = async (req, res) => {
    try {
        const files = await File.find().sort({ uploadedAt: -1 });
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch files", error: error.message });
    }
};

const deleteFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        const filePath = path.join(__dirname, '..', file.imageUrl);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await File.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed", error: error.message });
    }
};

const deleteAllFiles = async (req, res) => {
    console.log("Delete All Route Hit");
    try {
        const files = await File.find();

        // Delete all files from storage
        files.forEach(file => {
            const filePath = path.join(__dirname, '..', file.imageUrl);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });

        await File.deleteMany();
        res.status(200).json({ message: "All files deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete all failed", error: error.message });
    }
};

module.exports = {
    uploadFile,
    getAllFiles,
    deleteFile,
    deleteAllFiles
};
