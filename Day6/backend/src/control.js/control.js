const { Blog } = require("../models/models");

const add = async (req, res) => {
    console.log(req.body);

    const { title, author, category, shortDesc, longDesc } = req.body;

     const blog = await Blog.create({
      title,
      author,
      category,
      shortDesc,
      longDesc
    });
    
    res.send(blog)
};

const del = async (req, res) => {
    const status = await Blog.findByIdAndDelete(req.params.id)

    if (status) {
        res.status(200).json({message: "Deleted Successfully."})
    } else {
        res.status(409).json({message: "Something went Wrong."})
    }
};

module.exports = { add, del };