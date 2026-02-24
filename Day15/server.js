const express = require("express");
const cors = require("cors");
const app = express();
const connectdb = require("./backand/config/db");
const router = require("./backand/routes/routes");

app.use(cors());
app.use(express.json());
app.use("/api", router);

connectdb();

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});