const User = require("../models/authmodels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const {
            FullName,
            Email,
            Password,
            ConfirmPassword,
            MobileNumber,
            Address,
            Gender,
        } = req.body;

        if (
            !FullName ||
            !Email ||
            !Password ||
            !ConfirmPassword ||
            !MobileNumber ||
            !Address ||
            !Gender
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (Password !== ConfirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const userExists = await User.findOne({ Email });
        if (userExists) {
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

        const token = jwt.sign(
            { id: user._id },
            "secretkey",
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { registerUser };
