import { useState, useEffect } from "react";
import "./index.css";
import { FaUserPlus, FaSearch, FaEdit, FaTrash, FaCalendarAlt, FaPhoneAlt, FaEnvelope, FaBuilding, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";

function App() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        company: "",
        jobTitle: "",
        profileurl: "",
        notes: "",
        birthdate: ""
    });

    const [contactId, setContactId] = useState("");
    const [contacts, setContacts] = useState([]);
    const [currentDate, setCurrentDate] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const date = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        setCurrentDate(date);
        fetchContacts();
    }, []);

    const fetchContacts = () => {
        fetch("http://localhost:3000/api/getContact")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setContacts(data);
            })
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (isEditing) {
            updateContact(contactId);
        } else {
            addContact();
        }
    };

    const addContact = () => {
        if (!form.name || !form.phone) return alert("Name and Phone are required!");
        fetch("http://localhost:3000/api/createContact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
            .then((res) => res.json())
            .then((data) => {
                alert("✨ Contact Added Successfully!");
                resetForm();
                fetchContacts();
            })
            .catch((err) => console.log(err));
    };

    const updateContact = (id) => {
        fetch(`http://localhost:3000/api/updateContact/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
            .then((res) => res.json())
            .then((data) => {
                alert("🚀 Contact Updated Successfully!");
                resetForm();
                fetchContacts();
            })
            .catch((err) => console.log(err));
    };

    const deleteContact = (id) => {
        if (!window.confirm("Are you sure you want to delete this contact?")) return;
        fetch(`http://localhost:3000/api/deleteContact/${id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
            .then((data) => {
                alert("🗑️ Contact Deleted!");
                fetchContacts();
            })
            .catch((err) => console.log(err));
    };

    const editContact = (contact) => {
        setForm({
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
            address: contact.address,
            company: contact.company,
            jobTitle: contact.jobTitle,
            profileurl: contact.profileurl,
            notes: contact.notes,
            birthdate: contact.birthdate
        });
        setContactId(contact._id);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setForm({
            name: "",
            phone: "",
            email: "",
            address: "",
            company: "",
            jobTitle: "",
            profileurl: "",
            notes: "",
            birthdate: ""
        });
        setContactId("");
        setIsEditing(false);
    };

    return (
        <div className="main-wrapper">
            <div className="container">
                <h1>Contact Pro</h1>

                <div className="form-grid">
                    <div className="input-group">
                        <label>Full Name</label>
                        <input name="name" value={form.name} placeholder="John Doe" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Phone Number</label>
                        <input name="phone" value={form.phone} placeholder="+1 234 567 890" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input name="email" value={form.email} type="email" placeholder="john@example.com" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Birth Date</label>
                        <input name="birthdate" value={form.birthdate} type="date" onChange={handleChange} />
                    </div>
                    <div className="input-group full-width">
                        <label>Address</label>
                        <input name="address" value={form.address} placeholder="123 Street, City, Country" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Company</label>
                        <input name="company" value={form.company} placeholder="Tech Corp" onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Job Title</label>
                        <input name="jobTitle" value={form.jobTitle} placeholder="Senior Developer" onChange={handleChange} />
                    </div>
                    <div className="input-group full-width">
                        <label>Profile URL</label>
                        <input name="profileurl" value={form.profileurl} placeholder="https://image-url.com" onChange={handleChange} />
                    </div>
                    <div className="input-group full-width">
                        <label>Notes</label>
                        <input name="notes" value={form.notes} placeholder="Some extra details..." onChange={handleChange} />
                    </div>
                </div>

                <div className="btn-group-main">
                    <button className="main-btn" onClick={handleSubmit}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {isEditing ? <FaEdit /> : <FaUserPlus />}
                            <span>{isEditing ? "Update Contact" : "Add New Contact"}</span>
                        </div>
                        <span className="btn-date">Submission Date: {currentDate}</span>
                    </button>
                    {isEditing && (
                        <button className="cancel-btn" onClick={resetForm}>Cancel Edit</button>
                    )}
                </div>
            </div>

            <div className="contacts-container">
                <h2 className="section-title">Saved Contacts ({contacts.length})</h2>
                <div className="contacts-grid">
                    {contacts.map((contact) => (
                        <div key={contact._id} className="contact-card">
                            <div className="card-actions-top">
                                <button title="Edit" onClick={() => editContact(contact)} className="icon-btn edit-icon"><FaEdit /></button>
                                <button title="Delete" onClick={() => deleteContact(contact._id)} className="icon-btn delete-icon"><FaTrash /></button>
                            </div>

                            <div className="card-header">
                                <img src={contact.profileurl || "https://ui-avatars.com/api/?name=" + contact.name} alt="Profile" className="card-avatar" />
                                <div className="header-info">
                                    <h3>{contact.name}</h3>
                                    <p><FaBriefcase /> {contact.jobTitle}</p>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="info-item">
                                    <FaPhoneAlt className="info-icon" /> <span>{contact.phone}</span>
                                </div>
                                <div className="info-item">
                                    <FaEnvelope className="info-icon" /> <span>{contact.email}</span>
                                </div>
                                <div className="info-item">
                                    <FaCalendarAlt className="info-icon" /> <span>{contact.birthdate || "Not Set"}</span>
                                </div>
                                <div className="info-item">
                                    <FaBuilding className="info-icon" /> <span>{contact.company}</span>
                                </div>
                                <div className="info-item">
                                    <FaMapMarkerAlt className="info-icon" /> <span>{contact.address}</span>
                                </div>
                            </div>

                            <div className="card-footer">
                                <p className="id-badge">ID: {contact._id}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
