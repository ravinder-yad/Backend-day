import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await register(form);
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
          <h2>Create Account</h2>
          <p>Join SkillSwap Hub and start exchanging skills.</p>
          {error ? <p className="error-text">{error}</p> : null}
          <label>Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
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
            Register
          </button>
          <p>
            Already have account? <Link to="/login">Login</Link>
          </p>
        </form>
      </main>
    </div>
  );
}

export default Register;
