const mongoose = require("mongoose");

const Practic = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/practicapi");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("MongoDB connection error");
  }
};

module.exports = { Practic };
