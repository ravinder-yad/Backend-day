const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const authRouter = require("./src/router/authrouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRouter);

connectDB();

app.listen(3001, () => {
    console.log(" Server running on port 3001");
});
