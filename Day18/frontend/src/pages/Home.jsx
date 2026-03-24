import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      
      {/* 1. Hero Section */}
      <section className="hero-section text-center text-lg-start">
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6 hero-text-col fade-in-up">
              <span className="badge bg-white text-primary px-3 py-2 rounded-pill mb-3 shadow-sm fw-medium">
                🚀 TaskMaster 2.0 is Here!
              </span>
              <h1 className="display-3 fw-bold hero-title text-dark mb-4">
                Organize Your Tasks.<br />
                <span className="text-primary">Stay Productive Everyday ✨</span>
              </h1>
              <p className="lead text-muted mb-5 hero-subtitle">
                The ultimate workspace for managing your daily goals, tracking progress, 
                and crushing your to-do lists with speed and simplicity.
              </p>
              <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
                {user ? (
                  <button onClick={() => navigate('/dashboard')} className="btn btn-primary btn-lg px-subtitle btn-lg px-5 shadow rounded-pill">
                    Go to Dashboard
                  </button>
                ) : (
                  <>
                    <Link to="/register" className="btn btn-primary btn-lg px-5 shadow rounded-pill btn-hover-lift">
                      Get Started
                    </Link>
                    <Link to="/login" className="btn btn-outline-dark btn-lg px-5 rounded-pill btn-hover-lift">
                      Login Now
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            <div className="col-lg-6 mt-5 mt-lg-0 d-none d-md-block fade-in-up delay-1">
              <div className="hero-illustration">
                {/* 3D-like floating UI mockup */}
                <div className="mockup-card card1 shadow-lg">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="mockup-dot bg-warning"></div>
                    <div className="mockup-line w-50"></div>
                  </div>
                  <div className="mockup-line w-75 mt-3"></div>
                </div>
                <div className="mockup-card card2 shadow-lg">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="mockup-dot bg-success"></div>
                    <div className="mockup-line w-50"></div>
                  </div>
                  <div className="mockup-line w-100 mt-3"></div>
                </div>
                <div className="mockup-card card3 shadow-lg">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="mockup-dot bg-primary"></div>
                    <div className="mockup-line w-25"></div>
                  </div>
                  <div className="mockup-line w-75 mt-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="features-section py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5 fade-in-up">
            <h2 className="section-title fw-bold">Our Features ⚡</h2>
            <p className="text-muted">Everything you need to master your productivity.</p>
          </div>
          <div className="row g-4">
            
            <div className="col-md-6 col-lg-3 fade-in-up delay-1">
              <div className="feature-card p-4 bg-white rounded-4 shadow-sm text-center border h-100">
                <div className="feature-icon bg-primary text-white rounded-circle shadow-sm mb-4 mx-auto">
                  ✏️
                </div>
                <h5 className="fw-bold">Create Tasks Easily</h5>
                <p className="text-muted small m-0">Quickly add new tasks with titles, descriptions, and priorities.</p>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-3 fade-in-up delay-2">
              <div className="feature-card p-4 bg-white rounded-4 shadow-sm text-center border h-100">
                <div className="feature-icon bg-success text-white rounded-circle shadow-sm mb-4 mx-auto">
                  📈
                </div>
                <h5 className="fw-bold">Track Progress</h5>
                <p className="text-muted small m-0">Live dashboards and progress bars to keep your motivation high.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 fade-in-up delay-3">
              <div className="feature-card p-4 bg-white rounded-4 shadow-sm text-center border h-100">
                <div className="feature-icon bg-warning text-white rounded-circle shadow-sm mb-4 mx-auto">
                  🔍
                </div>
                <h5 className="fw-bold">Search & Filter</h5>
                <p className="text-muted small m-0">Find exactly what you are looking for with powerful filters.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 fade-in-up delay-4">
              <div className="feature-card p-4 bg-white rounded-4 shadow-sm text-center border h-100">
                <div className="feature-icon bg-info text-white rounded-circle shadow-sm mb-4 mx-auto">
                  📅
                </div>
                <h5 className="fw-bold">Manage Daily Work</h5>
                <p className="text-muted small m-0">Organize your entire schedule and meet all your deadlines.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="steps-section py-5">
        <div className="container py-5">
          <div className="text-center mb-5 fade-in-up">
            <h2 className="section-title fw-bold">How It Works 🛠️</h2>
            <p className="text-muted">Four simple steps to transform your workflow.</p>
          </div>

          <div className="row align-items-center position-relative">
            {/* Connecting Line for Desktop */}
            <div className="d-none d-lg-block step-line position-absolute top-50 start-0 w-100 border-top border-2 border-primary opacity-25" style={{ zIndex: 0 }}></div>
            
            <div className="col-12 col-lg-3 text-center mb-4 mb-lg-0 step-item position-relative z-1 fade-in-up delay-1">
              <div className="step-circle bg-white border border-primary text-primary fw-bold fs-4 mx-auto shadow-sm mb-3">1</div>
              <h5 className="fw-bold">Register</h5>
              <p className="text-muted small">Create your free account.</p>
            </div>
            
            <div className="col-12 col-lg-3 text-center mb-4 mb-lg-0 step-item position-relative z-1 fade-in-up delay-2">
              <div className="step-circle bg-white border border-primary text-primary fw-bold fs-4 mx-auto shadow-sm mb-3">2</div>
              <h5 className="fw-bold">Create Task</h5>
              <p className="text-muted small">Write down what you need to do.</p>
            </div>

            <div className="col-12 col-lg-3 text-center mb-4 mb-lg-0 step-item position-relative z-1 fade-in-up delay-3">
              <div className="step-circle bg-white border border-primary text-primary fw-bold fs-4 mx-auto shadow-sm mb-3">3</div>
              <h5 className="fw-bold">Track Progress</h5>
              <p className="text-muted small">Update status as you work.</p>
            </div>

            <div className="col-12 col-lg-3 text-center step-item position-relative z-1 fade-in-up delay-4">
              <div className="step-circle bg-primary text-white fw-bold fs-4 mx-auto shadow-lg mb-3">4</div>
              <h5 className="fw-bold">Complete!</h5>
              <p className="text-muted small">Celebrate your daily wins.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Stats / Highlight Section */}
      <section className="stats-highlight-section py-5 text-white position-relative overflow-hidden">
        <div className="container py-5 position-relative z-1 text-center fade-in-up">
          <h2 className="fw-bold mb-4 display-5">Boost Your Productivity 🚀</h2>
          
          <div className="row justify-content-center g-4 mt-3">
            <div className="col-6 col-md-4">
              <h2 className="display-4 fw-bold m-0">100+</h2>
              <p className="fs-5 opacity-75">Tasks Managed</p>
            </div>
            <div className="col-6 col-md-4">
              <h2 className="display-4 fw-bold m-0">Easy</h2>
              <p className="fs-5 opacity-75">Clean UI</p>
            </div>
            <div className="col-6 col-md-4">
              <h2 className="display-4 fw-bold m-0">Fast</h2>
              <p className="fs-5 opacity-75">Performance</p>
            </div>
          </div>
        </div>
        {/* Abstract Background Shapes */}
        <div className="bg-shape shape1"></div>
        <div className="bg-shape shape2"></div>
      </section>

      {/* 6. Call To Action (CTA) Section */}
      <section className="cta-section py-5 text-center bg-light">
        <div className="container py-5 fade-in-up">
          <h2 className="display-6 fw-bold text-dark mb-4">Ready to Get Started?</h2>
          <p className="lead text-muted mb-5 max-w-700 mx-auto">
            Join today and take control of your time and tasks. It only takes a minute to register.
          </p>
          {!user && (
            <Link to="/register" className="btn btn-primary btn-lg px-5 py-3 shadow-lg rounded-pill fw-bold fs-5 btn-hover-lift">
              Create Free Account &rarr;
            </Link>
          )}
          {user && (
            <Link to="/create-task" className="btn btn-primary btn-lg px-5 py-3 shadow-lg rounded-pill fw-bold fs-5 btn-hover-lift">
              Create Your Next Task &rarr;
            </Link>
          )}
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="footer-section py-4 bg-white border-top text-center text-md-start">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <p className="text-muted mb-3 mb-md-0 fw-medium">
              © 2026 TaskMaster. All rights reserved.
            </p>
            <div className="d-flex gap-4">
              <a href="#" className="text-muted text-decoration-none fw-medium">Contact</a>
              <a href="#" className="text-muted text-decoration-none fw-medium">About</a>
              <a href="#" className="text-muted text-decoration-none fw-medium">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;
