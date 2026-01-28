const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ================== MIDDLEWARE ================== */
app.use(cors());
app.use(express.json());

/* ================== DATABASE ================== */
mongoose
  .connect("mongodb://127.0.0.1:27017/courseDB")
  .then(() => console.log("✨ MongoDB connected"))
  .catch((err) => console.log("❌ DB Error:", err));

/* ================== MODEL + SCHEMA ================== */
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

/* ================== APIs ================== */

// 👉 CREATE (POST)
app.post("/course", async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      success: true,
      message: "Course added 🎉",
      data: course,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 👉 READ ALL (GET)
app.get("/course", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({
      success: true,
      data: courses,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 👉 READ ONE (GET by ID)
app.get("/course/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Not found 😶" });
    }
    res.json({ success: true, data: course });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 👉 UPDATE (PUT)
app.put("/course/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({
      success: true,
      message: "Course updated ✨",
      data: course,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 👉 DELETE
app.delete("/course/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Course deleted 🗑️",
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

/* ================== SERVER ================== */
app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});


// POST    http://localhost:3000/course
// GET     http://localhost:3000/course
// GET     http://localhost:3000/course/:id
// PUT     http://localhost:3000/course/:id
// DELETE  http://localhost:3000/course/:id
// body \ row 
// {
//   "title": "Full Stack Development",
//   "duration": "6 Months",
//   "price": 25000
// }
