import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SkillCard from "../components/SkillCard";
import { api } from "../services/api";

function Dashboard() {
  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // Platform Stats & Activity
  const [stats, setStats] = useState({ activeBuilders: 0, swapsToday: 0, registryHealth: "0%" });
  const [activity, setActivity] = useState([]);

  const loadData = async () => {
    try {
      const [skillsData, statsData, activityData] = await Promise.all([
        api.getSkills(),
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

    // Refresh activity every 30 seconds for "Live" feel
    const interval = setInterval(() => {
      api.getActivity().then(data => setActivity(data.activity || [])).catch(console.error);
      api.getStats().then(data => setStats(data)).catch(console.error);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      await api.createRequest({ skillId: skill._id, message: `Swap for ${skill.title}` });
      window.alert("Swap request sent! 🚀");
      loadData(); // Stats might change
    } catch (err) {
      window.alert(err.message);
    }
  };

  return (
    <div className="app-shell" style={{ overflow: "hidden" }}>
      <Navbar />
      <main className="dashboard-v2" style={{ paddingTop: "8rem" }}>
        <Sidebar />
        <section style={{ padding: "3rem 0", background: "#fcfcfc", overflowY: "auto" }}>

          {/* Quick Stats Banner - Now Real! */}
          <div style={{ padding: "0 8%", marginBottom: "3rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
              {[
                { label: "Active Builders", val: stats.activeBuilders, color: "var(--accent)" },
                { label: "Swaps Today", val: stats.swapsToday, color: "#3b82f6" },
                { label: "Registry Health", val: stats.registryHealth, color: "#8b5cf6" }
              ].map((stat, i) => (
                <div key={i} className="glass-panel" style={{ padding: "1.5rem", textAlign: "center", borderRadius: "24px" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: "900", color: "var(--text-dim)", textTransform: "uppercase", marginBottom: "0.5rem" }}>{stat.label}</p>
                  <h4 style={{ fontSize: "1.8rem", fontWeight: "900", color: stat.color }}>{stat.val}</h4>
                </div>
              ))}
            </div>
          </div>

          <header style={{ padding: "0 8%", marginBottom: "4rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div className="live-indicator" style={{ marginBottom: "1rem" }}>
                <span className="pulse-dot"></span> LIVE NETWORK
              </div>
              <h1 style={{ fontSize: "3.5rem", fontWeight: "950", color: "var(--text-main)", lineHeight: "1" }}>Marketplace</h1>
            </div>

            {/* Live Activity Widget - Now Real! */}
            <div className="glass-panel" style={{ padding: "1.2rem 2rem", borderRadius: "20px", display: "flex", flexDirection: "column", gap: "0.8rem", width: "100%", maxWidth: "450px" }}>
              <p style={{ fontSize: "0.65rem", fontWeight: "900", color: "var(--accent)" }}>LIVE ACTIVITY FEED</p>
              {activity.length > 0 ? activity.map((act) => (
                <div key={act.id} style={{ fontSize: "0.85rem", display: "flex", gap: "0.8rem", alignItems: "center" }}>
                  <span style={{ fontWeight: "800", color: "var(--text-main)" }}>{act.user}</span>
                  <span style={{ color: "var(--text-dim)", whiteSpace: "nowrap" }}>
                    {act.type === "swap" ? "sent swap for" : "listed new skill"}
                  </span>
                  <span style={{ fontWeight: "750", color: "var(--accent)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{act.target}</span>
                </div>
              )) : <p style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>Waiting for network activity...</p>}
            </div>
          </header>

          <div style={{ padding: "0 8%", marginBottom: "5rem" }}>
            <div className="glass-panel" style={{ padding: "3.5rem", transition: "0.3s" }}>
              <h3 style={{ fontSize: "2rem", marginBottom: "2rem", fontWeight: "900" }}>
                {editingId ? "Update Skill" : "Broadcast New Expertise"}
              </h3>
              <form onSubmit={handleSubmitSkill} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.8rem" }}>
                <input placeholder="Skill Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
                <textarea placeholder="Tell the world what you can do..." style={{ gridColumn: "span 2", minHeight: "120px" }} value={description} onChange={(e) => setDescription(e.target.value)} required />
                <div style={{ gridColumn: "span 2", display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                  {editingId && <button className="btn btn-ghost" type="button" onClick={handleCancelEdit}>Cancel</button>}
                  <button className="btn btn-primary" type="submit" style={{ padding: "1rem 3rem" }}>
                    {editingId ? "Confirm Update" : "Go Live Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div style={{ padding: "0 8%" }}>
            <h2 style={{ fontSize: "2.2rem", marginBottom: "2.5rem", fontWeight: "900" }}>Global Skill Registry</h2>
            <div className="bento-grid" style={{ padding: "0" }}>
              {skills.map((skill) => (
                <div key={skill._id} className="skill-card-container">
                  <SkillCard skill={skill} onRequest={handleRequest} onEdit={handleEditInitiate} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
