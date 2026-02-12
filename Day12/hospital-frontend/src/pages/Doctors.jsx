import React, { useState, useEffect } from 'react';
import { Plus, Search, MoreVertical, Star, MapPin, Activity, X, Edit2, Trash2 } from 'lucide-react';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', specialization: '', experience: '', fees: ''
    });

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/doctor");
            const data = await response.json();
            setDoctors(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleEdit = (doc) => {
        setFormData({
            name: doc.name,
            email: doc.email,
            phone: doc.phone,
            specialization: doc.specialization,
            experience: doc.experience,
            fees: doc.fees
        });
        setEditingId(doc._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this doctor?")) {
            try {
                await fetch(`http://localhost:3000/api/doctor/${id}`, { method: "DELETE" });
                fetchDoctors();
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingId
            ? `http://localhost:3000/api/doctor/${editingId}`
            : "http://localhost:3000/api/doctor";
        const method = editingId ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setShowForm(false);
                setEditingId(null);
                fetchDoctors();
                setFormData({ name: '', email: '', phone: '', specialization: '', experience: '', fees: '' });
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Medical Staff</h1>
                    <p className="text-slate-500 mt-1">Manage and monitor health specialists</p>
                </div>
                <button
                    onClick={() => { setShowForm(true); setEditingId(null); setFormData({ name: '', email: '', phone: '', specialization: '', experience: '', fees: '' }); }}
                    className="btn-primary flex items-center gap-2 px-6 py-3 shadow-xl shadow-primary-500/20"
                >
                    <Plus size={20} />
                    Add New Doctor
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doc, idx) => (
                    <div key={idx} className="glass p-6 rounded-3xl group hover:shadow-2xl transition-all duration-500 relative">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-20 h-20 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl">
                                {doc.name ? doc.name.split(' ').map(n => n[0]).join('') : '?'}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(doc)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-slate-50 rounded-lg">
                                    <Edit2 size={18} />
                                </button>
                                <button onClick={() => handleDelete(doc._id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors bg-slate-50 rounded-lg">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">{doc.name}</h3>
                        <p className="text-primary-600 font-medium text-sm">{doc.specialization}</p>
                        <hr className="my-6 border-slate-100" />
                        <div className="flex items-center justify-between">
                            <div className="text-slate-500 text-sm flex items-center gap-2">
                                <Activity size={16} /> {doc.experience} EXP
                            </div>
                            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-600">Available</span>
                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-xl p-8 shadow-2xl animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900">{editingId ? 'Edit Doctor' : 'Add New Doctor'}</h2>
                            <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-full">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Name" className="input-field" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                            <input type="email" placeholder="Email" className="input-field" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                            <input type="text" placeholder="Phone" className="input-field" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                            <input type="text" placeholder="Specialization" className="input-field" value={formData.specialization} onChange={e => setFormData({ ...formData, specialization: e.target.value })} required />
                            <input type="text" placeholder="Experience" className="input-field" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} required />
                            <input type="number" placeholder="Fees" className="input-field" value={formData.fees} onChange={e => setFormData({ ...formData, fees: e.target.value })} required />
                            <button type="submit" className="btn-primary md:col-span-2 py-4 mt-4">{editingId ? 'Update Doctor' : 'Save Doctor'}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Doctors;
