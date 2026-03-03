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
        <div className="app-shell">
            <Navbar />
            <main className="dashboard-v2">
                <Sidebar />
                <section style={{ padding: "3rem 0", background: "#fcfcfc", overflowY: "auto" }}>
                    <header style={{ padding: "0 8%", marginBottom: "4rem" }}>
                        <h1 style={{ fontSize: "3.5rem", fontWeight: "950", marginBottom: "0.6rem", color: "var(--text-main)" }}>My Swaps</h1>
                        <p style={{ color: "var(--text-dim)", fontSize: "1.2rem", fontWeight: "500" }}>
                            Track and manage your skill exchange conversations.
                        </p>
                    </header>

                    <div style={{ padding: "0 8%" }}>
                        {/* Received Requests */}
                        <h2 style={{ fontSize: "1.8rem", fontWeight: "900", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                            Incoming Requests <span style={{ fontSize: "1rem", color: "var(--accent)", background: "var(--accent-glow)", padding: "0.2rem 0.8rem", borderRadius: "100px" }}>{receivedRequests.length}</span>
                        </h2>

                        <div style={{ display: "grid", gap: "1.5rem", marginBottom: "5rem" }}>
                            {receivedRequests.length > 0 ? (
                                receivedRequests.map(req => (
                                    <div key={req._id} className="glass-panel" style={{ padding: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div>
                                            <h4 style={{ fontSize: "1.2rem", fontWeight: "800", marginBottom: "0.4rem" }}>{req.skill?.title || "Unknown Skill"}</h4>
                                            <p style={{ color: "var(--text-dim)", fontSize: "0.95rem" }}>
                                                From <span style={{ fontWeight: "700", color: "var(--text-main)" }}>{req.sender.name}</span>
                                            </p>
                                            {req.message && (
                                                <p style={{ marginTop: "1rem", fontStyle: "italic", color: "var(--text-dim)", borderLeft: "3px solid var(--accent)", paddingLeft: "1rem" }}>
                                                    "{req.message}"
                                                </p>
                                            )}
                                        </div>

                                        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                            {req.status === "pending" ? (
                                                <>
                                                    <button onClick={() => handleStatusUpdate(req._id, "accepted")} className="btn btn-primary" style={{ padding: "0.6rem 2rem" }}>Accept</button>
                                                    <button onClick={() => handleStatusUpdate(req._id, "rejected")} className="btn" style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fee2e2", padding: "0.6rem 2rem" }}>Reject</button>
                                                </>
                                            ) : (
                                                <span style={{
                                                    fontWeight: "800",
                                                    textTransform: "uppercase",
                                                    fontSize: "0.8rem",
                                                    color: req.status === "accepted" ? "var(--accent)" : "#dc2626",
                                                    background: req.status === "accepted" ? "var(--accent-glow)" : "#fef2f2",
                                                    padding: "0.4rem 1rem",
                                                    borderRadius: "100px"
                                                }}>
                                                    {req.status}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: "var(--text-dim)", textAlign: "center", padding: "3rem", background: "#f8fafc", borderRadius: "24px", border: "1px dashed #e2e8f0" }}>No incoming requests yet.</p>
                            )}
                        </div>

                        {/* Sent Requests */}
                        <h2 style={{ fontSize: "1.8rem", fontWeight: "900", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                            Sent Requests <span style={{ fontSize: "1rem", color: "var(--text-dim)", background: "#f1f5f9", padding: "0.2rem 0.8rem", borderRadius: "100px" }}>{sentRequests.length}</span>
                        </h2>

                        <div style={{ display: "grid", gap: "1.5rem" }}>
                            {sentRequests.length > 0 ? (
                                sentRequests.map(req => (
                                    <div key={req._id} className="glass-panel" style={{ padding: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div>
                                            <h4 style={{ fontSize: "1.2rem", fontWeight: "800", marginBottom: "0.4rem" }}>{req.skill?.title || "Unknown Skill"}</h4>
                                            <p style={{ color: "var(--text-dim)", fontSize: "0.95rem" }}>
                                                Sent to <span style={{ fontWeight: "700", color: "var(--text-main)" }}>{req.receiver.name}</span>
                                            </p>
                                        </div>
                                        <div>
                                            <span style={{
                                                fontWeight: "800",
                                                textTransform: "uppercase",
                                                fontSize: "0.8rem",
                                                color: req.status === "pending" ? "#eab308" : (req.status === "accepted" ? "var(--accent)" : "#dc2626"),
                                                background: req.status === "pending" ? "#fef9c3" : (req.status === "accepted" ? "var(--accent-glow)" : "#fef2f2"),
                                                padding: "0.4rem 1rem",
                                                borderRadius: "100px"
                                            }}>
                                                {req.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: "var(--text-dim)", textAlign: "center", padding: "3rem", background: "#f8fafc", borderRadius: "24px", border: "1px dashed #e2e8f0" }}>You haven't sent any requests yet.</p>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default MySwaps;
