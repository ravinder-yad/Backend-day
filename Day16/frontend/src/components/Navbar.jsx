import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
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
      <div className="ticker-wrap" style={{
        position: "fixed",
        top: 0,
        zIndex: 1100,
        height: "35px",
        background: scrolled ? "rgba(255,255,255,0.9)" : "#fff",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        transition: "var(--transition-ultra)"
      }}>
        <div className="ticker">
          {liveUpdates.concat(liveUpdates).map((msg, idx) => (
            <span key={idx} style={{ fontSize: "0.75rem", fontWeight: "800", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "0.6rem", textTransform: "uppercase", letterSpacing: "0.02em" }}>
              <span className="pulse-dot" style={{ width: "6px", height: "6px" }}></span> {msg}
            </span>
          ))}
        </div>
      </div>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} style={{
        top: "35px",
        paddingTop: scrolled ? "0.8rem" : "1.5rem",
        paddingBottom: scrolled ? "0.8rem" : "1.5rem",
      }}>
        <Link to="/" className="brand" onClick={() => setIsMenuOpen(false)} style={{ fontSize: "1.8rem", letterSpacing: "-0.04em", fontWeight: "950" }}>
          Skill<span style={{ color: "var(--accent)" }}>Swap</span>
        </Link>

        {/* Mobile Menu Button - Styled correctly */}
        <button className="nav-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{
          background: "rgba(0,0,0,0.03)",
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          display: "grid",
          placeItems: "center",
          border: "1px solid var(--glass-border)",
          cursor: "pointer",
          fontSize: "1.2rem"
        }}>
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <NavLink to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            MARKETPLACE
          </NavLink>
          {user ? (
            <>
              <NavLink to="/swaps" className="nav-link" onClick={() => setIsMenuOpen(false)}>MY SWAPS</NavLink>
              <NavLink to="/leaderboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>LEADERBOARD</NavLink>
              <NavLink to="/profile" className="nav-link" onClick={() => setIsMenuOpen(false)}>PROFILE</NavLink>
              <div className="desktop-only" style={{ width: "1px", height: "20px", background: "var(--glass-border)", margin: "0 0.5rem" }}></div>
              <button
                onClick={() => { logout(); setIsMenuOpen(false); }}
                className="btn"
                style={{
                  background: "#fff5f5",
                  color: "#ef4444",
                  borderRadius: "14px",
                  padding: "0.6rem 1.4rem",
                  fontSize: "0.8rem",
                  border: "1px solid #fee2e2",
                  fontWeight: "900"
                }}
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>LOGIN</Link>
              <Link to="/register" className="btn btn-primary" onClick={() => setIsMenuOpen(false)} style={{ padding: "0.8rem 2rem", borderRadius: "14px" }}>
                SIGN UP
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.1)", backdropFilter: "blur(4px)", zIndex: 900 }}
        />
      )}
    </>
  );
}

export default Navbar;
