import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

function Register() {
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

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
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      console.log(result)

      if (response.ok) {
        alert("User Registered Successfully 🎉")
      } else {
        alert(result.message || "Something went wrong")
      }

    } catch (error) {
      console.error(error)
      alert("Server Error 🚨")
    }
  }

  return (
    <main className="register-page">
      <section className="register-card">
        <div className="register-content">

          <div className="register-head">
            <div className="register-brand">
              <span className="brand-logo">TM</span>
              <span className="brand-name">TaskMaster</span>
            </div>

            <h1>Create Account 🚀</h1>
            <p>Join and start managing your tasks like a pro</p>
          </div>

          {/* FORM */}
          <form className="register-form" onSubmit={handleSubmit}>

            <div>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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
                  placeholder="Create a password"
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

            <div className="terms">
              <label>
                <input type="checkbox" required /> I agree to Terms & Privacy
              </label>
            </div>

            {/* IMPORTANT: type submit */}
            <button type="submit" className="register-btn">
              Register
            </button>

          </form>

          <p className="bottom-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </div>
      </section>
    </main>
  )
}

export default Register