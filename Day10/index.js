const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const authRouter = require("./src/router/authrouter");

const taskRouter = require("./src/router/taskRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRouter);
app.use("/api/tasks", taskRouter);


connectDB();

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
