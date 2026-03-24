import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './Login.css'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  // input handle
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // submit handle
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      console.log(result)

      if (response.ok) {
        alert("Login Successful 🎉")

        // token & user save (IMPORTANT 🔥)
        login(result.user, result.token)

        // redirect to profile
        navigate("/profile")

      } else {
        alert(result.message || "Invalid Credentials ❌")
      }

    } catch (error) {
      console.error(error)
      alert("Server Error 🚨")
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-content">

          <div className="login-head">
            <div className="login-brand">
              <span className="brand-logo">TM</span>
              <span className="brand-name">TaskMaster</span>
            </div>

            <h1>Welcome Back 👋</h1>
            <p>Login to continue managing your tasks</p>
          </div>

          {/* FORM */}
          <form className="login-form" onSubmit={handleSubmit}>

            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Password</label>
              <div className="password-box">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/">Forgot?</Link>
            </div>

            {/* IMPORTANT */}
            <button type="submit" className="login-btn">
              Login
            </button>

          </form>

          <p className="bottom-text">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>

        </div>
      </section>
    </main>
  )
}

export default Login