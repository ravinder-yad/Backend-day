import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      if (err.message === "Email already exists") {
        setError("This email is already registered. Please Sign In instead.");
      } else {
        setError(err.message || "Registration failed. Try a different email.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Navbar />
      <main className="glass-panel auth-card-v2">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "950", marginBottom: "0.5rem" }}>Create Account</h2>
          <p style={{ color: "var(--text-dim)", fontSize: "1.1rem" }}>Join the global skill swap network.</p>
        </div>

        {error ? (
          <div className="error-text">
            {error}
            {error.includes("registered") && (
              <Link to="/login" style={{ display: "block", marginTop: "0.8rem", color: "var(--text-main)", fontWeight: "800", textDecoration: "underline" }}>
                Go to Login Page →
              </Link>
            )}
          </div>
        ) : null}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.6rem", fontSize: "0.80rem", fontWeight: "800", color: "var(--text-dim)", letterSpacing: "0.05em" }}>
              FULL NAME
            </label>
            <input
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
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
              CHOOSE PASSWORD
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
            {loading ? "Initializing..." : "Register Now"}
          </button>
        </form>

        <p style={{ marginTop: "2.5rem", textAlign: "center", color: "var(--text-dim)", fontSize: "0.95rem" }}>
          Already registered? <Link to="/login" style={{ color: "var(--accent)", fontWeight: "800", textDecoration: "none" }}>Sign In Instead</Link>
        </p>
      </main>
    </div>
  );
}

export default Register;
