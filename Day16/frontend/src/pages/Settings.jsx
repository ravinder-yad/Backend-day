import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

function Settings() {
    const { logout } = useAuth();

    return (
        <div className="app-shell" style={{ background: "var(--bg-secondary)" }}>
            <Navbar />
            <main className="dashboard-v2" style={{ paddingTop: "9rem" }}>
                <Sidebar />
                <section style={{ padding: "4rem 0", overflowY: "auto" }}>
                    <header style={{ padding: "0 8%", marginBottom: "5rem" }}>
                        <div className="live-indicator" style={{ display: "inline-flex", marginBottom: "1.2rem", padding: "0.5rem 1.2rem", fontSize: "0.75rem" }}>
                            <span className="pulse-dot"></span> PREFERENCES & CORE CONFIG
                        </div>
                        <h1 style={{ fontSize: "4.5rem", fontWeight: "950", color: "var(--text-main)", letterSpacing: "-0.04em" }}>Settings</h1>
                        <p style={{ color: "var(--text-dim)", fontSize: "1.2rem", fontWeight: "500" }}>Fine-tune your experience and account parameters.</p>
                    </header>

                    <div style={{ padding: "0 8%" }}>
                        <div className="glass-panel" style={{ padding: "5rem", maxWidth: "900px", border: "1px solid rgba(16, 185, 129, 0.05)" }}>

                            <div style={{ marginBottom: "5rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                                    <div style={{ width: "10px", height: "10px", background: "var(--accent)", borderRadius: "50%" }}></div>
                                    <h3 style={{ fontSize: "2.2rem", fontWeight: "950", letterSpacing: "-0.02em" }}>Account Protocols</h3>
                                </div>
                                <p style={{ color: "var(--text-dim)", fontSize: "1.1rem", marginBottom: "3rem", fontWeight: "500" }}>Manage your authentication and security layers.</p>

                                <div style={{ display: "grid", gap: "2.5rem" }}>
                                    <div className="glass-panel" style={{ padding: "2.5rem", background: "rgba(248, 250, 252, 0.5)", border: "1px solid var(--glass-border)", borderRadius: "24px" }}>
                                        <label style={{ display: "block", marginBottom: "1rem", fontSize: "0.75rem", fontWeight: "900", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>Current Security Status</label>
                                        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                                            <div style={{ padding: "0.6rem 1.5rem", background: "var(--accent-glow)", color: "var(--accent)", borderRadius: "12px", border: "1px solid rgba(16, 185, 129, 0.1)", fontWeight: "900", fontSize: "0.8rem" }}>ENCRYPTED</div>
                                            <span style={{ fontSize: "0.95rem", color: "var(--text-dim)", fontWeight: "600" }}>Standard JWT Session active.</span>
                                        </div>
                                    </div>

                                    <div className="glass-panel" style={{ padding: "2.5rem", background: "rgba(248, 250, 252, 0.5)", border: "1px solid var(--glass-border)", borderRadius: "24px", opacity: 0.6 }}>
                                        <label style={{ display: "block", marginBottom: "1rem", fontSize: "0.75rem", fontWeight: "900", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.15em" }}>Password Modification</label>
                                        <input type="password" placeholder="••••••••" disabled style={{ background: "#fff", cursor: "not-allowed", border: "1px dashed var(--glass-border)" }} />
                                        <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginTop: "1rem", fontWeight: "600" }}>Protocol restricted across local development environment.</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "5rem", marginBottom: "5rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                                    <div style={{ width: "10px", height: "10px", background: "var(--accent-secondary)", borderRadius: "50%" }}></div>
                                    <h3 style={{ fontSize: "2.2rem", fontWeight: "950", letterSpacing: "-0.02em" }}>Visual Environment</h3>
                                </div>
                                <p style={{ color: "var(--text-dim)", fontSize: "1.1rem", marginBottom: "3rem", fontWeight: "500" }}>Customize your interface and interaction engine.</p>

                                <div style={{ padding: "2.5rem", background: "#0ea5e908", borderRadius: "28px", border: "1px solid rgba(14, 165, 233, 0.1)" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div>
                                            <p style={{ fontSize: "1.1rem", fontWeight: "850", color: "var(--text-main)", marginBottom: "0.3rem" }}>Crystal Light Engine 3.0</p>
                                            <p style={{ fontSize: "0.9rem", color: "var(--text-dim)", fontWeight: "500" }}>Active ultra-premium visual profile.</p>
                                        </div>
                                        <div style={{ padding: "0.6rem 1.5rem", background: "#fff", border: "1px solid #e0f2fe", borderRadius: "12px", color: "var(--accent-secondary)", fontWeight: "950", fontSize: "0.8rem" }}>CURRENT</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "5rem" }}>
                                <button onClick={logout} className="btn" style={{ background: "#fff1f1", color: "#ef4444", border: "1px solid #fee2e2", padding: "1.3rem", width: "100%", borderRadius: "20px", fontSize: "1.1rem", transition: "var(--transition-bounce)" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(0.98)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
                                    Terminate Session & Sign Out
                                </button>
                                <p style={{ textAlign: "center", marginTop: "1.5rem", color: "var(--text-dim)", fontSize: "0.85rem", fontWeight: "600" }}>Ensure all negotiations are saved before terminating connectivity.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Settings;
