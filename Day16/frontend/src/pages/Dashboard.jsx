import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SkillCard from "../components/SkillCard";
import { api } from "../services/api";

const demoSkills = [
  {
    _id: "1",
    title: "React Performance Tuning",
    category: "Web Development",
    description: "Optimize rendering and state architecture for large React apps.",
    ownerName: "Riya",
  },
  {
    _id: "2",
    title: "UI Motion in Figma",
    category: "Design",
    description: "Design polished interaction flows and motion specs for product teams.",
    ownerName: "Kabir",
  },
];

function Dashboard() {
  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const loadSkills = async () => {
    try {
      const data = await api.getSkills();
      setSkills(data.skills || []);
    } catch {
      setSkills(demoSkills);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleAddSkill = async (event) => {
    event.preventDefault();
    setError("");
    const payload = { title, category, description };
    try {
      await api.createSkill(payload);
      setTitle("");
      setCategory("");
      setDescription("");
      await loadSkills();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRequest = async (skill) => {
    try {
      await api.createRequest({ skillId: skill._id, message: `Interested in exchanging for ${skill.title}` });
      window.alert("Request sent successfully");
    } catch (err) {
      window.alert(err.message);
    }
  };

  return (
    <div className="app-shell">
      <Navbar />
      <main className="dashboard-layout">
        <Sidebar />
        <section className="dashboard-content">
          <div className="section-head">
            <h2>Skill Marketplace</h2>
            <p>Discover skills and start meaningful exchanges.</p>
          </div>

          <form className="skill-form" onSubmit={handleAddSkill}>
            <input
              placeholder="Skill title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button className="btn btn-primary" type="submit">
              Add Skill
            </button>
          </form>

          {error ? <p className="error-text">{error}</p> : null}

          <div className="skills-grid">
            {skills.map((skill) => (
              <SkillCard key={skill._id} skill={skill} onRequest={handleRequest} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
