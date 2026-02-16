const mongoose = require("mongoose");
const connectdb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/auth");
    console.log("yas");
  } catch (error) {
    console.log("no");
  }
};

module.exports = connectdb;
