const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/day12");
    console.log("mongodb connected");
  } catch (error) { 
    console.log(error);
  }
};

module.exports = connectdb;
