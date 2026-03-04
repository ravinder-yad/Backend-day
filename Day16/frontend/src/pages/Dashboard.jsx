import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SkillCard from "../components/SkillCard";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [viewMode, setViewMode] = useState("all"); // "all" or "mine"

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [stats, setStats] = useState({ activeBuilders: 0, swapsToday: 0, registryHealth: "0%" });
  const [activity, setActivity] = useState([]);

  const loadData = async (mode = viewMode) => {
    try {
      const isMine = mode === "mine";
      const [skillsData, statsData, activityData] = await Promise.all([
        api.getSkills({ mine: isMine }),
        api.getStats(),
        api.getActivity()
      ]);
      setSkills(skillsData.skills || []);
      setStats(statsData);
      setActivity(activityData.activity || []);
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      api.getActivity().then(data => setActivity(data.activity || [])).catch(console.error);
      api.getStats().then(data => setStats(data)).catch(console.error);
    }, 30000);
    return () => clearInterval(interval);
  }, [viewMode]);

  const handleSubmitSkill = async (event) => {
    event.preventDefault();
    setError("");
    try {
      if (editingId) {
        await api.updateSkill(editingId, { title, category, description });
        window.alert("Skill updated! ✨");
      } else {
        await api.createSkill({ title, category, description });
        window.alert("Skill broadcasted! ✨");
      }
      handleCancelEdit();
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditInitiate = (skill) => {
    setEditingId(skill._id);
    setTitle(skill.title);
    setCategory(skill.category);
    setDescription(skill.description);
    window.scrollTo({ top: 350, behavior: 'smooth' }); // Scroll to broadcast card
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setCategory("");
    setDescription("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      await api.deleteSkill(id);
      loadData();
    } catch (err) {
      window.alert(err.message);
    }
  };

  const handleRequest = async (skill) => {
    try {
      if (skill.owner === user._id) {
        window.alert("You cannot request your own skill!");
        return;
      }
      await api.createRequest({ skillId: skill._id, message: `Swap for ${skill.title}` });
      window.alert("Swap request sent! 🚀");
      loadData();
    } catch (err) {
      window.alert(err.message);
    }
  };

  return (
    <div className="app-shell" style={{ background: "var(--bg-secondary)" }}>
      <Navbar />
      <main className="dashboard-v2" style={{ paddingTop: "8rem" }}>
        <Sidebar />
        <section style={{ padding: "0 5% 5rem", overflowY: "auto" }}>

          {/* Bento Hero Section */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "2.5rem", marginBottom: "5rem" }}>

            {/* Stats Bento */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
              {[
                { label: "Active Builders", val: stats.activeBuilders, icon: "💎", cls: "icon-glow-blue", rev: "reveal-1" },
                { label: "Swaps Today", val: stats.swapsToday, icon: "⚡", cls: "icon-glow-green", rev: "reveal-2" },
                { label: "Registry Health", val: stats.registryHealth, icon: "✨", cls: "icon-glow-purple", rev: "reveal-3" }
              ].map((s, i) => (
                <div key={i} className={`glass-panel bento-card ${s.rev}`} style={{ padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div className={`stat-glow-icon ${s.cls}`}>{s.icon}</div>
                  <div>
                    <p style={{ fontSize: "0.8rem", fontWeight: "800", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{s.label}</p>
                    <p style={{ fontSize: "2.8rem", fontWeight: "950", color: "var(--text-main)", letterSpacing: "-0.04em" }}>{s.val}</p>
                  </div>
                </div>
              ))}

              {/* Broadcast Card */}
              <div id="broadcast-form" className="glass-panel reveal-4" style={{ gridColumn: "span 3", padding: "3.5rem", background: "#fff", border: "1px solid var(--accent-glow)" }}>
                <div style={{ maxWidth: "600px" }}>
                  <div className="live-indicator" style={{ marginBottom: "1.5rem" }}>
                    <span className="pulse-dot"></span> GLOBAL EXPERTISE REGISTRY
                  </div>
                  <h1 style={{ fontSize: "3.5rem", fontWeight: "950", color: "var(--text-main)", letterSpacing: "-0.04em", lineHeight: "1", marginBottom: "1.5rem" }}>
                    {editingId ? "Refine Mastery" : "Broadcast Expertise"}
                  </h1>
                </div>

                <form onSubmit={handleSubmitSkill} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "1.2rem", marginTop: "2rem" }}>
                  <input placeholder="Skill Title (e.g. Adv. React)" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  <input placeholder="Category (e.g. Tech)" value={category} onChange={(e) => setCategory(e.target.value)} required />
                  <div style={{ gridColumn: "span 2" }}>
                    <textarea placeholder="Describe your expertise and what you want in return..." value={description} onChange={(e) => setDescription(e.target.value)} required rows="1" style={{ resize: "none" }} />
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: "0 3.5rem" }}>
                      {editingId ? "Sync" : "Post"}
                    </button>
                    {editingId && <button type="button" onClick={handleCancelEdit} className="btn btn-ghost">Cancel</button>}
                  </div>
                </form>
              </div>
            </div>

            {/* Activity Bento */}
            <div className="glass-panel reveal-2" style={{ padding: "2.5rem", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.4rem", fontWeight: "900" }}>Live Activity</h3>
                <span style={{ fontSize: "0.75rem", fontWeight: "800", color: "var(--accent)" }}>REAL-TIME</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", overflowY: "auto", maxHeight: "450px", paddingRight: "0.5rem" }}>
                {activity.map((act, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "rgba(241, 245, 249, 0.4)", borderRadius: "18px", border: "1px solid rgba(0,0,0,0.02)" }}>
                    <div className="pulse-dot" style={{ width: "6px", height: "6px" }}></div>
                    <p style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-main)" }}>
                      <span style={{ fontWeight: "850" }}>{act.userName}</span>
                      <span style={{ color: "var(--text-dim)", margin: "0 0.4rem" }}>{act.type === 'skill' ? 'listed' : 'swapping'}</span>
                      <span style={{ color: "var(--accent)", fontWeight: "800" }}>{act.target}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Marketplace Controls */}
          <div className="reveal-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: "3rem" }}>
            <div>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "950", color: "var(--text-main)", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
                {viewMode === "mine" ? "My Registry" : "Public Marketplace"}
              </h2>
              <p style={{ color: "var(--text-dim)", fontWeight: "600" }}>Discover and exchange skills with verified builders.</p>
            </div>

            <div className="view-toggle-container">
              <button
                className={`view-toggle-btn ${viewMode === "all" ? "active" : ""}`}
                onClick={() => setViewMode("all")}
              >
                GLOBAL VIEW
              </button>
              <button
                className={`view-toggle-btn ${viewMode === "mine" ? "active" : ""}`}
                onClick={() => setViewMode("mine")}
              >
                MY LISTINGS
              </button>
            </div>
          </div>

          {/* Marketplace Grid */}
          <div className="reveal-4">
            <div className="bento-grid">
              {skills.length > 0 ? skills.map((skill) => (
                <div key={skill._id} className="skill-card-container">
                  <SkillCard
                    skill={skill}
                    onRequest={handleRequest}
                    onEdit={handleEditInitiate}
                    onDelete={handleDelete}
                  />
                </div>
              )) : (
                <div style={{ gridColumn: "span 12", padding: "8rem", textAlign: "center", background: "#fff", borderRadius: "32px", border: "1px dashed var(--glass-border)" }}>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "900", color: "var(--text-dim)" }}>No listings found in this sector.</h3>
                  <button onClick={() => setViewMode("all")} className="btn btn-ghost" style={{ marginTop: "2rem" }}>Switch to Global View</button>
                </div>
              )}
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}

export default Dashboard;
