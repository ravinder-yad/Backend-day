import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, User, Calendar, LayoutDashboard, Activity, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar">
            <div className="container nav-content">
                {/* Left Side: Logo & Navigation */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                    <Link to="/" className="logo">
                        <Activity size={28} />
                        <span style={{ fontSize: '1.25rem' }}>HospitalApp</span>
                    </Link>

                    <ul className="nav-links">
                        <li>
                            <Link to="/" className={`nav-link ${isActive('/')}`}>
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/doctors" className={`nav-link ${isActive('/doctors')}`}>
                                <Stethoscope size={18} />
                                Doctors
                            </Link>
                        </li>
                        <li>
                            <Link to="/patients" className={`nav-link ${isActive('/patients')}`}>
                                <User size={18} />
                                Patients
                            </Link>
                        </li>
                        <li>
                            <Link to="/appointments" className={`nav-link ${isActive('/appointments')}`}>
                                <Calendar size={18} />
                                Appointments
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Right Side: Auth Buttons */}
                <div className="auth-buttons" style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/login" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <LogIn size={16} />
                        Login
                    </Link>
                    <Link to="/register" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <UserPlus size={16} />
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
