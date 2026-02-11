import React, { useState, useEffect } from "react";
import { X, Edit2, Trash2 } from "lucide-react";

const API = "http://localhost:3000/api/doctor";

const DoctorForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    fees: "",
  });

  /*  */
  const loadDoctors = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error loading doctors:", error);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  /*  */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /*  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await fetch(`${API}/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setEditing(null);
      } else {
        // 
        await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      // reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        experience: "",
        fees: "",
      });

      loadDoctors();
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  /*  */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;

    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      loadDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  /*  */
  const handleEdit = (doc) => {
    setEditing(doc);
    setFormData({
      name: doc.name,
      email: doc.email,
      phone: doc.phone,
      specialization: doc.specialization,
      experience: doc.experience,
      fees: doc.fees,
    });
  };

  /*  */
  const handleCancel = () => {
    setEditing(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      experience: "",
      fees: "",
    });
  };


    return (
        <div className="container main-content">
            <h1 style={{ marginBottom: '20px' }}>Doctors Management</h1>

            {/*  FORM  */}
            <div className="card" style={{ marginBottom: "2rem" }}>
                <div className="flex justify-between items-center mb-6">
                    <h2>{editing ? "Edit Doctor" : "Add New Doctor"}</h2>
                    {editing && (
                        <button className="btn-icon" onClick={handleCancel}>
                            <X size={20} />
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid">
                        <div className="form-group">
                            <label className="label">Name</label>
                            <input name="name" className="input" placeholder="Name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="label">Email</label>
                            <input name="email" type="email" className="input" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="label">Phone</label>
                            <input name="phone" className="input" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="label">Specialization</label>
                            <input name="specialization" className="input" placeholder="Specialization" value={formData.specialization} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="label">Experience (Years)</label>
                            <input name="experience" type="number" className="input" placeholder="Experience" value={formData.experience} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label className="label">Fees (₹)</label>
                            <input name="fees" type="number" className="input" placeholder="Fees" value={formData.fees} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="flex gap-2" style={{ marginTop: "1rem" }}>
                        <button type="submit" className="btn btn-primary">
                            {editing ? "Update Doctor" : "Add Doctor"}
                        </button>
                    </div>
                </form>
            </div>

            {/*  TABLE  */}
            <div className="card" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                        <tr>
                            <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
                            <th style={{ padding: "12px", textAlign: "left" }}>Specialization</th>
                            <th style={{ padding: "12px", textAlign: "left" }}>Fees</th>
                            <th style={{ padding: "12px", textAlign: "center" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doc) => (
                            <tr key={doc._id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                                <td style={{ padding: "12px" }}>{doc.name}</td>
                                <td style={{ padding: "12px" }}>{doc.specialization}</td>
                                <td style={{ padding: "12px", color: "#10b981", fontWeight: 600 }}>₹{doc.fees}</td>
                                <td style={{ padding: "12px", textAlign: "center" }}>
                                    <div className="flex gap-2 justify-center">
                                        <button className="btn-secondary btn-sm" onClick={() => handleEdit(doc)}>
                                            <Edit2 size={16} style={{ marginRight: '5px' }} /> Edit
                                        </button>
                                        <button className="btn-danger btn-sm" onClick={() => handleDelete(doc._id)}>
                                            <Trash2 size={16} style={{ marginRight: '5px' }} /> Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {doctors.length === 0 && (
                    <div style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
                        No doctors found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorForm;
