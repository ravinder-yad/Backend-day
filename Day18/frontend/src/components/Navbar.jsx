import React, { useState, useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  
  // Realtime search state
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
    navigate('/login')
  }

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchInput(query);

    if (query.trim().length > 0) {
      setIsSearching(true);
      try {
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };
        const response = await fetch(`http://localhost:5000/api/tasks/search?title=${encodeURIComponent(query.trim())}`, requestOptions);
        const data = await response.json();
        if (response.ok) {
          setSearchResults(data.tasks || []);
        }
      } catch (error) {
        console.error("Navbar Search Error:", error);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(searchInput.trim()) {
      navigate(`/my-tasks?search=${encodeURIComponent(searchInput.trim())}`);
      setIsMenuOpen(false);
      setSearchResults([]);
    } else {
      navigate(`/my-tasks`);
    }
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name.charAt(0).toUpperCase()
  }

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Create Task', to: '/create-task' },
    { label: 'My Tasks', to: '/my-tasks' },
  ]

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg task-navbar">
        <div className="task-navbar-inner container-fluid">
          <Link
            className="navbar-brand task-brand"
            to="/"
            onClick={() => {
              setIsMenuOpen(false)
              setIsProfileOpen(false)
            }}
          >
            <span className="brand-mark">TM</span>
            <span>TaskMaster</span>
          </Link>

          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="toggler-icon">Menu</span>
          </button>

          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav me-auto mb-3 mb-lg-0 align-items-lg-center gap-lg-2">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.label}>
                  <NavLink
                    className={({ isActive }) => `nav-link task-link ${isActive ? 'active' : ''}`}
                    to={link.to}
                    onClick={() => {
                      setIsMenuOpen(false)
                      setIsProfileOpen(false)
                    }}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="d-lg-flex align-items-lg-center ms-lg-auto gap-3 task-actions">
              <div className="position-relative">
                <form className="task-search d-flex bg-white rounded shadow-sm" role="search" onSubmit={handleSearchSubmit}>
                  <input 
                    className="form-control border-0 shadow-none bg-transparent" 
                    type="search" 
                    name="search" 
                    placeholder="Search tasks..." 
                    value={searchInput}
                    onChange={handleSearchChange}
                    autoComplete="off"
                  />
                  <button type="submit" className="btn border-0 text-muted shadow-none">
                    🔍
                  </button>
                </form>
                {/* Live Search Dropdown */}
                {searchInput.length > 0 && (
                  <div className="position-absolute w-100 bg-white shadow-lg rounded mt-2 overflow-auto" style={{ maxHeight: '300px', zIndex: 1050, border: '1px solid #eee' }}>
                    {isSearching ? (
                      <div className="p-3 text-muted small text-center">Searching...</div>
                    ) : searchResults.length > 0 ? (
                      <ul className="list-unstyled m-0">
                        {searchResults.map(task => (
                          <li key={task._id}>
                            <Link 
                              to={`/my-tasks?search=${encodeURIComponent(task.title)}`}
                              className="dropdown-item py-2 px-3 border-bottom text-wrap text-truncate"
                              onClick={() => {
                                setSearchInput(task.title);
                                setSearchResults([]);
                                setIsMenuOpen(false);
                              }}
                            >
                              <div className="fw-medium text-dark small">{task.title}</div>
                              <div className="text-muted" style={{ fontSize: '0.70rem' }}>{task.status}</div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-3 text-muted small text-center">No tasks found.</div>
                    )}
                  </div>
                )}
              </div>

              {user ? (
                <div className="dropdown position-relative">
                  <button
                    className="btn user-menu"
                    type="button"
                    aria-expanded={isProfileOpen}
                    onClick={() => setIsProfileOpen((open) => !open)}
                  >
                    <span className="avatar-circle">{getInitials(user.name)}</span>
                    <span>{user.name.split(' ')[0]}</span>
                    <span className="dropdown-arrow">▼</span>
                  </button>
                  <ul className={`dropdown-menu dropdown-menu-end ${isProfileOpen ? 'show' : ''}`}>
                    <li><Link className="dropdown-item" to="/profile" onClick={() => setIsProfileOpen(false)}>Profile</Link></li>
                    <li><Link className="dropdown-item" to="/my-tasks" onClick={() => setIsProfileOpen(false)}>My Tasks</Link></li>
                    <li><button className="dropdown-item text-danger" type="button" onClick={handleLogout}>Logout</button></li>
                  </ul>
                </div>
              ) : (
                <div className="auth-actions d-flex flex-column flex-lg-row gap-2">
                  <Link className="btn btn-outline-primary px-4" to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link className="btn btn-primary px-4" to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
