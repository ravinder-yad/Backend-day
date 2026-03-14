import { useState } from "react";
import "./App.css";

function App() {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [skills,setSkills] = useState("");
  const [user,setUser] = useState("");
  const [posts,setPosts] = useState([]);

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const data = {
      title,
      description,
      skills: skills.split(","),
      user
    };

    try{

      const response = await fetch("http://localhost:5000/api/posts/create",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      });

      const result = await response.json();

      setPosts([...posts,result]);

      setTitle("");
      setDescription("");
      setSkills("");
      setUser("");

    }catch(error){
      console.log(error);
    }
  };

  return (

    <div className="main">

      <div className="container">

        <h1>Create Post</h1>

        <form className="post-form" onSubmit={handleSubmit}>

          <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          />

          <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          />

          <input
          type="text"
          placeholder="Skills (Node,MongoDB,Express)"
          value={skills}
          onChange={(e)=>setSkills(e.target.value)}
          />

          <input
          type="text"
          placeholder="User ID"
          value={user}
          onChange={(e)=>setUser(e.target.value)}
          />

          <button>Create Post</button>

        </form>

        <h2>Posts List</h2>

        <div className="posts">

          {
            posts.map((post,index)=>(
              <div className="card" key={index}>

                <h3>{post.title}</h3>

                <p>{post.description}</p>

                <div className="skills">

                  {
                    post.skills.map((skill,i)=>(
                      <span key={i}>{skill}</span>
                    ))
                  }

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>

  );
}

export default App;