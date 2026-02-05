const express = require("express");
const {
    registerUser,
    loginUser,
    addProducts,
    getProducts,
    searchProducts,
    getOne
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes (Login/Register remain public)
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes (Now user specific!)
// User must be logged in to see THEIR books or add new ones
router.get("/books", protect, getProducts);
router.get("/books/search", protect, searchProducts);
router.get("/books/:id", protect, getOne);
router.post("/books", protect, addProducts);

module.exports = router;
