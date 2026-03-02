const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getSkills, createSkill, updateSkill, deleteSkill } = require("../controllers/skillController");

const router = express.Router();

router.get("/", getSkills);
router.post("/", authMiddleware, createSkill);
router.put("/:id", authMiddleware, updateSkill);
router.delete("/:id", authMiddleware, deleteSkill);

module.exports = router;
