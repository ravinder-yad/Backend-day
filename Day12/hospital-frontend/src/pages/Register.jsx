import React, { useState } from 'react';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        console.log('Registration Data:', formData);

        // Simulate successful registration
        alert('Registration successful! Click OK to go to login.');
        navigate('/login');
    };

    return (
        <div className="container main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', background: '#e0e7ff', borderRadius: '50%', color: '#4f46e5', marginBottom: '1rem' }}>
                        <UserPlus size={32} />
                    </div>
                    <h2>Create Account</h2>
                    <p>Join our hospital management system</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label">Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                            <input
                                type="text"
                                name="name"
                                className="input"
                                style={{ paddingLeft: '40px' }}
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

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

                    <div className="form-group">
                        <label className="label">Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
                            <input
                                type="password"
                                name="confirmPassword"
                                className="input"
                                style={{ paddingLeft: '40px' }}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Create Account
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#6b7280' }}>
                    Already have an account?
                    <Link to="/login" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600, marginLeft: '5px' }}>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
