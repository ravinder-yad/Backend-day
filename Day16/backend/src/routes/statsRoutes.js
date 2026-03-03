const express = require("express");
const { getPlatformStats, getRecentActivity, getUserStats } = require("../controllers/statsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getPlatformStats);
router.get("/activity", getRecentActivity);
router.get("/me", authMiddleware, getUserStats);

module.exports = router;
