const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api', require('./routes/routes'));
app.use(express.static('public/uploads'));


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});