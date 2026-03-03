import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Navbar />
      <main className="glass-panel auth-card-v2">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "950", marginBottom: "0.5rem" }}>Welcome Back</h2>
          <p style={{ color: "var(--text-dim)", fontSize: "1.1rem" }}>Login to your builder account.</p>
        </div>

        {error ? <p className="error-text">{error}</p> : null}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.8rem" }}>
            <label style={{ display: "block", marginBottom: "0.6rem", fontSize: "0.80rem", fontWeight: "800", color: "var(--text-dim)", letterSpacing: "0.05em" }}>
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: "2.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.6rem", fontSize: "0.80rem", fontWeight: "800", color: "var(--text-dim)", letterSpacing: "0.05em" }}>
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", justifyContent: "center", fontSize: "1rem", padding: "1.1rem" }}>
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <p style={{ marginTop: "2.5rem", textAlign: "center", color: "var(--text-dim)", fontSize: "0.95rem" }}>
          Need an account? <Link to="/register" style={{ color: "var(--accent)", fontWeight: "800", textDecoration: "none" }}>Register for Free</Link>
        </p>
      </main>
    </div>
  );
}

export default Login;
