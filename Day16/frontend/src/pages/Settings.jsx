import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

function Settings() {
    const { logout } = useAuth();

    return (
        <div className="app-shell">
            <Navbar />
            <main className="dashboard-v2">
                <Sidebar />
                <section style={{ padding: "3rem 0", background: "#fcfcfc", overflowY: "auto" }}>
                    <header style={{ padding: "0 8%", marginBottom: "4rem" }}>
                        <h1 style={{ fontSize: "3.5rem", fontWeight: "950", marginBottom: "0.6rem", color: "var(--text-main)" }}>Settings</h1>
                        <p style={{ color: "var(--text-dim)", fontSize: "1.2rem", fontWeight: "500" }}>
                            Manage your account and preferences.
                        </p>
                    </header>

                    <div style={{ padding: "0 8%" }}>
                        <div className="glass-panel" style={{ padding: "4rem", maxWidth: "800px" }}>
                            <div style={{ marginBottom: "3rem" }}>
                                <h3 style={{ fontSize: "1.8rem", fontWeight: "900", marginBottom: "1rem" }}>Account Information</h3>
                                <p style={{ color: "var(--text-dim)", marginBottom: "2rem" }}>Update your security and login credentials.</p>

                                <div style={{ display: "grid", gap: "2rem" }}>
                                    <div>
                                        <label style={{ display: "block", marginBottom: "0.8rem", fontSize: "0.85rem", fontWeight: "800", color: "var(--text-dim)" }}>CHANGE PASSWORD</label>
                                        <input type="password" placeholder="New Password" disabled style={{ background: "#f8fafc", cursor: "not-allowed" }} />
                                        <p style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginTop: "0.5rem" }}>Password reset is currently disabled for this demo.</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "3rem", marginBottom: "3rem" }}>
                                <h3 style={{ fontSize: "1.8rem", fontWeight: "900", marginBottom: "1rem" }}>Visual Preferences</h3>
                                <p style={{ color: "var(--text-dim)", marginBottom: "2rem" }}>Customize your SkillSwap experience.</p>

                                <div style={{ padding: "1.5rem", background: "var(--accent-glow)", borderRadius: "20px", border: "1px solid rgba(16, 185, 129, 0.1)" }}>
                                    <p style={{ fontWeight: "750", color: "var(--accent)" }}>Current Theme: Ultra Premium Light Mode ⚪</p>
                                    <p style={{ fontSize: "0.9rem", color: "var(--text-dim)", marginTop: "0.5rem" }}>Theme switching will be available in the next major update.</p>
                                </div>
                            </div>

                            <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "3rem" }}>
                                <button onClick={logout} className="btn" style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fee2e2", padding: "1rem 3rem", width: "100%", justifyContent: "center", fontSize: "1rem", fontWeight: "800" }}>
                                    Sign Out of Account
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Settings;
