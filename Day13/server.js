const express = require("express");
const cors = require("cors");
const app = express();
const connectdb = require("./ContactManager-backhand/conffig/db");
const router = require("./ContactManager-backhand/routes/routes");

app.use(cors());
app.use(express.json());
app.use("/api", router);

connectdb();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});