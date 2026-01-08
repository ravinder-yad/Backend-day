// const express = require('express');
// const cors = require('cors');
// const comstring = require('./config/db');
// const courseRouter = require('./routes/course');

// const app = express();

// app.use(cors());
// app.use(express.json());

// comstring();

// app.use('/courses', courseRouter);

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });


const express = require("express");
const cors = require("cors");
const courseRouter = require("./src/routes/coursesroute");
const { connectDB } = require("./src/config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/courses", courseRouter);

app.listen(3000, () => {
  console.log("Server running");
});
