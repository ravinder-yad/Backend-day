import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="home-main">
        <section className="hero">
          <p className="eyebrow">Build Faster Through Skill Exchange</p>
          <h1>Trade your skills. Learn from builders. Grow your career.</h1>
          <p>
            SkillSwap Hub lets developers, designers, and creators exchange real skills through requests,
            collaboration, and verified profiles.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/dashboard" className="btn btn-ghost">
              Explore Skills
            </Link>
          </div>
        </section>

        <section className="feature-grid">
          <article>
            <h3>Smart Skill Listings</h3>
            <p>Create and manage your skills with category and detailed description.</p>
          </article>
          <article>
            <h3>Exchange Requests</h3>
            <p>Send requests, track status, and accept or reject with a single click.</p>
          </article>
          <article>
            <h3>Portfolio-Ready UI</h3>
            <p>Responsive dashboard and profile pages designed for practical demos.</p>
          </article>
        </section>
      </main>
    </div>
  );
}

export default Home;
