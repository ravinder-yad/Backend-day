const express = require("express");
const { register, login, logout } = require("../controller/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/logout", logout);

module.exports = router;
