const express = require('express');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const { connectDB } = require('./src/config/db');
const router = require('./src/routes/routes');

connectDB();
app.use(router);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
