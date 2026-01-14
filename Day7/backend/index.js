const express = require("express");
const cors = require("cors");

const { Practic } = require("./src/config/db");
const authRoutes = require("./src/routes/routes");

const app = express();
app.use(cors());
app.use(express.json());

Practic();

app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000 ");
});
