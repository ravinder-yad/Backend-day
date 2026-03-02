import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app-shell">
      <Navbar />
      <main className="auth-main">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          <p>Login to continue building your skill network.</p>
          {error ? <p className="error-text">{error}</p> : null}
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <p>
            New user? <Link to="/register">Create account</Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default Login;
