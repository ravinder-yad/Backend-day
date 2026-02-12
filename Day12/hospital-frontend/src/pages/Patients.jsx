import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Download, UserCheck, ClipboardList, X, Edit2, Trash2 } from 'lucide-react';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '', age: '', gender: '', phone: '', disease: '', address: ''
    });

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/patient");
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleEdit = (p) => {
        setFormData({
            name: p.name,
            age: p.age,
            gender: p.gender,
            phone: p.phone,
            disease: p.disease,
            address: p.address
        });
        setEditingId(p._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this patient record?")) {
            try {
                await fetch(`http://localhost:3000/api/patient/${id}`, { method: "DELETE" });
                fetchPatients();
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingId
            ? `http://localhost:3000/api/patient/${editingId}`
            : "http://localhost:3000/api/patient";
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
                fetchPatients();
                setFormData({ name: '', age: '', gender: '', phone: '', disease: '', address: '' });
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Patient Directory</h1>
                    <p className="text-slate-500 mt-1">Total active patients: {patients.length}</p>
                </div>
                <button
                    onClick={() => { setShowForm(true); setEditingId(null); setFormData({ name: '', age: '', gender: '', phone: '', disease: '', address: '' }); }}
                    className="btn-primary flex items-center gap-2 px-6 shadow-xl shadow-primary-500/20"
                >
                    <Plus size={20} /> New Patient
                </button>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-slate-400 text-sm uppercase tracking-wider">
                                <th className="px-8 py-5 font-semibold">Patient Name</th>
                                <th className="px-8 py-5 font-semibold">Age/Gender</th>
                                <th className="px-8 py-5 font-semibold">Diagnosis</th>
                                <th className="px-8 py-5 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {patients.map((p, i) => (
                                <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                                                {p.name[0]}
                                            </div>
                                            <p className="font-bold text-slate-900">{p.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-slate-600 font-medium">{p.age} Yrs / {p.gender}</td>
                                    <td className="px-8 py-5 text-rose-600 font-bold">{p.disease}</td>
                                    <td className="px-8 py-5 text-right flex justify-end gap-2">
                                        <button onClick={() => handleEdit(p)} className="p-2 text-slate-400 hover:text-blue-600 bg-slate-50 rounded-lg"><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(p._id)} className="p-2 text-slate-400 hover:text-red-600 bg-slate-50 rounded-lg"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-xl p-8 shadow-2xl animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900">{editingId ? 'Update Patient' : 'Patient Registration'}</h2>
                            <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="Full Name" className="input-field" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                            <input type="number" placeholder="Age" className="input-field" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} required />
                            <select className="input-field" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <input type="text" placeholder="Phone" className="input-field" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                            <input type="text" placeholder="Diagnosis" className="input-field" value={formData.disease} onChange={e => setFormData({ ...formData, disease: e.target.value })} required />
                            <input type="text" placeholder="Address" className="input-field" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} required />
                            <button type="submit" className="btn-primary md:col-span-2 py-4 mt-4">{editingId ? 'Update Record' : 'Register Patient'}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Patients;
