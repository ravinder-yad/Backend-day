const mongoose = require("mongoose");
const Task = require("../models/askmodels");


// CREATE TASK
const createTask = async (req, res) => {
  try {

    const { title, description, category, priority, status, createdBy, dueDate, user } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      category,
      priority,
      status,
      createdBy,
      dueDate,
      user
    });

    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET ALL TASKS
const getTask = async (req, res) => {
  try {

    const tasks = await Task.find().populate("user");

    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET TASK BY ID
const getTaskById = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await Task.findById(id).populate("user");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE TASK
const updateTask = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// DELETE TASK
const deleteTask = async (req, res) => {
  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      task
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// SEARCH TASK
const searchTask = async (req, res) => {
  try {

    const title = req.query.title?.trim();

    if (!title) {
      return res.status(400).json({ message: "title query is required" });
    }

    const tasks = await Task.find({
      title: { $regex: title, $options: "i" }
    }).populate("user");

    res.status(200).json({
      message: "Task search successfully",
      tasks
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createTask,
  getTask,
  getTaskById,
  updateTask,
  deleteTask,
  searchTask
};