const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const connectdb = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");

app.use(express.json());

connectdb();

app.use("/api", userRoutes);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
