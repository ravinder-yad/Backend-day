import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MoreVertical, Plus, CheckCircle2, XCircle, Timer, Activity, X, Edit2, Trash2 } from 'lucide-react';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        doctor: '', patient: '', date: '', time: '', status: 'Pending', notes: ''
    });

    useEffect(() => {
        fetchAppointments();
        fetchDoctorsAndPatients();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/appointment");
            const data = await response.json();
            setAppointments(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const fetchDoctorsAndPatients = async () => {
        try {
            const [docRes, patRes] = await Promise.all([
                fetch("http://localhost:3000/api/doctor"),
                fetch("http://localhost:3000/api/patient")
            ]);
            setDoctors(await docRes.json());
            setPatients(await patRes.json());
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleEdit = (apt) => {
        setFormData({
            doctor: apt.doctor,
            patient: apt.patient,
            date: apt.date,
            time: apt.time,
            status: apt.status,
            notes: apt.notes || ''
        });
        setEditingId(apt._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Cancel and delete this appointment?")) {
            try {
                await fetch(`http://localhost:3000/api/appointment/${id}`, { method: "DELETE" });
                fetchAppointments();
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingId
            ? `http://localhost:3000/api/appointment/${editingId}`
            : "http://localhost:3000/api/appointment";
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
                fetchAppointments();
                setFormData({ doctor: '', patient: '', date: '', time: '', status: 'Pending', notes: '' });
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
                    <p className="text-slate-500 mt-1">Manage and schedule medical visits</p>
                </div>
                <button
                    onClick={() => { setShowForm(true); setEditingId(null); setFormData({ doctor: '', patient: '', date: '', time: '', status: 'Pending', notes: '' }); }}
                    className="btn-primary flex items-center gap-2 px-6 shadow-xl shadow-primary-500/20"
                >
                    <Plus size={20} /> New Appointment
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {appointments.length === 0 ? (
                        <div className="glass p-12 text-center text-slate-400">No appointments scheduled today.</div>
                    ) : (
                        appointments.map((apt, idx) => (
                            <div key={idx} className="glass p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6 group hover:translate-x-2 transition-all duration-300">
                                <div className="text-center sm:text-left min-w-[120px]">
                                    <p className="text-lg font-bold text-slate-900">{apt.time}</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase">{apt.date}</p>
                                </div>
                                <div className="flex-1 flex flex-col sm:flex-row items-center gap-4 sm:border-l sm:border-slate-100 sm:pl-6 w-full">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                                        {apt.patient[0]}
                                    </div>
                                    <div className="flex-1 text-center sm:text-left">
                                        <h4 className="font-bold text-slate-900">{apt.patient}</h4>
                                        <p className="text-sm text-slate-500">Dr. {apt.doctor}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                                            {apt.status}
                                        </span>
                                        <div className="flex gap-1">
                                            <button onClick={() => handleEdit(apt)} className="p-2 text-slate-400 hover:text-blue-600 bg-slate-50 rounded-lg"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(apt._id)} className="p-2 text-slate-400 hover:text-red-600 bg-slate-50 rounded-lg"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="space-y-6">
                    <div className="glass p-6 rounded-[2rem] bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-xl shadow-indigo-500/20">
                        <Activity size={32} className="mb-4 opacity-70" />
                        <h3 className="text-xl font-bold mb-2">Booking Control</h3>
                        <p className="text-indigo-100 text-sm mb-6 leading-relaxed">Update status or reschedule appointments live from this panel.</p>
                        <div className="bg-white/10 p-4 rounded-2xl">
                            <p className="text-2xl font-black">{appointments.length}</p>
                            <p className="text-xs uppercase font-bold opacity-60">Live Count</p>
                        </div>
                    </div>
                </div>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-xl p-8 shadow-2xl animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900">{editingId ? 'Modify Appointment' : 'Book Appointment'}</h2>
                            <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select className="input-field" value={formData.doctor} onChange={e => setFormData({ ...formData, doctor: e.target.value })} required disabled={editingId}>
                                <option value="">Select Doctor</option>
                                {doctors.map(d => <option key={d._id} value={d.name}>{d.name} ({d.specialization})</option>)}
                            </select>
                            <select className="input-field" value={formData.patient} onChange={e => setFormData({ ...formData, patient: e.target.value })} required disabled={editingId}>
                                <option value="">Select Patient</option>
                                {patients.map(p => <option key={p._id} value={p.name}>{p.name}</option>)}
                            </select>
                            <input type="date" className="input-field" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
                            <input type="time" className="input-field" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} required />
                            <select className="input-field md:col-span-2" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} required>
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                            <textarea placeholder="Notes (Optional)" className="input-field md:col-span-2 h-24 resize-none" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}></textarea>
                            <button type="submit" className="btn-primary md:col-span-2 py-4 mt-4">{editingId ? 'Update Appointment' : 'Schedule Visit'}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Appointments;
