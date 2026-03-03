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

      <div style={{ padding: "1.8rem", marginTop: "4rem", borderRadius: "24px", background: "#f8fafc", border: "1px solid #f1f5f9" }}>
        <p style={{ fontSize: "0.9rem", fontWeight: "750", marginBottom: "0.4rem", color: "var(--text-main)" }}>
          {stats.levelName}
        </p>
        <p style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginBottom: "0.8rem", fontWeight: "600", textTransform: "uppercase" }}>
          Skill Level
        </p>
        <div style={{ height: "8px", width: "100%", background: "#e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: stats.progress, background: "var(--accent)", borderRadius: "10px", transition: "width 1s ease-in-out" }}></div>
        </div>
        <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "1rem", lineHeight: "1.5" }}>
          Post more skills and complete swaps to increase your builder level!
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
