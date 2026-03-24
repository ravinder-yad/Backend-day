import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './CreateTask.css';

function CreateTask() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'general',
        priority: 'medium',
        status: 'pending',
        dueDate: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert("Title is required!");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                ...formData,
                createdBy: user ? user.name : "Anonymous",
                user: user ? user._id : null
            };

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify(payload);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const response = await fetch("http://localhost:5000/api/tasks", requestOptions);

            const result = await response.json();

            if (response.ok) {
                alert("Task Created Successfully ✅");
                navigate("/my-tasks");
            } else {
                alert(result.message || "Failed to create task");
            }
        } catch (error) {
            console.error("Error creating task:", error);
            alert("Server Error 🚨");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="create-task-page py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">
                        <div className="create-task-card shadow-sm">

                            <div className="text-center mb-4">
                                <h2 className="form-title">Create Task ✍️</h2>
                                <p className="form-subtitle text-muted">Add your new task below</p>
                            </div>

                            <form onSubmit={handleSubmit} className="task-form">

                                {/* Title */}
                                <div className="mb-3">
                                    <label className="form-label fw-medium">Title <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        name="title"
                                        placeholder="Enter task title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-4">
                                    <label className="form-label fw-medium">Description</label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        rows="4"
                                        placeholder="Write task details..."
                                        value={formData.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                {/* Filters Row */}
                                <div className="row g-3 mb-4">

                                    {/* Category */}
                                    <div className="col-12 col-md-6">
                                        <label className="form-label fw-medium">Category</label>
                                        <select
                                            className="form-select"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                        >
                                            <option value="general">General</option>
                                            <option value="work">Work</option>
                                            <option value="study">Study</option>
                                            <option value="personal">Personal</option>
                                        </select>
                                    </div>

                                    {/* Priority */}
                                    <div className="col-12 col-md-6">
                                        <label className="form-label fw-medium">Priority</label>
                                        <select
                                            className="form-select"
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleChange}
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>

                                    {/* Status */}
                                    <div className="col-12 col-md-6">
                                        <label className="form-label fw-medium">Status</label>
                                        <select
                                            className="form-select"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>

                                    {/* Due Date */}
                                    <div className="col-12 col-md-6">
                                        <label className="form-label fw-medium">Due Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="dueDate"
                                            value={formData.dueDate}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Actions */}
                                <hr className="my-4 text-muted" />
                                <div className="d-flex justify-content-end gap-3 actions-row">
                                    <Link to="/my-tasks" className="btn btn-outline-secondary px-4 py-2">
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4 py-2 fw-medium"
                                        disabled={loading}
                                    >
                                        {loading ? "Creating..." : "Create Task"}
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CreateTask;
