import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Stethoscope, User, Calendar, LayoutDashboard, HeartPulse, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left: Logo and Nav Links */}
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-primary-600 text-white p-2 rounded-lg group-hover:rotate-12 transition-transform">
                                <HeartPulse size={24} />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
                                CarePulse
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-1">
                            {[
                                { path: '/', label: 'Dashboard', icon: LayoutDashboard },
                                { path: '/doctors', label: 'Doctors', icon: Stethoscope },
                                { path: '/patients', label: 'Patients', icon: User },
                                { path: '/appointments', label: 'Appointments', icon: Calendar },
                            ].map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isActive(item.path)
                                            ? 'bg-primary-50 text-primary-700'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right: Auth */}
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="btn-secondary flex items-center gap-2 text-sm">
                            <LogIn size={16} />
                            Login
                        </Link>
                        <Link to="/register" className="btn-primary flex items-center gap-2 text-sm shadow-lg shadow-primary-500/20">
                            <UserPlus size={16} />
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
