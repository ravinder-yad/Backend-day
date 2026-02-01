const express = require("express");
const router = express.Router();
const { getTasks, addTask, updateTask, deleteTask } = require("../controller/taskController");
const verifyToken = require("../middleware/authMiddleware");

// All routes are protected
router.use(verifyToken);

router.get("/", getTasks);
router.post("/", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
