import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useSearchParams } from 'react-router-dom';
import './MyTasks.css';

function MyTasks() {
  const { token } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const q = searchParams.get('search') || '';
    setSearchInput(q);
    fetchTasks(q);
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    if(e) e.preventDefault();
    if(searchInput.trim()) {
      setSearchParams({ search: searchInput.trim() });
    } else {
      setSearchParams({});
    }
  };

  const fetchTasks = async (query = '') => {
    setLoading(true);
    try {
      let url = "http://localhost:5000/api/tasks";
      if (query.trim()) {
        url = `http://localhost:5000/api/tasks/search?title=${encodeURIComponent(query.trim())}`;
      }

      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };

      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (response.ok) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setTasks(tasks.filter(task => task._id !== id));
      } else {
        alert("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const statusCycle = {
      'pending': 'in-progress',
      'in-progress': 'completed',
      'completed': 'pending'
    };
    
    const newStatus = statusCycle[currentStatus];

    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setTasks(tasks.map(task => 
          task._id === id ? { ...task, status: newStatus } : task
        ));
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Filter & Search Logic
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'All' || 
      (filter === 'Pending' && task.status === 'pending') ||
      (filter === 'In Progress' && task.status === 'in-progress') ||
      (filter === 'Completed' && task.status === 'completed');
      
    return matchesFilter;
  });

  const getStatusClass = (status) => {
    switch(status) {
      case 'pending': return 'status-pending';
      case 'in-progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length
  };

  return (
    <main className="my-tasks-page container py-4">
      {/* 1. Header & Actions */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h2 className="page-title m-0">My Tasks</h2>
        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-primary shadow-sm create-btn">
            + Create Task
          </Link>
          <div className="search-box">
            <form onSubmit={handleSearchSubmit} className="d-flex m-0">
              <input 
                type="text" 
                className="form-control shadow-sm" 
                placeholder="🔍 Search tasks..." 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" className="d-none">Search</button>
            </form>
          </div>
        </div>
      </div>

      {/* 2. Stats Section */}
      <div className="stats-section mb-4 d-flex justify-content-start gap-3 flex-wrap">
        <div className="stat-card shadow-sm">
          <span className="stat-label">Total</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-card shadow-sm success">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{stats.completed}</span>
        </div>
        <div className="stat-card shadow-sm warning">
          <span className="stat-label">Pending</span>
          <span className="stat-value">{stats.pending}</span>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div className="filter-bar shadow-sm mb-4">
        {['All', 'Pending', 'In Progress', 'Completed'].map(f => (
          <button 
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 4. Task List */}
      <div className="task-list">
        {loading ? (
          <div className="text-center py-5">Loading tasks...</div>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-state text-center py-5">
            <h4 className="text-muted">No tasks found</h4>
            <p className="text-muted">You have no tasks matching this filter.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredTasks.map(task => (
              <div className="col-md-6 col-lg-4" key={task._id}>
                <div className="task-card shadow-sm">
                  
                  <div className="task-card-header d-flex justify-content-between align-items-start mb-2">
                    <h5 className="task-title m-0">{task.title}</h5>
                    <span className={`badge ${getPriorityClass(task.priority)}`}>
                      {task.priority || 'medium'}
                    </span>
                  </div>

                  <p className="task-desc text-muted mb-3 flex-grow-1">
                    {task.description}
                  </p>

                  <div className="task-meta mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="meta-label">Status:</span>
                      <span className={`status-badge ${getStatusClass(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    {task.dueDate && !isNaN(new Date(task.dueDate)) && (
                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <span className="meta-label">Due:</span>
                        <span className="meta-value">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <hr className="task-divider" />

                  <div className="task-actions d-flex justify-content-between mt-auto">
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleStatusChange(task._id, task.status)}
                    >
                      Update Status
                    </button>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-light text-primary">Edit</button>
                      <button 
                        className="btn btn-sm btn-light text-danger"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </main>
  );
}

export default MyTasks;
