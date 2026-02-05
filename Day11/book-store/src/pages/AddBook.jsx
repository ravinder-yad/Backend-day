import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AddBook = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        category: 'Education',
        pages: '',
        description: '',
        inStock: true,
        coverImage: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`);

            const raw = JSON.stringify(formData);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const response = await fetch("http://localhost:3000/api/books", requestOptions);
            const res = await response.json();

            if (!response.ok) {
                // If token invalid, maybe redirect login?
                if (response.status === 401) {
                    navigate('/login');
                    return;
                }
                throw new Error(res.message || 'Failed to add book');
            }

            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to add book. Please try again.');
            window.scrollTo(0, 0);
        }
    };

    return (
        <>
            <Navbar />
            <div className="dashboard-container">
                <div className="dashboard-card">
                    <div className="dashboard-header">
                        <div className="dashboard-title">
                            <div className="dashboard-icon">➕</div>
                            Add New Book
                        </div>
                    </div>

                    <div className="dashboard-body">
                        {error && (
                            <div style={{
                                background: '#fee2e2', color: '#991b1b', padding: '0.75rem',
                                borderRadius: '0.5rem', marginBottom: '1.5rem', textAlign: 'center',
                                fontSize: '0.9rem', border: '1px solid #fecaca'
                            }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid-2">
                                <div className="input-wrapper">
                                    <label className="input-label">Book Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="custom-input"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter book title"
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <label className="input-label">Author Name</label>
                                    <input
                                        type="text"
                                        name="author"
                                        className="custom-input"
                                        value={formData.author}
                                        onChange={handleChange}
                                        required
                                        placeholder="Author Name"
                                    />
                                </div>
                            </div>

                            <div className="form-grid-2">
                                <div className="input-wrapper">
                                    <label className="input-label">Price ($)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="custom-input"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="input-wrapper">
                                    <label className="input-label">Pages</label>
                                    <input
                                        type="number"
                                        name="pages"
                                        className="custom-input"
                                        value={formData.pages}
                                        onChange={handleChange}
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            <div className="form-grid-2">
                                <div className="input-wrapper">
                                    <label className="input-label">Category</label>
                                    <select
                                        name="category"
                                        className="custom-select"
                                        value={formData.category}
                                        onChange={handleChange}
                                    >
                                        <option value="Education">Education</option>
                                        <option value="Novel">Novel</option>
                                        <option value="Story">Story</option>
                                        <option value="Notes">Notes</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="input-wrapper">
                                    <label className="input-label">Cover Image URL</label>
                                    <input
                                        type="text"
                                        name="coverImage"
                                        className="custom-input"
                                        value={formData.coverImage}
                                        onChange={handleChange}
                                        placeholder="https://example.com/cover.jpg"
                                    />
                                </div>
                            </div>

                            <div className="input-wrapper">
                                <label className="input-label">Description</label>
                                <textarea
                                    name="description"
                                    className="custom-textarea"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    placeholder="Brief summary of the book..."
                                    rows="4"
                                />
                            </div>

                            <div className="input-wrapper">
                                <label className="checkbox-wrapper" htmlFor="inStock">
                                    <input
                                        type="checkbox"
                                        name="inStock"
                                        id="inStock"
                                        className="custom-checkbox"
                                        checked={formData.inStock}
                                        onChange={handleChange}
                                    />
                                    <span className="checkbox-label">Available in Stock</span>
                                </label>
                            </div>

                            <button type="submit" className="btn-submit">
                                <span>Save Book</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddBook;
