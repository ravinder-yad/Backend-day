import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      const response = await fetch("http://localhost:5000/api/tasks", requestOptions);
      const data = await response.json();
      
      if (response.ok) {
        // Sort by newest first (assuming _id contains chron time or createdAt sort)
        const sortedTasks = data.tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTasks(sortedTasks);
      }
    } catch (error) {
      console.error("Error fetching live dashboard tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // 1. Stats Calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;

  // 2. Progress Percentage
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // 3. Recent Tasks (Latest 5)
  const recentTasks = tasks.slice(0, 5);

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'badge-warning';
      case 'in-progress': return 'badge-info';
      case 'completed': return 'badge-success';
      default: return 'badge-secondary';
    }
  };

  return (
    <main className="dashboard-page pb-5">
      
      {/* 1. Top Section - Greeting */}
      <section className="dashboard-header py-4 text-white">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <p className="greeting-text mb-1">Welcome back,</p>
              <h1 className="user-name fw-bold m-0">{user ? user.name : 'Guest'} 👋</h1>
            </div>
            <div className="d-flex gap-2">
              <Link to="/create-task" className="btn btn-light shadow-sm text-primary fw-medium">
                + Create Task
              </Link>
              <button 
                className="btn btn-outline-light d-flex align-items-center gap-2"
                onClick={() => navigate('/my-tasks')}
              >
                🔍 Search...
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-neg-4">
        
        {/* 2. Stats Section */}
        <section className="stats-grid mb-5">
          <div className="row g-3">
            
            <div className="col-6 col-md-3">
              <div className="stat-card shadow-sm total-card">
                <span className="stat-title">Total Tasks</span>
                <h3 className="stat-number">{loading ? '-' : totalTasks}</h3>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="stat-card shadow-sm success-card">
                <span className="stat-title">Completed</span>
                <h3 className="stat-number">{loading ? '-' : completedTasks}</h3>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="stat-card shadow-sm warning-card">
                <span className="stat-title">Pending</span>
                <h3 className="stat-number">{loading ? '-' : pendingTasks}</h3>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="stat-card shadow-sm info-card">
                <span className="stat-title">In Progress</span>
                <h3 className="stat-number">{loading ? '-' : inProgressTasks}</h3>
              </div>
            </div>

          </div>
        </section>

        <div className="row g-4">
          
          <div className="col-lg-8">
            {/* 3. Recent Tasks List */}
            <section className="recent-tasks-section p-4 bg-white rounded-4 shadow-sm h-100">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="section-title m-0">📌 Recent Tasks</h4>
                <Link to="/my-tasks" className="text-decoration-none small fw-medium">View All →</Link>
              </div>

              {loading ? (
                <div className="text-center py-4 text-muted">Loading live data...</div>
              ) : recentTasks.length === 0 ? (
                <div className="text-center py-4 text-muted">No tasks available yet.</div>
              ) : (
                <div className="recent-tasks-list d-flex flex-column gap-3">
                  {recentTasks.map(task => (
                    <div key={task._id} className="recent-task-item d-flex justify-content-between align-items-center p-3 rounded-3 border">
                      <div className="d-flex align-items-center gap-3">
                        <div className={`status-dot ${task.status}`}></div>
                        <div>
                          <h6 className="m-0 text-dark fw-medium">{task.title}</h6>
                          {task.dueDate && <small className="text-muted">Due: {new Date(task.dueDate).toLocaleDateString()}</small>}
                        </div>
                      </div>
                      <span className={`badge rounded-pill ${getStatusClass(task.status)} px-3 py-2 fw-normal`}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="col-lg-4 d-flex flex-column gap-4">
            
            {/* 4. Progress Section */}
            <section className="progress-section p-4 bg-white rounded-4 shadow-sm">
              <h4 className="section-title mb-4">📈 Progress</h4>
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small fw-medium">Overall Track</span>
                <span className="text-primary fw-bold">{progressPercentage}%</span>
              </div>
              
              <div className="progress" style={{ height: '12px', borderRadius: '10px' }}>
                <div 
                  className="progress-bar custom-progress-bar" 
                  role="progressbar" 
                  style={{ width: `${progressPercentage}%` }} 
                  aria-valuenow={progressPercentage} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
              
              <p className="text-muted small mt-3 m-0 text-center">
                {progressPercentage === 100 
                  ? "Amazing! You've finished everything! 🚀" 
                  : progressPercentage > 50 
                    ? "Great job, you're more than halfway there! ✨" 
                    : "You've got this! Keep pushing forward. 💪"}
              </p>
            </section>

            {/* 5. Quick Actions */}
            <section className="quick-actions-section p-4 bg-white rounded-4 shadow-sm flex-grow-1">
              <h4 className="section-title mb-4">⚡ Quick Actions</h4>
              
              <div className="d-flex flex-column gap-3">
                <button 
                  className="btn btn-primary d-flex align-items-center justify-content-between px-4 py-3 rounded-3 shadow-sm border-0"
                  onClick={() => navigate('/create-task')}
                >
                  <span className="fw-medium">Create New Task</span>
                  <span>➕</span>
                </button>

                <button 
                  className="btn btn-light border d-flex align-items-center justify-content-between px-4 py-3 rounded-3"
                  onClick={() => navigate('/my-tasks')}
                >
                  <span className="fw-medium text-dark">View All Tasks</span>
                  <span>📋</span>
                </button>

                <button 
                  className="btn btn-light border d-flex align-items-center justify-content-between px-4 py-3 rounded-3"
                  onClick={() => navigate('/my-tasks')}
                >
                  <span className="fw-medium text-dark">Manage Filters</span>
                  <span>🎛️</span>
                </button>
              </div>

            </section>

          </div>
        </div>

      </div>
    </main>
  );
}

export default Dashboard;
