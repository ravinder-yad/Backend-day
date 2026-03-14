const Post = require("../models/Post");

const createpost = async (req,res)=>{
  try {

    const {title,description,skills,user} = req.body;

    const post = new Post({
      title,
      description,
      skills,
      user
    });

    await post.save();

    res.status(201).json(post);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating post" });
  }
}

module.exports = { createpost };
