const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/Blogs")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch(() => {
      console.error("Error connecting to MongoDB:");
    });
};

module.exports = { connectDB };