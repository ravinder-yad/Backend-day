import { Link, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main className="hero">
        <h1 style={{ marginBottom: "1rem" }}>
          Master any skill through <span>Skill Exchange.</span>
        </h1>
        <p>
          Join a global network of builders trading expertise. No money, just pure knowledge transfer.
          Scale your craft by teaching what you know and learning what you don't.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn btn-primary">
            Get Started Now
          </Link>
          <Link to="/login" className="btn btn-ghost">
            Explore Registry
          </Link>
        </div>
      </main>

      <section style={{ paddingBottom: "5rem" }}>
        <div className="bento-grid">
          <div className="glass-panel" style={{ gridColumn: "span 6", padding: "3rem" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Pure Exchange</h2>
            <p style={{ color: "var(--text-dim)", lineHeight: "1.7" }}>
              Our platform operates on direct value exchange. Connect with developers, designers,
              and founders who want to trade their mastery for yours.
            </p>
          </div>
          <div className="glass-panel" style={{ gridColumn: "span 6", padding: "3rem" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Verified Growth</h2>
            <p style={{ color: "var(--text-dim)", lineHeight: "1.7" }}>
              Every swap builds your reputation. Grow your professional network while acquiring
              high-demand skills through hands-on collaboration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
