const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authSchema = require("../models/models");

const register = async (req, res) => {
  try {
    const { name, email, paswood } = req.body;

    const existingUser = await authSchema.findOne({ email });

    const hashedPassword = await bcrypt.hash(paswood, 10);

    const user = await authSchema.create({
      name,
      email,
      paswood: hashedPassword
    });

    const token = jwt.sign({ id: user._id }, "abcd", { expiresIn: "1h" });

    res.status(201).json({ user, token });

  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, paswood } = req.body;

    const user = await authSchema.findOne({ email });



    const isMatch = await bcrypt.compare(paswood, user.paswood);

    const token = jwt.sign({ id: user._id }, "abcd", { expiresIn: "1h" });

    res.status(200).json({ user, token });

  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login };
