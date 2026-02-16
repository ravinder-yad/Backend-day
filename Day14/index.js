const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

const connectdb = require("./src/config/db");
const router = require("./src/routes/routes");

app.use(cors());
app.use(express.json());
app.use("/api", router);

connectdb();

app.listen(3000, () => {
  console.log("Server is 3000");
});
