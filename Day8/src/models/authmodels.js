const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    ticketName: { type: String, required: true },
    price: { type: String, required: true },
    movieName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const Auth = mongoose.model("Auth", AuthSchema);
module.exports = { Auth }; 
