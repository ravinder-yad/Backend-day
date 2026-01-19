import React, { useState, useEffect } from "react";

const Block = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs"));
    if (savedBlogs) {
      setBlogs(savedBlogs);
    }
  }, []);

  const add = () => {
    if (!title || !author || !category) return;

    const newBlog = {
      title,
      author,
      category,
      shortDesc,
      longDesc,
    };

    const updatedBlogs = [...blogs, newBlog];
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

    // clear form
    setTitle("");
    setAuthor("");
    setCategory("");
    setShortDesc("");
    setLongDesc("");
  };

  // delete function

  const remove = (index) => {
    const updatedBlogs = blogs.filter((_, i) => i !== index);
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };
  


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      {/* FORM */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Create Blog ✨
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Write once. Stay forever.
        </p>

        <form className="space-y-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog title"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author name"
              className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">Select category</option>
              <option>Youth</option>
              <option>Education</option>
              <option>Technology</option>
              <option>Business</option>
            </select>
          </div>

          <textarea
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            rows="2"
            placeholder="Short description"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <textarea
            value={longDesc}
            onChange={(e) => setLongDesc(e.target.value)}
            rows="4"
            placeholder="Long description"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              add();
            }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold tracking-wide transition"
          >
            Publish Blog 🚀
          </button>
        </form>
      </div>

      {/* BLOG CARDS */}
      <div className="max-w-6xl mx-auto mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
          >
            {/* Accent strip */}
            <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />

            <div className="p-6">
              <span className="inline-block mb-3 text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {blog.category}
              </span>

              <h3 className="text-2xl font-extrabold text-gray-800 leading-snug">
                {blog.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">✍️ {blog.author}</p>

              <p className="mt-4 text-gray-700">{blog.shortDesc}</p>

              <p className="mt-2 text-gray-500 text-sm">{blog.longDesc}</p>

              <button className="mt-6 text-indigo-600 font-semibold hover:underline">
                Read more →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Block;
