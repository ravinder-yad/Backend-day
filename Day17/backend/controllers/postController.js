const Post = require("../models/Post");
const User = require("../models/User");


// CREATE POST
const createpost = async (req, res) => {

  try {

    const { title, description, skills, user } = req.body;

    const userExists = await User.findById(user);

    if (!userExists) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const post = await Post.create({
      title,
      description,
      skills,
      user
    });

    res.status(201).json({
      message: "Post created successfully",
      post
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error creating post"
    });

  }
};



// GET ALL POSTS
const getPosts = async (req, res) => {

  try {

    const posts = await Post.find()
      .populate("user", "name email");  

    res.status(200).json(posts);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching posts"
    });

  }

};
// REGISTER USER
const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // check user already exist
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error registering user"
    });

  }

};

module.exports = { createpost, getPosts, registerUser };