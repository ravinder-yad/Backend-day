import React, { useEffect, useState } from "react";
import "./ImageUpload.css";

const ImageUpload = () => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("title", title);

    for (let i = 0; i < images.length; i++) {
      formdata.append("images", images[i]);
    }

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formdata,
      });

      const result = await res.json();
      console.log(result);

      setTitle("");
      setImages([]);

      fetchFiles(); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const fetchFiles = async () => {
    const res = await fetch("http://localhost:5000/api/files");
    const result = await res.json();
    setData(result.data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/files/${id}`, {
        method: "DELETE",
      });

      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>📤 Upload Images</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input type="file" multiple onChange={handleFileChange} />

          <button className="upload-btn" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>

      {/* Gallery */}
      {data.map((file) => (
        <div className="card" key={file._id}>
          <div className="card-header">
            <h3>{file.title}</h3>

            <button
              className="delete-btn"
              onClick={() => handleDelete(file._id)}
            >
              Delete
            </button>
          </div>

          <div className="image-grid">
            {file.images && file.images.length > 0 ? (
              file.images.map((img, index) => (
                <div className="image-item" key={index}>
                  <img
                    src={`http://localhost:5000/${img}`}
                    alt="img"
                  />
                </div>
              ))
            ) : (
              <p className="no-image">No images</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageUpload;