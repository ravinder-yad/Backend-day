import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, User, Calendar, LayoutDashboard, Activity } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <Activity size={28} />
                    <span>HospitalApp</span>
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
        </nav>
    );
};

export default Navbar;
