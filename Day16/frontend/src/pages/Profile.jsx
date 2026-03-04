import { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    skillsOffered: Array.isArray(user?.skillsOffered)
      ? user.skillsOffered.join(", ")
      : "",
    profileImage: user?.profileImage || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const data = await api.updateProfile(form);
      setUser(data.user);
      setMessage("Profile identity updated! ✨");
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const avatarLetter = (user?.name || "U").charAt(0).toUpperCase();

  return (
    <div className="app-shell" style={{ background: "var(--bg-secondary)" }}>
      <Navbar />
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "10rem 2rem 6rem" }}>

        {/* Decorative Blobs */}
        <div style={{ position: "absolute", top: "15%", left: "15%", width: "300px", height: "300px", background: "var(--accent-glow)", filter: "blur(100px)", borderRadius: "50%", opacity: 0.5 }}></div>

        <section className="glass-panel" style={{ width: "100%", maxWidth: "850px", padding: "5rem", border: "1px solid rgba(16, 185, 129, 0.1)" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{
              width: "160px",
              height: "160px",
              borderRadius: "44px",
              background: "#fff",
              margin: "0 auto 3rem",
              display: "grid",
              placeItems: "center",
              fontSize: "4.5rem",
              fontWeight: "950",
              color: "var(--accent)",
              boxShadow: "var(--shadow-crystal)",
              overflow: "hidden",
              border: "1px solid var(--glass-border)",
              position: "relative"
            }}>
              {form.profileImage ? (
                <img src={form.profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                avatarLetter
              )}
            </div>
            <div className="live-indicator" style={{ display: "inline-flex", marginBottom: "1.2rem", padding: "0.5rem 1.2rem", fontSize: "0.75rem" }}>
              <span className="pulse-dot"></span> IDENTITY SYNCHRONIZATION
            </div>
            <h2 style={{ fontSize: "3.2rem", fontWeight: "950", color: "var(--text-main)", letterSpacing: "-0.04em", marginBottom: "0.5rem" }}>Builder Identity</h2>
            <p style={{ color: "var(--text-dim)", fontSize: "1.15rem", fontWeight: "500" }}>Refine your presence in the global builder network.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>

              <div style={{ gridColumn: "span 2" }}>
                <div className="glass-panel" style={{ padding: "2rem", background: "rgba(248, 250, 252, 0.4)", border: "1px solid var(--glass-border)", borderRadius: "24px" }}>
                  <label style={{ display: "block", marginBottom: "0.8rem", fontSize: "0.75rem", fontWeight: "900", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                    Public Display Name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="Full mastery name"
                    style={{ background: "#fff", border: "1px solid var(--glass-border)" }}
                  />
                </div>
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <div className="glass-panel" style={{ padding: "2rem", background: "rgba(248, 250, 252, 0.4)", border: "1px solid var(--glass-border)", borderRadius: "24px" }}>
                  <label style={{ display: "block", marginBottom: "0.8rem", fontSize: "0.75rem", fontWeight: "900", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                    Professional Biography
                  </label>
                  <textarea
                    rows="4"
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    required
                    placeholder="Describe your expertise and what you seek to master..."
                    style={{ background: "#fff", border: "1px solid var(--glass-border)" }}
                  />
                </div>
              </div>

              <div>
                <div className="glass-panel" style={{ padding: "2rem", background: "rgba(248, 250, 252, 0.4)", border: "1px solid var(--glass-border)", borderRadius: "24px" }}>
                  <label style={{ display: "block", marginBottom: "0.8rem", fontSize: "0.75rem", fontWeight: "900", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                    Avatar URL
                  </label>
                  <input
                    value={form.profileImage}
                    onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
                    placeholder="External image link"
                    style={{ background: "#fff", border: "1px solid var(--glass-border)" }}
                  />
                </div>
              </div>

              <div>
                <div className="glass-panel" style={{ padding: "2rem", background: "rgba(248, 250, 252, 0.4)", border: "1px solid var(--glass-border)", borderRadius: "24px" }}>
                  <label style={{ display: "block", marginBottom: "0.8rem", fontSize: "0.75rem", fontWeight: "900", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                    Skills Offered
                  </label>
                  <input
                    value={form.skillsOffered}
                    onChange={(e) => setForm({ ...form, skillsOffered: e.target.value })}
                    required
                    placeholder="React, Design, Rust..."
                    style={{ background: "#fff", border: "1px solid var(--glass-border)" }}
                  />
                </div>
              </div>

              <div style={{ gridColumn: "span 2", marginTop: "2rem" }}>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%", padding: "1.3rem", fontSize: "1rem" }}>
                  {loading ? "Updating Master Persona..." : "Synchronize Identity Across Registry"}
                </button>
              </div>
            </div>
          </form>

          {message && (
            <div style={{
              marginTop: "3rem",
              padding: "1.5rem",
              borderRadius: "20px",
              background: message.startsWith("Error") ? "#fff5f5" : "var(--accent-glow)",
              textAlign: "center",
              color: message.startsWith("Error") ? "#e03131" : "var(--accent)",
              fontWeight: "850",
              border: message.startsWith("Error") ? "1px solid #ffe3e3" : "1px solid rgba(16, 185, 129, 0.1)",
              fontSize: "0.95rem"
            }}>
              {message}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Profile;
