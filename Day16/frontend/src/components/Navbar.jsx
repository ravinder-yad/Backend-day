import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const liveUpdates = [
    "🚀 New Skill: Rust Concurrency posted by Alex",
    "✨ Swap accepted: UI Design for PyScript",
    "🟢 42 Builders active in the Registry right now",
    "🏆 Top Contributor this week: Ravinder",
    "🤝 12 New swaps initiated in the last hour"
  ];

  return (
    <>
      <div className="ticker-wrap">
        <div className="ticker">
          {liveUpdates.concat(liveUpdates).map((msg, idx) => (
            <span key={idx} style={{ fontSize: "0.8rem", fontWeight: "750", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="pulse-dot"></span> {msg}
            </span>
          ))}
        </div>
      </div>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} style={{ top: "35px" }}>
        <Link to="/" className="brand" onClick={() => setIsMenuOpen(false)}>
          Skill<span>Swap</span>
        </Link>

        <button className="nav-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <NavLink to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Marketplace
          </NavLink>
          {user ? (
            <>
              <NavLink to="/swaps" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                My Swaps
              </NavLink>
              <NavLink to="/leaderboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Leaderboard
              </NavLink>
              <NavLink to="/profile" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Profile
              </NavLink>
              <NavLink to="/settings" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Settings
              </NavLink>
              <button
                onClick={() => { logout(); setIsMenuOpen(false); }}
                className="btn btn-ghost"
                style={{ background: "#fef2f2", color: "#dc2626", borderRadius: "12px", padding: "0.6rem 1.5rem" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
