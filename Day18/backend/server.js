const express = require("express");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/askroutes");
const authRoutes = require("./routes/authRoutes")

const app = express();

app.use(express.json());

// database connect
connectDB();

// routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// home route
app.get("/", (req, res) => {
  res.send("Task API is running...");
});

// server start
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});