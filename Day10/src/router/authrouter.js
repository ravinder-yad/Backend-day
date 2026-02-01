const express = require("express");
const router = express.Router();
const { registerUser, loginuser, forgotpassword } = require("../controller/auth");

router.post("/register", registerUser);
router.post("/login", loginuser);
router.post("/forgot-password", forgotpassword);

module.exports = router;
