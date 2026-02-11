import React, { useState, useEffect } from "react";
import { X, Edit2, Trash2, Calendar, Clock, User, Stethoscope } from "lucide-react";

const API = "http://localhost:3000/api/appointment";
const DOCTOR_API = "http://localhost:3000/api/doctor";
const PATIENT_API = "http://localhost:3000/api/patient";

const AppointmentForm = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [editing, setEditing] = useState(null);

    const [formData, setFormData] = useState({
        doctor: "",
        patient: "",
        date: "",
        time: "",
        status: "Scheduled",
        notes: "",
    });

    const [showForm, setShowForm] = useState(false);

    // Helper Functions
    const getDoctorName = (id) => {
        const doc = doctors.find(d => d._id === (id._id || id));
        return doc ? doc.name : "Unknown Doctor";
    };

    const getPatientName = (id) => {
        const pat = patients.find(p => p._id === (id._id || id));
        return pat ? pat.name : "Unknown Patient";
    };

    const handleCancel = () => {
        setShowForm(false);
        resetForm();
    };

    //  Load Data
    const loadData = async () => {
        const [a, d, p] = await Promise.all([
            fetch(API).then(res => res.json()),
            fetch(DOCTOR_API).then(res => res.json()),
            fetch(PATIENT_API).then(res => res.json()),
        ]);

        setAppointments(a);
        setDoctors(d);
        setPatients(p);
    };

    useEffect(() => {
        loadData();
    }, []);

    //  Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //  Add / Update Appointment
    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = editing ? "PUT" : "POST";
        const url = editing ? `${API}/${editing._id}` : API;

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        resetForm();
        loadData();
    };

    //  Delete Appointment
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this appointment?")) return;

        await fetch(`${API}/${id}`, { method: "DELETE" });
        loadData();
    };

    //  Edit Appointment
    const handleEdit = (a) => {
        setEditing(a);
        setFormData({
            doctor: a.doctor?._id || a.doctor,
            patient: a.patient?._id || a.patient,
            date: a.date?.slice(0, 10),
            time: a.time,
            status: a.status,
            notes: a.notes || "",
        });
        setShowForm(true);
    };


    const resetForm = () => {
        setEditing(null);
        setFormData({
            doctor: "",
            patient: "",
            date: "",
            time: "",
            status: "Scheduled",
            notes: "",
        });
    };
    return (
        <div className="container main-content">
            <div className="flex justify-between items-center mb-6">
                <h1>Appointments Management</h1>
                {!showForm && (
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                        + Book Appointment
                    </button>
                )}
            </div>

            {/*  FORM  */}
            {showForm && (
                <div className="card" style={{ marginBottom: "2rem" }}>
                    <div className="flex justify-between items-center mb-6">
                        <h2>{editing ? "Edit Appointment" : "Book New Appointment"}</h2>
                        <button className="btn-icon" onClick={handleCancel}>
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid">

                            {/* Doctor Dropdown */}
                            <div className="form-group">
                                <label className="label">Doctor</label>
                                <select className="select" name="doctor" value={formData.doctor} onChange={handleChange} required>
                                    <option value="">Select Doctor</option>
                                    {doctors.map((d) => (
                                        <option key={d._id} value={d._id}>
                                            {d.name} ({d.specialization})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Patient Dropdown */}
                            <div className="form-group">
                                <label className="label">Patient</label>
                                <select className="select" name="patient" value={formData.patient} onChange={handleChange} required>
                                    <option value="">Select Patient</option>
                                    {patients.map((p) => (
                                        <option key={p._id} value={p._id}>
                                            {p.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="label">Date</label>
                                <input className="input" name="date" type="date" value={formData.date} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label className="label">Time</label>
                                <input className="input" name="time" type="time" value={formData.time} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label className="label">Status</label>
                                <select className="select" name="status" value={formData.status} onChange={handleChange}>
                                    <option value="Scheduled">Scheduled</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="label">Notes</label>
                                <input className="input" name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="flex gap-2" style={{ marginTop: "1rem" }}>
                            <button type="submit" className="btn btn-primary">
                                {editing ? "Update Appointment" : "Book Appointment"}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/*(Cards for better mobile view)  */}
            {!showForm && (
                <div className="grid">
                    {appointments.map((a) => (
                        <div key={a._id} className="card appointment-card">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} className="text-muted" />
                                    <h3 style={{ margin: 0 }}>{a.date?.slice(0, 10)}</h3>
                                    <div className="flex items-center gap-1 text-muted text-sm" style={{ marginLeft: '10px' }}>
                                        <Clock size={14} />
                                        <span>{a.time}</span>
                                    </div>
                                </div>
                                <span className={`status-badge ${a.status.toLowerCase()}`}
                                    style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem',
                                        fontWeight: 500,
                                        background: a.status === 'Completed' ? '#d1fae5' : a.status === 'Cancelled' ? '#fee2e2' : '#e0e7ff',
                                        color: a.status === 'Completed' ? '#065f46' : a.status === 'Cancelled' ? '#991b1b' : '#3730a3'
                                    }}>
                                    {a.status}
                                </span>
                            </div>

                            <div className="text-sm mb-4" style={{ display: 'grid', gap: '8px' }}>
                                <div className="flex items-center gap-2">
                                    <Stethoscope size={16} className="text-muted" />
                                    <strong>Doctor:</strong> {getDoctorName(a.doctor)}
                                </div>
                                <div className="flex items-center gap-2">
                                    <User size={16} className="text-muted" />
                                    <strong>Patient:</strong> {getPatientName(a.patient)}
                                </div>
                                {a.notes && (
                                    <div style={{ marginTop: '5px', color: '#6b7280', fontStyle: 'italic' }}>
                                        "{a.notes}"
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
                                <button className="btn-secondary btn-sm" onClick={() => handleEdit(a)}>
                                    <Edit2 size={16} /> Edit
                                </button>
                                <button className="btn-danger btn-sm" onClick={() => handleDelete(a._id)}>
                                    <Trash2 size={16} /> Cancel
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!showForm && appointments.length === 0 && (
                <div className="empty-state">
                    <p>No scheduled appointments.</p>
                </div>
            )}
        </div>
    );
};

export default AppointmentForm;
