const express = require("express");
const router = express.Router();

const { createpost, getPosts, registerUser } = require("../controllers/postController");

// CREATE POST
router.post("/create", createpost);

// GET ALL POSTS
router.get("/", getPosts);

router.post("/register", registerUser);

module.exports = router;