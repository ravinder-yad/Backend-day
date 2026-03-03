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
        <div className="app-shell">
            <Navbar />
            <main className="dashboard-v2" style={{ paddingTop: "8rem" }}>
                <Sidebar />
                <section style={{ padding: "3rem 0", background: "#fcfcfc", overflowY: "auto" }}>
                    <header style={{ padding: "0 8%", marginBottom: "4rem" }}>
                        <div className="live-indicator" style={{ marginBottom: "1rem" }}>
                            🏆 TOP CONTRIBUTORS
                        </div>
                        <h1 style={{ fontSize: "3.5rem", fontWeight: "950", color: "var(--text-main)" }}>Leaderboard</h1>
                        <p style={{ color: "var(--text-dim)", fontSize: "1.2rem" }}>Recognizing the most active builders in our exchange registry.</p>
                    </header>

                    <div style={{ padding: "0 8%" }}>
                        <div className="glass-panel" style={{ padding: "0", borderRadius: "32px", overflow: "hidden" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                                <thead>
                                    <tr style={{ background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                                        <th style={{ padding: "1.5rem 2.5rem", fontWeight: "800", color: "var(--text-dim)", fontSize: "0.75rem", textTransform: "uppercase" }}>Rank</th>
                                        <th style={{ padding: "1.5rem", fontWeight: "800", color: "var(--text-dim)", fontSize: "0.75rem", textTransform: "uppercase" }}>Builder</th>
                                        <th style={{ padding: "1.5rem", fontWeight: "800", color: "var(--text-dim)", fontSize: "0.75rem", textTransform: "uppercase" }}>Swaps Completed</th>
                                        <th style={{ padding: "1.5rem", fontWeight: "800", color: "var(--text-dim)", fontSize: "0.75rem", textTransform: "uppercase" }}>Skill Points</th>
                                        <th style={{ padding: "1.5rem 2.5rem", fontWeight: "800", color: "var(--text-dim)", fontSize: "0.75rem", textTransform: "uppercase" }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {builders.map((b, i) => (
                                        <tr key={b.id} style={{ borderBottom: "1px solid #f1f5f9", transition: "0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "#fcfdfd"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                                            <td style={{ padding: "1.5rem 2.5rem", fontSize: "1.2rem", fontWeight: "900", color: i < 3 ? "var(--accent)" : "var(--text-dim)" }}>
                                                #{i + 1}
                                            </td>
                                            <td style={{ padding: "1.5rem" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                                    <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "var(--accent-glow)", color: "var(--accent)", display: "grid", placeItems: "center", fontWeight: "900" }}>{b.avatar}</div>
                                                    <span style={{ fontWeight: "750", color: "var(--text-main)" }}>{b.name}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: "1.5rem", fontWeight: "750" }}>{b.swaps}</td>
                                            <td style={{ padding: "1.5rem", fontWeight: "750", color: "var(--accent)" }}>{b.points} XP</td>
                                            <td style={{ padding: "1.5rem 2.5rem" }}>
                                                <span style={{ padding: "0.4rem 0.8rem", borderRadius: "100px", background: "#f1f5f9", fontSize: "0.7rem", fontWeight: "800", textTransform: "uppercase" }}>{b.level}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ marginTop: "4rem", textAlign: "center", padding: "4rem", background: "linear-gradient(135deg, var(--accent), #3b82f6)", borderRadius: "32px", color: "#fff" }}>
                            <h3 style={{ fontSize: "2rem", fontWeight: "900", marginBottom: "1rem" }}>Ready to climb the ranks?</h3>
                            <p style={{ opacity: 0.9, fontSize: "1.1rem", marginBottom: "2rem" }}>Complete more skill swaps to earn Skill Points and unlock exclusive builder badges.</p>
                            <button className="btn" style={{ background: "#fff", color: "var(--accent)", padding: "1rem 3rem" }}>Start Swapping</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Leaderboard;
