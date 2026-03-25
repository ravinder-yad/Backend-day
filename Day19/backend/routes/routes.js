const express = require("express");
const router = express.Router();
const { uploadFile, getAllFiles, deleteFile, deleteAllFiles } = require("../controller/controller");
const upload = require("../multer");

router.post("/upload", upload.array("images"), uploadFile);
router.get("/files", getAllFiles);
router.delete("/files/all", deleteAllFiles);
router.delete("/files/:id", deleteFile);

module.exports = router;