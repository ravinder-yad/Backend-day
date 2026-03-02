import { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    bio: user?.bio || "Full stack developer open for skill exchange.",
    skillsOffered: Array.isArray(user?.skillsOffered)
      ? user.skillsOffered.join(", ")
      : user?.skillsOffered || "React, Node.js",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = {
      ...user,
      ...form,
      skillsOffered: form.skillsOffered.split(",").map((item) => item.trim()),
    };
    setUser(updatedUser);
    window.alert("Profile updated locally. Connect backend endpoint to persist.");
  };

  return (
    <div className="app-shell">
      <Navbar />
      <main className="profile-main">
        <section className="profile-card">
          <h2>My Profile</h2>
          <form onSubmit={handleSubmit} className="profile-form">
            <label>Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />

            <label>Bio</label>
            <textarea rows="4" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} required />

            <label>Skills Offered (comma separated)</label>
            <input
              value={form.skillsOffered}
              onChange={(e) => setForm({ ...form, skillsOffered: e.target.value })}
              required
            />

            <button type="submit" className="btn btn-primary">
              Save Profile
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Profile;
