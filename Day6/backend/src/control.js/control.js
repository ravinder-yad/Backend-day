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

module.exports = { add };