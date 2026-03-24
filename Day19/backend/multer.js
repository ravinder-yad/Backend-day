const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/Uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + " " + file.originalname);
    }
})

const upload = multer({
    storage: storage,

    fileFilter: (req, file, cb) => {
        // Regular expression for allowed extensions
        const filetypes = /avif|jpeg|jpg|png|gif|webp|svg|mp4|webm|dat/;

        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        const mimetype = filetypes.test(file.mimetype) || file.mimetype === 'application/octet-stream';

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            return cb(new Error("Invalid file type. Allowed types: avif, jpeg, jpg, png, gif, webp, svg, mp4, webm, dat"), false);
        }
    },
});

module.exports = upload;