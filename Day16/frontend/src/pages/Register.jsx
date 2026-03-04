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
        setError("This email is already registered. Please login.");
      } else {
        setError(err.message || "Registration failed. Try a different email.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ background: "var(--bg-secondary)", minHeight: "100vh", display: "grid", placeItems: "center", position: "relative", overflow: "hidden", padding: "2rem" }}>
      <Navbar />

      {/* Decorative Blobs */}
      <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "500px", height: "500px", background: "var(--accent-glow)", filter: "blur(120px)", borderRadius: "50%", opacity: 0.4 }}></div>
      <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "400px", height: "400px", background: "rgba(59, 130, 246, 0.1)", filter: "blur(100px)", borderRadius: "50%", opacity: 0.3 }}></div>

      <main className="glass-panel" style={{ width: "100%", maxWidth: "520px", padding: "4rem", borderRadius: "40px", position: "relative", zIndex: 1, border: "1px solid rgba(16, 185, 129, 0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="live-indicator" style={{ display: "inline-flex", marginBottom: "1.5rem", padding: "0.5rem 1rem", fontSize: "0.75rem" }}>
            <span className="pulse-dot"></span> IDENTITY SETUP
          </div>
          <h2 style={{ fontSize: "3rem", fontWeight: "950", color: "var(--text-main)", letterSpacing: "-0.04em", marginBottom: "0.5rem" }}>Join Registry</h2>
          <p style={{ color: "var(--text-dim)", fontSize: "1.1rem", fontWeight: "500" }}>Start your journey in the builder network.</p>
        </div>

        {error ? (
          <div style={{ background: "#fff5f5", color: "#e03131", padding: "1.2rem", borderRadius: "16px", marginBottom: "2rem", border: "1px solid #ffe3e3", fontSize: "0.9rem", fontWeight: "600", textAlign: "center" }}>
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.6rem", fontSize: "0.75rem", fontWeight: "900", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Full Name
            </label>
            <input
              placeholder="Developer Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={{ padding: "1.1rem", borderRadius: "18px" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.6rem", fontSize: "0.75rem", fontWeight: "900", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Work Email
            </label>
            <input
              type="email"
              placeholder="name@builds.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={{ padding: "1.1rem", borderRadius: "18px" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.6rem", fontSize: "0.75rem", fontWeight: "900", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Choose Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={{ padding: "1.1rem", borderRadius: "18px" }}
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", padding: "1.2rem", fontSize: "1rem", marginTop: "1rem" }}>
            {loading ? "Establishing Identity..." : "Continue to Marketplace →"}
          </button>
        </form>

        <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid var(--glass-border)", textAlign: "center" }}>
          <p style={{ color: "var(--text-dim)", fontSize: "0.95rem", fontWeight: "600" }}>
            Already a member? <Link to="/login" style={{ color: "var(--accent)", fontWeight: "850", textDecoration: "none" }}>Log In</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Register;
