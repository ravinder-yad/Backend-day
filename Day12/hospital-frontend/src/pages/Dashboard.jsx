import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, User, Calendar } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className="container main-content">
            <div className="page-header">
                <h1>Dashboard</h1>
            </div>
            <div className="grid">
                <Link to="/doctors" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ textAlign: 'center', cursor: 'pointer', height: '100%' }}>
                        <div style={{ color: '#4f46e5', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                            <Stethoscope size={48} />
                        </div>
                        <h2>Manage Doctors</h2>
                        <p>Add, view, and manage doctor profiles.</p>
                    </div>
                </Link>
                <Link to="/patients" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ textAlign: 'center', cursor: 'pointer', height: '100%' }}>
                        <div style={{ color: '#ec4899', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                            <User size={48} />
                        </div>
                        <h2>Manage Patients</h2>
                        <p>Register and track patient history.</p>
                    </div>
                </Link>
                <Link to="/appointments" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ textAlign: 'center', cursor: 'pointer', height: '100%' }}>
                        <div style={{ color: '#10b981', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                            <Calendar size={48} />
                        </div>
                        <h2>Appointments</h2>
                        <p>Schedule and manage appointments.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};
export default Dashboard;
