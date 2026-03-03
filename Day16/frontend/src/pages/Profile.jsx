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
    <div className="app-shell" style={{ background: "#fcfcfc" }}>
      <Navbar />
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "10rem 2rem 6rem" }}>
        <section className="glass-panel" style={{ width: "100%", max_width: "750px", padding: "4.5rem", boxShadow: "0 30px 60px -15px rgba(0,0,0,0.08)" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{
              width: "150px",
              height: "150px",
              borderRadius: "40px",
              background: "#f1f5f9",
              margin: "0 auto 2.5rem",
              display: "grid",
              placeItems: "center",
              fontSize: "4rem",
              fontWeight: "950",
              color: "var(--accent)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
              overflow: "hidden",
              border: "1px solid #e2e8f0"
            }}>
              {form.profileImage ? (
                <img src={form.profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                avatarLetter
              )}
            </div>
            <h2 style={{ fontSize: "2.8rem", fontWeight: "950", marginBottom: "0.6rem", color: "var(--text-main)" }}>Builder Identity</h2>
            <p style={{ color: "var(--text-dim)", fontSize: "1.1rem", fontWeight: "500" }}>Manage your persona in the global marketplace.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", marginBottom: "0.7rem", fontSize: "0.80rem", fontWeight: "850", color: "var(--text-dim)", letterSpacing: "0.05em" }}>
                  PUBLIC DISPLAY NAME
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", marginBottom: "0.7rem", fontSize: "0.80rem", fontWeight: "850", color: "var(--text-dim)", letterSpacing: "0.05em" }}>
                  PROFESSIONAL BIOGRAPHY
                </label>
                <textarea
                  rows="4"
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  required
                  placeholder="What are you building? What is your expertise?"
                />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", marginBottom: "0.7rem", fontSize: "0.80rem", fontWeight: "850", color: "var(--text-dim)", letterSpacing: "0.05em" }}>
                  AVATAR IMAGE URL
                </label>
                <input
                  value={form.profileImage}
                  onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", marginBottom: "0.7rem", fontSize: "0.80rem", fontWeight: "850", color: "var(--text-dim)", letterSpacing: "0.05em" }}>
                  SKILLS TO EXCHANGE (COMMA SEPARATED)
                </label>
                <input
                  value={form.skillsOffered}
                  onChange={(e) => setForm({ ...form, skillsOffered: e.target.value })}
                  required
                  placeholder="Next.js, UI Design, Rust, Marketing"
                />
              </div>

              <div style={{ gridColumn: "span 2", marginTop: "1.5rem" }}>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "1.1rem", fontSize: "1rem" }}>
                  {loading ? "Updating Identity..." : "Synchronize Profile"}
                </button>
              </div>
            </div>
          </form>

          {message && (
            <div style={{
              marginTop: "2rem",
              padding: "1.2rem",
              borderRadius: "16px",
              background: message.startsWith("Error") ? "#fef2f2" : "#f0fdf4",
              textAlign: "center",
              color: message.startsWith("Error") ? "#dc2626" : "var(--accent)",
              fontWeight: "750",
              border: message.startsWith("Error") ? "1px solid #fee2e2" : "1px solid #dcfce7"
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
