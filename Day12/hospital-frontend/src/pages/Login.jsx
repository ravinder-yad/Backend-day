import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login Data:', formData);

        // Simulate successful login for now
        // In a real app, you would verify against backend here
        alert('Login functionality coming soon! Check console for data.');
        navigate('/');
    };

    return (
        <div className="container main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', background: '#e0e7ff', borderRadius: '50%', color: '#4f46e5', marginBottom: '1rem' }}>
                        <LogIn size={32} />
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Please enter your details to sign in</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                            <input
                                type="email"
                                name="email"
                                className="input"
                                style={{ paddingLeft: '40px' }}
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                            <input
                                type="password"
                                name="password"
                                className="input"
                                style={{ paddingLeft: '40px' }}
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Sign In
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#6b7280' }}>
                    Don't have an account?
                    <Link to="/register" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600, marginLeft: '5px' }}>
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
