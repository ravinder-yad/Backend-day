const express = require("express");
const cous = require("cors");
const { config } = require("./src/config/db");
const { add } = require("./src/controller/control");
const { course } = require("./src/models/models");
const  courseRouter  = require("./src/routes/routes");
const app = express();

app.use(cous());
app.use(express.json());
config()
app.use("/course" , courseRouter)

app.listen(3000, () => {
  console.log(" Server running");
});
