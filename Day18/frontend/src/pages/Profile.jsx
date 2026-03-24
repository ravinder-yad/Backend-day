import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <div className="profile-page"><p>Loading profile...</p></div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <main className="profile-page">
      <section className="profile-card">
        <div className="profile-top">
          <div className="avatar">
            {getInitials(user.name)}
          </div>
          <h2>{user.name}</h2>
          <p className="email-text">{user.email}</p>
        </div>

        <hr className="divider" />

        <div className="profile-details">
          <div className="detail-row">
            <span className="label">Name:</span>
            <span className="value">{user.name}</span>
          </div>
          <div className="detail-row">
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>
          <div className="detail-row">
            <span className="label">Joined:</span>
            <span className="value">{new Date().getFullYear()}</span>
          </div>
        </div>

        <hr className="divider" />

        <div className="profile-stats">
          <div className="stat-item">
            <h4>Total Tasks</h4>
            <p className="primary-text">12</p>
          </div>
          <div className="stat-item">
            <h4>Completed</h4>
            <p className="success-text">5</p>
          </div>
          <div className="stat-item">
            <h4>Pending</h4>
            <p className="warning-text">7</p>
          </div>
        </div>

        <hr className="divider" />

        <div className="profile-actions">
          <button className="btn btn-outline-primary px-4 py-2 fw-medium rounded-pill">Edit Profile</button>
          <button onClick={handleLogout} className="btn btn-danger px-4 py-2 fw-medium rounded-pill">Logout</button>
        </div>
      </section>
    </main>
  );
}

export default Profile;
