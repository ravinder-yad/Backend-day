import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

function MySwaps() {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadRequests = async () => {
        try {
            const data = await api.myRequests();
            setRequests(data.requests || []);
        } catch (err) {
            console.error("Failed to load requests", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRequests();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.updateRequestStatus(id, { status });
            window.alert(`Request ${status}! ✨`);
            loadRequests();
        } catch (err) {
            window.alert(err.message);
        }
    };

    const receivedRequests = requests.filter(r => r.receiver._id === user?._id);
    const sentRequests = requests.filter(r => r.sender._id === user?._id);

    return (
        <div className="app-shell" style={{ background: "var(--bg-secondary)" }}>
            <Navbar />
            <main className="dashboard-v2" style={{ paddingTop: "9rem" }}>
                <Sidebar />
                <section style={{ padding: "4rem 0", overflowY: "auto" }}>
                    <header style={{ padding: "0 8%", marginBottom: "5rem" }}>
                        <div className="live-indicator" style={{ display: "inline-flex", marginBottom: "1.2rem", padding: "0.5rem 1.2rem", fontSize: "0.75rem" }}>
                            <span className="pulse-dot"></span> ACTIVE NEGOTIATIONS
                        </div>
                        <h1 style={{ fontSize: "4.5rem", fontWeight: "950", color: "var(--text-main)", letterSpacing: "-0.04em" }}>My Swaps</h1>
                        <p style={{ color: "var(--text-dim)", fontSize: "1.2rem", fontWeight: "500" }}>Manage your collaborative knowledge exchanges.</p>
                    </header>

                    <div style={{ padding: "0 8%" }}>
                        {/* Incoming Section */}
                        <div style={{ marginBottom: "7rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
                                <h2 style={{ fontSize: "2.2rem", fontWeight: "950", letterSpacing: "-0.02em" }}>Incoming Requests</h2>
                                <div style={{ fontSize: "0.85rem", fontWeight: "900", color: "var(--accent)", background: "var(--accent-glow)", padding: "0.5rem 1.5rem", borderRadius: "14px", border: "1px solid rgba(16, 185, 129, 0.1)" }}>
                                    {receivedRequests.length} PENDING
                                </div>
                            </div>

                            <div style={{ display: "grid", gap: "2rem" }}>
                                {receivedRequests.length > 0 ? (
                                    receivedRequests.map(req => (
                                        <div key={req._id} className="glass-panel" style={{ padding: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(16, 185, 129, 0.1)" }}>
                                            <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
                                                <div style={{ width: "60px", height: "60px", borderRadius: "18px", background: "#fff", display: "grid", placeItems: "center", fontSize: "1.5rem", boxShadow: "var(--shadow-crystal)", fontWeight: "950", color: "var(--accent)" }}>
                                                    {req.sender.name[0]}
                                                </div>
                                                <div>
                                                    <p style={{ fontSize: "0.7rem", fontWeight: "900", color: "var(--text-dim)", textTransform: "uppercase", marginBottom: "0.4rem", letterSpacing: "0.1em" }}>Request From {req.sender.name}</p>
                                                    <h4 style={{ fontSize: "1.6rem", fontWeight: "900", color: "var(--text-main)", letterSpacing: "-0.01em" }}>{req.skill?.title || "Expert Exchange"}</h4>
                                                    {req.message && (
                                                        <div style={{ marginTop: "1.5rem", padding: "1rem 1.5rem", background: "#f8fafc", borderRadius: "14px", borderLeft: "4px solid var(--accent)", fontSize: "0.95rem", color: "var(--text-dim)", fontWeight: "500" }}>
                                                            {req.message}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", gap: "1rem" }}>
                                                {req.status === "pending" ? (
                                                    <>
                                                        <button onClick={() => handleStatusUpdate(req._id, "accepted")} className="btn btn-primary" style={{ padding: "0.9rem 2.5rem", borderRadius: "14px" }}>Accept Swap</button>
                                                        <button onClick={() => handleStatusUpdate(req._id, "rejected")} className="btn" style={{ background: "#fff", color: "#ef4444", border: "1px solid #fee2e2", padding: "0.9rem 2.5rem", borderRadius: "14px", fontWeight: "800" }}>Decline</button>
                                                    </>
                                                ) : (
                                                    <div style={{
                                                        padding: "0.8rem 1.8rem",
                                                        borderRadius: "14px",
                                                        background: req.status === "accepted" ? "var(--accent-glow)" : "#fff5f5",
                                                        color: req.status === "accepted" ? "var(--accent)" : "#ef4444",
                                                        fontWeight: "900",
                                                        fontSize: "0.75rem",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.1em",
                                                        border: req.status === "accepted" ? "1px solid rgba(16, 185, 129, 0.1)" : "1px solid #fee2e2"
                                                    }}>
                                                        {req.status}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="glass-panel" style={{ padding: "5rem", textAlign: "center", background: "transparent", border: "1px dashed var(--glass-border)" }}>
                                        <p style={{ color: "var(--text-dim)", fontSize: "1.1rem", fontWeight: "600" }}>Registry is quiet. No incoming transmissions detected.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Outgoing Section */}
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
                                <h2 style={{ fontSize: "2.2rem", fontWeight: "950", letterSpacing: "-0.02em" }}>Sent Inquiries</h2>
                                <div style={{ fontSize: "0.85rem", fontWeight: "900", color: "var(--text-dim)", background: "rgba(241, 245, 249, 0.6)", padding: "0.5rem 1.5rem", borderRadius: "14px", border: "1px solid var(--glass-border)" }}>
                                    {sentRequests.length} TOTAL INITIATED
                                </div>
                            </div>

                            <div style={{ display: "grid", gap: "1.5rem" }}>
                                {sentRequests.length > 0 ? (
                                    sentRequests.map(req => (
                                        <div key={req._id} className="glass-panel" style={{ padding: "2.5rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
                                                <div style={{ width: "50px", height: "50px", borderRadius: "16px", background: "#f8fafc", border: "1px solid var(--glass-border)", display: "grid", placeItems: "center", fontSize: "1.2rem" }}>🛰️</div>
                                                <div>
                                                    <p style={{ fontSize: "0.65rem", fontWeight: "900", color: "var(--text-dim)", textTransform: "uppercase", marginBottom: "0.2rem", letterSpacing: "0.1em" }}>Sent to {req.receiver.name}</p>
                                                    <h4 style={{ fontSize: "1.4rem", fontWeight: "850", color: "var(--text-main)" }}>{req.skill?.title || "Mastery Exchange"}</h4>
                                                </div>
                                            </div>
                                            <div style={{
                                                padding: "0.7rem 1.5rem",
                                                borderRadius: "12px",
                                                background: req.status === "pending" ? "#fffbeb" : (req.status === "accepted" ? "var(--accent-glow)" : "#fff5f5"),
                                                color: req.status === "pending" ? "#d97706" : (req.status === "accepted" ? "var(--accent)" : "#ef4444"),
                                                fontWeight: "900",
                                                fontSize: "0.7rem",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.1em",
                                                border: "1px solid rgba(0,0,0,0.02)"
                                            }}>
                                                {req.status}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="glass-panel" style={{ padding: "4rem", textAlign: "center", background: "transparent", border: "1px dashed var(--glass-border)" }}>
                                        <p style={{ color: "var(--text-dim)", fontSize: "1rem", fontWeight: "600" }}>Start your first swap by exploring the marketplace.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default MySwaps;
