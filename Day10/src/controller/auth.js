const User = require("../models/authmodels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "secretkey";

// REGISTER
const registerUser = async (req, res) => {
    try {
        const {
            FullName,
            Email,
            Password,
            ConfirmPassword,
            MobileNumber,
            Address,
            Gender
        } = req.body;

        if (!FullName || !Email || !Password || !ConfirmPassword || !MobileNumber || !Address || !Gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (Password !== ConfirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const user = await User.create({
            FullName,
            Email,
            Password: hashedPassword,
            MobileNumber,
            Address,
            Gender,
        });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({
            message: "User registered successfully",
            token,
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// LOGIN
const loginuser = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// FORGOT PASSWORD
const forgotpassword = async (req, res) => {
    try {
        const { Email } = req.body;

        if (!Email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });

        res.status(200).json({
            message: "Password reset token generated",
            token
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { registerUser, loginuser, forgotpassword };
