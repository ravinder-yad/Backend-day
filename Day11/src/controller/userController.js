const User = require("../models/userModel");
const Book = require("../models/productModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, "secretkey", {
    expiresIn: "30d",
  });
};

// @desc    Register new user
// @route   POST /api/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;

    if (!name || !lastname || !email || !password) {
      return res.status(400).json({ message: "Please add all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      lastname,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Authenticate a user
// @route   POST /api/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        user: { _id: user.id, name: user.name, email: user.email },
        token: generateToken(user._id),
        message: "Login successful"
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Add a book
// @route   POST /api/books
// @access  Private
const addProducts = async (req, res) => {
  try {
    // Destructure fields matching the user's Postman body
    const { title, author, price, category, pages, description, inStock, coverImage } = req.body;

    // Validate required fields
    if (!title || !author || !price || !category) {
      return res.status(400).json({ message: "Title, author, price, and category are required" });
    }

    // Create book with user ID from the protected middleware (req.user)
    const book = await Book.create({
      user: req.user.id, // ASSOCIATE BOOK WITH USER
      title,
      author,
      price,
      category,
      pages,
      description,
      inStock,
      coverImage
    });

    res.status(201).json({
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all books
// @route   GET /api/books
// @access  Private (User specific)
const getProducts = async (req, res) => {
  try {
    // Only find books belonging to the logged-in user
    const books = await Book.find({ user: req.user.id });
    res.status(200).json({ books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Search books by title
// @route   GET /api/books/search?title=keyword
// @access  Private (User specific)
const searchProducts = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: "Search title is required" });
    }

    // Only search within user's own books
    const search = await Book.find({
      user: req.user.id,
      title: { $regex: title, $options: "i" },
    });

    res.status(200).json({ search });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Private
const getOne = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Optional: Ensure user can only view their own book
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized to view this book" });
    }

    res.status(200).json({ book });
  } catch (error) {
    console.log(error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid Book ID" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  addProducts,
  getProducts,
  searchProducts,
  getOne,
};
