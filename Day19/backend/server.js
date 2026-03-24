const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Main routes
app.use('/api', require('./routes/routes'));

app.get('/', (req, res) => {
  res.send('Multer Upload API is running...');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error caught by global handler:", err.message);
  res.status(500).json({
    message: "Something went wrong on the server!",
    error: err.message
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
