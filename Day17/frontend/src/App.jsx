import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {

  const [posts, setPosts] = useState([]);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [postData, setPostData] = useState({
    title: "",
    description: "",
    skills: "",
    user: ""
  });


  // REGISTER USER
  const registerUser = async (e) => {

    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    const data = await res.json();

    console.log(data);

    alert("User Registered");

  };


  // CREATE POST
  const createPost = async (e) => {

    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: postData.title,
        description: postData.description,
        skills: postData.skills.split(","),
        user: postData.user
      })
    });

    const data = await res.json();

    console.log(data);

    alert("Post Created");

    getPosts();

  };


  // GET POSTS
  const getPosts = async () => {

    const res = await fetch("http://localhost:5000/api/posts");

    const data = await res.json();

    setPosts(data);

  };


  useEffect(() => {

    getPosts();

  }, []);


  return (

    <div className="container mt-5">

      <h1 className="text-center mb-5">MERN Post App</h1>


      {/* REGISTER USER */}

      <div className="card p-4 mb-4 shadow">

        <h3>User Register</h3>

        <input
          className="form-control mb-2"
          placeholder="Name"
          onChange={(e) =>
            setUserData({ ...userData, name: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Email"
          onChange={(e) =>
            setUserData({ ...userData, email: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />

        <button className="btn btn-success" onClick={registerUser}>
          Register
        </button>

      </div>


      {/* CREATE POST */}

      <div className="card p-4 mb-4 shadow">

        <h3>Create Post</h3>

        <input
          className="form-control mb-2"
          placeholder="Title"
          onChange={(e) =>
            setPostData({ ...postData, title: e.target.value })
          }
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          onChange={(e) =>
            setPostData({ ...postData, description: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Skills (React,Node,MongoDB)"
          onChange={(e) =>
            setPostData({ ...postData, skills: e.target.value })
          }
        />

        <input
          className="form-control mb-2"
          placeholder="User ID"
          onChange={(e) =>
            setPostData({ ...postData, user: e.target.value })
          }
        />

        <button className="btn btn-primary" onClick={createPost}>
          Create Post
        </button>

      </div>


      {/* POSTS LIST */}

      <h3 className="text-center mb-3">All Posts</h3>

      <div className="row">

        {posts.map((post) => (

          <div className="col-md-4" key={post._id}>

            <div className="card mb-4 shadow">

              <div className="card-body">

                <h5>{post.title}</h5>

                <p>{post.description}</p>

                <p>
                  <strong>Skills:</strong>{" "}
                  {post.skills.join(", ")}
                </p>

                {post.user && (
                  <p>
                    <strong>User:</strong>{" "}
                    {post.user.name}
                  </p>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default App;