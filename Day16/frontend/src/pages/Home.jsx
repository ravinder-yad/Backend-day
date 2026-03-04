import { Link, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="app-shell" style={{ background: "var(--bg-secondary)", minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar />

      {/* Decorative Blur Blobs */}
      <div style={{ position: "absolute", top: "10%", left: "10%", width: "400px", height: "400px", background: "var(--accent-glow)", filter: "blur(100px)", borderRadius: "50%", zIndex: 0, opacity: 0.6 }}></div>
      <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "500px", height: "500px", background: "rgba(59, 130, 246, 0.1)", filter: "blur(120px)", borderRadius: "50%", zIndex: 0, opacity: 0.4 }}></div>

      <main className="hero" style={{ position: "relative", zIndex: 1, paddingTop: "12rem", paddingBottom: "8rem" }}>
        <div className="live-indicator" style={{ marginBottom: "2rem", padding: "0.6rem 1.5rem", fontSize: "0.85rem", letterSpacing: "0.1em" }}>
          🌐 JOIN 1,240+ BUILDERS GLOBAL NETWORK
        </div>
        <h1 style={{ fontSize: "clamp(4rem, 12vw, 8rem)", fontWeight: "950", letterSpacing: "-0.05em", lineHeight: "0.9", marginBottom: "3rem", color: "var(--text-main)" }}>
          Master Any Skill<br /><span style={{ color: "var(--accent)" }}>Through Exchange.</span>
        </h1>
        <p style={{ fontSize: "1.4rem", color: "var(--text-dim)", maxWidth: "850px", margin: "0 auto 4rem", lineHeight: "1.6", fontWeight: "500" }}>
          Unlock the true potential of decentralized knowledge. Trade your expertise for mastery in new domains.
          No monetary barriers—just pure collaborative growth in a high-trust builder network.
        </p>
        <div className="hero-actions" style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}>
          <Link to="/register" className="btn btn-primary" style={{ padding: "1.2rem 4rem", fontSize: "1.1rem" }}>
            Start Building Free
          </Link>
          <Link to="/login" className="btn btn-ghost" style={{ padding: "1.2rem 3rem", fontSize: "1.1rem", background: "#fff", boxShadow: "var(--shadow-crystal)" }}>
            Explore Registry
          </Link>
        </div>
      </main>

      <section style={{ padding: "0 8% 10rem", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2.5rem" }}>
          <div className="glass-panel" style={{ padding: "4rem", border: "1px solid rgba(16, 185, 129, 0.12)" }}>
            <div style={{ width: "60px", height: "60px", background: "var(--accent-glow)", borderRadius: "18px", display: "grid", placeItems: "center", fontSize: "1.8rem", marginBottom: "2rem" }}>🤝</div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "950", marginBottom: "1.5rem", letterSpacing: "-0.03em" }}>Direct Exchange</h2>
            <p style={{ color: "var(--text-dim)", fontSize: "1.15rem", lineHeight: "1.8", fontWeight: "500" }}>
              Our engine facilitates one-to-one expertise swaps. Connect with founders, engineers, and designers
              ready to trade their deep technical knowledge for your unique insights.
            </p>
            <div style={{ marginTop: "3rem", height: "4px", width: "80px", background: "var(--accent)", borderRadius: "10px" }}></div>
          </div>

          <div className="glass-panel" style={{ padding: "4rem", border: "1px solid rgba(59, 130, 246, 0.12)" }}>
            <div style={{ width: "60px", height: "60px", background: "rgba(59, 130, 246, 0.1)", borderRadius: "18px", display: "grid", placeItems: "center", fontSize: "1.8rem", marginBottom: "2rem" }}>📈</div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "950", marginBottom: "1.5rem", letterSpacing: "-0.03em" }}>Reputation Economy</h2>
            <p style={{ color: "var(--text-dim)", fontSize: "1.15rem", lineHeight: "1.8", fontWeight: "500" }}>
              Every successful swap contributes to your global "Skill Points" and network rank.
              Move from search-based learning to collaboration-led mastery in record time.
            </p>
            <div style={{ marginTop: "3rem", height: "4px", width: "80px", background: "var(--accent-secondary)", borderRadius: "10px" }}></div>
          </div>
        </div>

        <div style={{ marginTop: "4rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.85rem", fontWeight: "900", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "2rem" }}>FEATURED IN REGISTRY</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "3rem", opacity: 0.7 }}>
            {["React 19", "Rust", "LLM Design", "Web3 Security", "Go Microservices", "UI/UX"].map((tag, idx) => (
              <span key={idx} style={{ fontSize: "1rem", fontWeight: "800", color: "var(--text-main)" }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ padding: "4rem 8%", textAlign: "center", borderTop: "1px solid var(--glass-border)", background: "#fff" }}>
        <p style={{ fontSize: "0.95rem", color: "var(--text-dim)", fontWeight: "600" }}>
          © 2026 SkillSwap Hub. Building the future of collaborative education.
        </p>
      </footer>
    </div>
  );
}

export default Home;
