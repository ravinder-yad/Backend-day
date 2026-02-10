const express = require("express");
const cors = require("cors");
const router = require("./src/routes/authroutes");
const connectDB = require("./src/conffig/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", router);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
