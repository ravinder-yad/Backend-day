const express = require("express")

const router = express.Router()

const { createTask, getTask, getTaskById, updateTask, deleteTask, searchTask } = require("../controllers/askController")

router.post("/", createTask)
router.get("/", getTask)
router.get("/search", searchTask)
router.get("/:id", getTaskById)
router.put("/:id", updateTask)
router.delete("/:id", deleteTask)

module.exports = router