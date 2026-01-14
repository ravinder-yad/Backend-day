const jwt = require("jsonwebtoken");
const { Auth } = require("../models/authmodels");

const authService = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.create({ email, password });

    const token = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginService = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User found successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { authService, loginService };
