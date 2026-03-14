const express = require("express");
const router = express.Router();

const { createpost } = require("../controllers/postController");

router.post("/create", createpost);

module.exports = router;