const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/config/db");
const router = require("./src/router/router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

connectDB();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
