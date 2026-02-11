import React, { useState, useEffect } from "react";
import { X, Edit2, Trash2 } from "lucide-react";


const API = "http://localhost:3000/api/patient";

const PatientForm = () => {
  const [patients, setPatients] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    disease: "",
    address: "",
  });

  //  Load Patients
  const loadPatients = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error("Error loading patients:", err);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  //  Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Add / Update Patient
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editing ? "PUT" : "POST";
    const url = editing ? `${API}/${editing._id}` : API;

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      resetForm();
      loadPatients();
    } catch (err) {
      console.error("Error saving patient:", err);
    }
  };

  //  Delete Patient
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this patient?")) return;

    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      loadPatients();
    } catch (err) {
      console.error("Error deleting patient:", err);
    }
  };

  //  Edit Patient
  const handleEdit = (p) => {
    setEditing(p);
    setFormData({
      name: p.name || "",
      age: p.age || "",
      gender: p.gender || "",
      phone: p.phone || "",
      disease: p.disease || "",
      address: p.address || "",
    });
    setShowForm(true);
  };

  // 
  const resetForm = () => {
    setEditing(null);
    setShowForm(false);
    setFormData({
      name: "",
      age: "",
      gender: "",
      phone: "",
      disease: "",
      address: "",
    });
  };


    return (
        <div className="container main-content">
            <div className="flex justify-between items-center mb-6">
                <h1>Patients Management</h1>
                {!showForm && (
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                        + Add Patient
                    </button>
                )}
            </div>

            {/*  FORM  */}
            {showForm && (
                <div className="card" style={{ marginBottom: "2rem" }}>
                    <div className="flex justify-between items-center mb-6">
                        <h2>{editing ? "Edit Patient" : "Register New Patient"}</h2>
                        <button className="btn-icon" onClick={handleCancel}>
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid">
                            <div className="form-group">
                                <label className="label">Name</label>
                                <input className="input" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label className="label">Age</label>
                                <input className="input" name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label className="label">Gender</label>
                                <select className="select" name="gender" value={formData.gender} onChange={handleChange} required>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="label">Phone</label>
                                <input className="input" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label className="label">Disease</label>
                                <input className="input" name="disease" placeholder="Disease" value={formData.disease} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label className="label">Address</label>
                                <input className="input" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="flex gap-2" style={{ marginTop: "1rem" }}>
                            <button type="submit" className="btn btn-primary">
                                {editing ? "Update Patient" : "Register Patient"}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* ========= TABLE ========= */}
            {!showForm && (
                <div className="card" style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                            <tr>
                                <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
                                <th style={{ padding: "12px", textAlign: "left" }}>Age/Gender</th>
                                <th style={{ padding: "12px", textAlign: "left" }}>Disease</th>
                                <th style={{ padding: "12px", textAlign: "left" }}>Phone</th>
                                <th style={{ padding: "12px", textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((p) => (
                                <tr key={p._id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                                    <td style={{ padding: "12px" }}>{p.name}</td>
                                    <td style={{ padding: "12px" }}>{p.age} / {p.gender}</td>
                                    <td style={{ padding: "12px" }}>{p.disease}</td>
                                    <td style={{ padding: "12px" }}>{p.phone}</td>
                                    <td style={{ padding: "12px", textAlign: "center" }}>
                                        <div className="flex gap-2 justify-center">
                                            <button className="btn-secondary btn-sm" onClick={() => handleEdit(p)}>
                                                <Edit2 size={16} style={{ marginRight: '5px' }} /> Edit
                                            </button>
                                            <button className="btn-danger btn-sm" onClick={() => handleDelete(p._id)}>
                                                <Trash2 size={16} style={{ marginRight: '5px' }} /> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {patients.length === 0 && (
                        <div style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
                            No patients registered yet.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PatientForm;
