const Task = require("../models/taskModel");

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const addTask = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ message: "Title is required" });

        const task = await Task.create({
            title,
            user: req.user.id
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) return res.status(404).json({ message: "Task not found" });
        if (task.user.toString() !== req.user.id) return res.status(401).json({ message: "Not authorized" });

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) return res.status(404).json({ message: "Task not found" });
        if (task.user.toString() !== req.user.id) return res.status(401).json({ message: "Not authorized" });

        await task.deleteOne();
        res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
