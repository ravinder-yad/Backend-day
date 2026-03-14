const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(cors()); // 👈 ye line important hai

app.use(express.json());

connectDB();

app.use("/api/posts", postRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});