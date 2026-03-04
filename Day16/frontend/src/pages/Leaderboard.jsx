import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Leaderboard() {
    const builders = [
        { id: 1, name: "Ravinder", swaps: 45, level: "Elite", avatar: "R", points: 2800 },
        { id: 2, name: "Golu", swaps: 38, level: "Pro", avatar: "G", points: 2100 },
        { id: 3, name: "Alex", swaps: 32, level: "Pro", avatar: "A", points: 1950 },
        { id: 4, name: "Sophia", swaps: 28, level: "Rising Star", avatar: "S", points: 1400 },
        { id: 5, name: "Arjun", swaps: 15, level: "Beginner", avatar: "A", points: 600 },
    ];

    return (
        <div className="app-shell" style={{ background: "var(--bg-secondary)" }}>
            <Navbar />
            <main className="dashboard-v2" style={{ paddingTop: "9rem" }}>
                <Sidebar />
                <section style={{ padding: "4rem 0", overflowY: "auto" }}>
                    <header style={{ padding: "0 8%", marginBottom: "5rem" }}>
                        <div className="live-indicator" style={{ marginBottom: "1.2rem", padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}>
                            🏆 NETWORK POWER RANKING
                        </div>
                        <h1 style={{ fontSize: "4.5rem", fontWeight: "950", color: "var(--text-main)", letterSpacing: "-0.04em" }}>Leaderboard</h1>
                        <p style={{ color: "var(--text-dim)", fontSize: "1.2rem", fontWeight: "500" }}>Recognizing the builders driving the registry forward.</p>
                    </header>

                    <div style={{ padding: "0 8%" }}>
                        <div className="glass-panel" style={{ padding: "0", borderRadius: "32px", overflow: "hidden", border: "1px solid rgba(16, 185, 129, 0.08)" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                                <thead>
                                    <tr style={{ background: "rgba(248, 250, 252, 0.8)", borderBottom: "1px solid var(--glass-border)" }}>
                                        <th style={{ padding: "2rem 2.5rem", fontWeight: "900", color: "var(--text-dim)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>Rank</th>
                                        <th style={{ padding: "2rem", fontWeight: "900", color: "var(--text-dim)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>Builder</th>
                                        <th style={{ padding: "2rem", fontWeight: "900", color: "var(--text-dim)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>Completed Swaps</th>
                                        <th style={{ padding: "2rem", fontWeight: "900", color: "var(--text-dim)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>Skill XP</th>
                                        <th style={{ padding: "2rem 2.5rem", fontWeight: "900", color: "var(--text-dim)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>Recognition</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {builders.map((b, i) => (
                                        <tr key={b.id} style={{ borderBottom: "1px solid var(--glass-border)", transition: "var(--transition-ultra)" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(16, 185, 129, 0.03)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                                            <td style={{ padding: "2rem 2.5rem", fontSize: "1.5rem", fontWeight: "950", color: i < 3 ? "var(--accent)" : "var(--text-dim)", letterSpacing: "-0.05em" }}>
                                                #{i + 1}
                                            </td>
                                            <td style={{ padding: "2rem" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                                                    <div style={{ width: "45px", height: "45px", borderRadius: "14px", background: "#fff", border: "1px solid var(--glass-border)", color: "var(--accent)", display: "grid", placeItems: "center", fontWeight: "950", boxShadow: "var(--shadow-crystal)" }}>{b.avatar}</div>
                                                    <span style={{ fontWeight: "850", color: "var(--text-main)", fontSize: "1.1rem" }}>{b.name}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: "2rem", fontWeight: "800", color: "var(--text-main)" }}>{b.swaps}</td>
                                            <td style={{ padding: "2rem", fontWeight: "900", color: "var(--accent)" }}>{b.points.toLocaleString()}</td>
                                            <td style={{ padding: "2rem 2.5rem" }}>
                                                <span style={{ padding: "0.6rem 1.2rem", borderRadius: "12px", background: "var(--accent-glow)", color: "var(--accent)", fontSize: "0.75rem", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.05em" }}>{b.level}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ marginTop: "6rem", textAlign: "center", padding: "6rem 4rem", background: "linear-gradient(135deg, var(--text-main), #1e293b)", borderRadius: "48px", color: "#fff", position: "relative", overflow: "hidden", boxShadow: "0 40px 80px -20px rgba(0,0,0,0.2)" }}>
                            <div style={{ position: "absolute", top: "-50%", right: "-20%", width: "400px", height: "400px", background: "var(--accent)", filter: "blur(120px)", opacity: "0.2" }}></div>
                            <h3 style={{ fontSize: "2.8rem", fontWeight: "950", marginBottom: "1.5rem", letterSpacing: "-0.03em" }}>Scale Your Influence</h3>
                            <p style={{ opacity: 0.8, fontSize: "1.2rem", marginBottom: "3.5rem", maxWidth: "600px", margin: "0 auto 3.5rem", fontWeight: "500" }}>Successfully completing swaps and contributing highly deep skill descriptions boosts your rank in the builder economy.</p>
                            <button className="btn btn-primary" style={{ padding: "1.2rem 4rem", fontSize: "1.1rem" }}>Post New Skill</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Leaderboard;
