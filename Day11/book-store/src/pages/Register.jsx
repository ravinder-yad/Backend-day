import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify(formData);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const response = await fetch("http://localhost:3000/api/register", requestOptions);
            const res = await response.json();

            if (response.ok) {
                localStorage.setItem('token', res.token); // Assuming backend still returns token on success
                localStorage.setItem('user', JSON.stringify(res)); // Assuming backend returns full object for register
                toast.success('Registration successful! Please login.');
                navigate('/login');
            } else {
                toast.error(res.message || 'Registration failed');
            }
        } catch (error) {
            toast.error('Registration error: ' + error.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card-modern">
                <div className="auth-header">
                    <div className="auth-logo">🚀</div>
                    <h2 className="auth-title">Create Account</h2>
                    <p className="auth-subtitle">Join our community of book lovers today</p>
                </div>


                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="modern-input-group">
                            <label className="modern-label">First Name</label>
                            <input
                                type="text"
                                name="name"
                                className="modern-input"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="John"
                            />
                        </div>
                        <div className="modern-input-group">
                            <label className="modern-label">Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                className="modern-input"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div className="modern-input-group">
                        <label className="modern-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="modern-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="name@example.com"
                        />
                    </div>

                    <div className="modern-input-group">
                        <label className="modern-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="modern-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="btn-modern">
                        Start Reading
                    </button>
                </form>

                <div className="auth-footer-modern">
                    Already have an account?
                    <Link to="/login" className="link-highlight" style={{ marginLeft: '0.5rem' }}>
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
