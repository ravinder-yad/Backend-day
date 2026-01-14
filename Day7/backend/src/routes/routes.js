const express = require("express");
const { authService, loginService } = require("../controller/auth");

const router = express.Router();

router.post("/register", authService);
router.post("/login", loginService);

module.exports = router;
