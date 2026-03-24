const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/postRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database connect
connectDB();

// routes
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

// server start
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});