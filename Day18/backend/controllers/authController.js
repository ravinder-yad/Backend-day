const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// REGISTER
const register = async (req, res) => {
  try {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" })
    }

    // check user exist
    const userExist = await User.findOne({ email })

    if (userExist) {
      return res.status(400).json({ message: "User already exists" })
    }

    // password hash
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    // token generate
    const token = jwt.sign(
      { id: user._id },
      "mysecretkey",
      { expiresIn: "7d" }
    )

    res.status(201).json({
      message: "User registered successfully",
      token
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// LOGIN
const login = async (req, res) => {
  try {

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" })
    }

    // token generate
    const token = jwt.sign(
      { id: user._id },
      "mysecretkey",
      { expiresIn: "7d" }
    )

    res.status(200).json({
      message: "Login successful",
      token
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { register, login }