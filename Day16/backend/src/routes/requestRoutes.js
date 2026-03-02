const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createRequest, getMyRequests, updateRequestStatus } = require("../controllers/requestController");

const router = express.Router();

router.post("/", authMiddleware, createRequest);
router.get("/me", authMiddleware, getMyRequests);
router.patch("/:id/status", authMiddleware, updateRequestStatus);

module.exports = router;
