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
    <div className="auth-container" style={{ background: "var(--bg-secondary)", minHeight: "100vh", display: "grid", placeItems: "center", position: "relative", overflow: "hidden" }}>
      <Navbar />

      {/* Decorative Blobs */}
      <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "500px", height: "500px", background: "var(--accent-glow)", filter: "blur(120px)", borderRadius: "50%", opacity: 0.4 }}></div>
      <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "400px", height: "400px", background: "rgba(59, 130, 246, 0.1)", filter: "blur(100px)", borderRadius: "50%", opacity: 0.3 }}></div>

      <main className="glass-panel" style={{ width: "100%", maxWidth: "520px", padding: "4rem", borderRadius: "40px", position: "relative", zIndex: 1, border: "1px solid rgba(16, 185, 129, 0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div className="live-indicator" style={{ display: "inline-flex", marginBottom: "1.5rem", padding: "0.5rem 1rem", fontSize: "0.75rem" }}>
            <span className="pulse-dot"></span> SECURE ACCESS
          </div>
          <h2 style={{ fontSize: "3rem", fontWeight: "950", color: "var(--text-main)", letterSpacing: "-0.04em", marginBottom: "0.5rem" }}>Welcome Back</h2>
          <p style={{ color: "var(--text-dim)", fontSize: "1.1rem", fontWeight: "500" }}>Login to the global builder network.</p>
        </div>

        {error ? (
          <div style={{ background: "#fff5f5", color: "#e03131", padding: "1.2rem", borderRadius: "16px", marginBottom: "2rem", border: "1px solid #ffe3e3", fontSize: "0.9rem", fontWeight: "600", textAlign: "center" }}>
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.8rem", fontSize: "0.75rem", fontWeight: "900", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@expertise.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={{ padding: "1.2rem", borderRadius: "18px" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.8rem", fontSize: "0.75rem", fontWeight: "900", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Secure Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={{ padding: "1.2rem", borderRadius: "18px" }}
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", padding: "1.2rem", fontSize: "1rem", marginTop: "1rem" }}>
            {loading ? "Authenticating Master..." : "Sign In to Registry →"}
          </button>
        </form>

        <div style={{ marginTop: "3rem", paddingTop: "2.5rem", borderTop: "1px solid var(--glass-border)", textAlign: "center" }}>
          <p style={{ color: "var(--text-dim)", fontSize: "0.95rem", fontWeight: "600" }}>
            New to the ecosystem? <Link to="/register" style={{ color: "var(--accent)", fontWeight: "850", textDecoration: "none" }}>Join Now</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
