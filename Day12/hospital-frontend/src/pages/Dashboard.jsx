import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, User, Calendar, ArrowUpRight, Users, Activity, Clock, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const [statsData, setStatsData] = useState({
        totalDoctors: 0,
        totalPatients: 0,
        totalAppointments: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/stats");
            const data = await response.json();
            setStatsData(data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const stats = [
        { label: 'Total Doctors', value: statsData.totalDoctors, icon: Stethoscope, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Total Patients', value: statsData.totalPatients, icon: Users, color: 'text-pink-600', bg: 'bg-pink-50' },
        { label: 'Appointments', value: statsData.totalAppointments, icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Avg. Wait Time', value: '14 min', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Hospital Analytics</h1>
                <p className="text-slate-500 mt-2">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <div key={index} className="glass p-6 rounded-3xl hover:translate-y-[-4px] transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                +12% <ArrowUpRight size={14} />
                            </span>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { to: '/doctors', label: 'Manage Doctors', desc: 'Add or update medical staff records', icon: Stethoscope, theme: 'primary' },
                    { to: '/patients', label: 'Manage Patients', desc: 'Register and track patient profiles', icon: User, theme: 'pink' },
                    { to: '/appointments', label: 'Appointments', desc: 'Schedule and manage patient visits', icon: Calendar, theme: 'emerald' },
                ].map((action, index) => (
                    <Link key={index} to={action.to} className="group">
                        <div className="glass p-8 rounded-[2rem] h-full transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary-500/10 group-hover:border-primary-200">
                            <div className={`mb-6 p-4 rounded-2xl inline-block bg-slate-100 text-slate-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500`}>
                                <action.icon size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{action.label}</h3>
                            <p className="text-slate-500 mb-6">{action.desc}</p>
                            <div className="flex items-center gap-2 text-primary-600 font-bold text-sm">
                                Open Dashboard <ArrowRight size={16} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
