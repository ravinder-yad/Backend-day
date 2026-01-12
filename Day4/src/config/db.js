// const mongoose = require('mongoose');

// const comstring = ()=>{
//     mongoose.connect('mongodb://localhost:27017/mydatabase')
//     .then(() => {
//         console.log('MongoDB connected');
//     })
//     .catch((err) => {
//         console.error('Error');
//     });
// }

// module.exports = comstring;

const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/mydatabase")
    .then(() => { 
      console.log("MongoDB connected");
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

module.exports = { connectDB };

