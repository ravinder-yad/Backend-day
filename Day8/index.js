const express = require("express");
const cors = require("cors");
const router = require("./src/routes/rouutes");
const connectDB = require("./src/config/db");

const app = express();

app.use(express.json());
app.use(cors());
app.use(require("cors")());
app.use(express.json());

connectDB();

app.use("/api", router);

app.listen(3000, () => {
  console.log("Server running on port 3000 ");
});
