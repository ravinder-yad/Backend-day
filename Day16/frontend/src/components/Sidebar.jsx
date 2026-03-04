import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { api } from "../services/api";

function Sidebar() {
  const [stats, setStats] = useState({ progress: "5%", levelName: "Newcomer" });

  useEffect(() => {
    const loadUserStats = async () => {
      try {
        const data = await api.getMyStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load user stats", err);
      }
    };
    loadUserStats();
  }, []);

  return (
    <aside className="sidebar-v2">
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: "900", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "1.8rem" }}>
          Navigation
        </p>
        <NavLink to="/dashboard" className="side-link-v2">
          <span style={{ fontSize: "1.2rem" }}>🌐</span> Marketplace
        </NavLink>
        <NavLink to="/swaps" className="side-link-v2">
          <span style={{ fontSize: "1.2rem" }}>🤝</span> My Swaps
        </NavLink>
        <NavLink to="/leaderboard" className="side-link-v2">
          <span style={{ fontSize: "1.2rem" }}>🏆</span> Leaderboard
        </NavLink>
        <NavLink to="/profile" className="side-link-v2">
          <span style={{ fontSize: "1.2rem" }}>👤</span> My Profile
        </NavLink>
        <NavLink to="/settings" className="side-link-v2">
          <span style={{ fontSize: "1.2rem" }}>⚙️</span> Settings
        </NavLink>
      </div>

      <div style={{ padding: "2.2rem", marginTop: "4rem", borderRadius: "32px", background: "#fff", border: "1px solid var(--glass-border)", boxShadow: "var(--shadow-crystal)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "60px", height: "60px", background: "var(--accent-glow)", filter: "blur(20px)", borderRadius: "50%", opacity: 0.5 }}></div>
        <p style={{ fontSize: "0.95rem", fontWeight: "950", marginBottom: "0.5rem", color: "var(--text-main)", letterSpacing: "-0.02em" }}>
          {stats.levelName}
        </p>
        <p style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginBottom: "1.2rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Builder Rank
        </p>
        <div style={{ height: "10px", width: "100%", background: "rgba(16, 185, 129, 0.05)", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(16, 185, 129, 0.05)" }}>
          <div style={{ height: "100%", width: stats.progress, background: "linear-gradient(90deg, var(--accent), #34d399)", borderRadius: "10px", transition: "width 1.5s cubic-bezier(0.16, 1, 0.3, 1)" }}></div>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginTop: "1.5rem", lineHeight: "1.6", fontWeight: "600" }}>
          Post quality listings to climb the registry hierarchy.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
