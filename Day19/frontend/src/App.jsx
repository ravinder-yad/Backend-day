import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [allFiles, setAllFiles] = useState([])

  const API_BASE = "http://localhost:5000";

  const fetchFiles = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(`${API_BASE}/api/files`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAllFiles(result);
      })
      .catch((error) => console.error("Error fetching files:", error));
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(selectedFiles)
    const filePreviews = selectedFiles.map(file => URL.createObjectURL(file))
    setPreviews(filePreviews)
  }

  const handleUpload = (e) => {
    e.preventDefault()
    if (files.length === 0 || !title) {
      setStatus('Please select at least one file and enter a title.')
      return
    }

    setLoading(true)
    setStatus('Uploading...')

    const formdata = new FormData();
    formdata.append("title", title);
    files.forEach(file => {
      formdata.append("images", file);
    });

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    fetch(`${API_BASE}/api/upload`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.message.includes('success')) {
          setStatus(`Upload successful!`);
          setFiles([]);
          setPreviews([]);
          setTitle('');
          fetchFiles();
        } else {
          setStatus(`Error: ${result.message || result.error}`);
        }
      })
      .catch((error) => {
        console.error(error);
        setStatus(`Error: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow"
      };

      fetch(`${API_BASE}/api/files/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          fetchFiles();
        })
        .catch((error) => console.error("Delete failed:", error));
    }
  }

  const handleDeleteAll = () => {
    if (window.confirm("⚠️ WARNING: Are you sure you want to delete ALL images? This cannot be undone.")) {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow"
      };

      fetch(`${API_BASE}/api/files/all`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          fetchFiles();
        })
        .catch((error) => console.error("Delete all failed:", error));
    }
  }

  return (
    <div className="bg-light min-vh-100 pb-5">
      <nav className="navbar navbar-dark bg-primary shadow-sm mb-5">
        <div className="container justify-content-center">
          <span className="navbar-brand mb-0 h1 fw-bold">🌿 My Image Jungle</span>
        </div>
      </nav>

      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-header bg-white border-0 pt-4 text-center">
                <h2 className="h5 fw-bold text-dark mb-0">📤 Upload Your Memory</h2>
                <p className="small text-muted mb-0">Simple but premium 😌</p>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleUpload}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3 border-light bg-light"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Title of your post"
                      style={{ fontSize: '0.9rem' }}
                    />
                  </div>

                  <div className="mb-4 text-center">
                    <input
                      type="file"
                      id="fileInput"
                      className="d-none"
                      multiple
                      onChange={handleFileChange}
                      accept="image/*,video/*"
                    />
                    <label htmlFor="fileInput" className="btn btn-outline-secondary w-100 py-3 border-dashed rounded-3">
                      {files.length > 0 ? `✅ ${files.length} Files Selected` : "📁 Click to select images/videos"}
                    </label>

                    {previews.length > 0 && (
                      <div className="d-flex gap-2 mt-3 overflow-x-auto pb-2 justify-content-center">
                        {previews.map((src, index) => (
                          <img
                            key={index}
                            src={src}
                            alt="preview"
                            className="rounded-2 shadow-sm border"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg rounded-pill fw-bold shadow-sm" disabled={loading}>
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Uploading...
                        </>
                      ) : 'Upload to Gallery'}
                    </button>
                  </div>
                </form>

                {status && (
                  <div className={`mt-3 small text-center ${status.includes('Error') ? 'text-danger' : 'text-primary'}`}>
                    {status}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <hr className="my-5 opacity-25" />

        <div className="row g-4">
          <div className="col-12 d-flex justify-content-between align-items-center mb-3">
            <h3 className="fw-bold h4 mb-0">🖼️ Gallery Grid</h3>
            {allFiles.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-bold"
              >
                🗑️ Delete All
              </button>
            )}
          </div>

          {allFiles.length > 0 ? (
            allFiles.map((file) => (
              <div className="col-12 col-sm-6 col-lg-4" key={file._id}>
                <div className="card h-100 border-0 shadow-sm rounded-4 gallery-card overflow-hidden">
                  <div className="position-relative" style={{ height: '250px' }}>
                    <img
                      src={`${API_BASE}/${file.imageUrl}`}
                      className="card-img-top h-100 w-100 object-fit-cover"
                      alt={file.title}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=Preview+Error";
                      }}
                    />
                  </div>
                  <div className="card-body p-3">
                    <h5 className="card-title fw-bold text-truncate mb-1">{file.title}</h5>
                    <p className="small text-muted mb-3 d-flex align-items-center">
                      <span className="me-2">📅</span>
                      {new Date(file.uploadedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <div className="d-flex gap-2">
                      <a
                        href={`${API_BASE}/${file.imageUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-primary btn-sm flex-grow-1 rounded-pill fw-bold"
                      >
                        Full View
                      </a>
                      <button
                        onClick={() => handleDelete(file._id)}
                        className="btn btn-outline-danger btn-sm rounded-pill fw-bold px-3"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <div className="display-1 text-muted opacity-25 mb-4">🧊</div>
              <h4 className="text-muted fw-bold">No images found</h4>
              <p className="text-muted">Upload your first photo to get started! 🌸</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
