import { useState } from 'react';
import { login, register, forgotPassword } from '../services/api';
import { FaReact, FaUserPlus, FaSignInAlt, FaKey } from 'react-icons/fa'; // Icons set

const Auth = ({ onLogin }) => {
    // view can be: 'login' | 'register' | 'forgot-password'
    const [view, setView] = useState('login');

    // Form data state
    const [formData, setFormData] = useState({
        FullName: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
        MobileNumber: '',
        Address: '',
        Gender: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (view === 'register') {
                const registerData = {
                    "FullName": formData.FullName,
                    "Email": formData.Email,
                    "Password": formData.Password,
                    "ConfirmPassword": formData.Password,
                    "MobileNumber": formData.MobileNumber,
                    "Address": formData.Address,
                    "Gender": formData.Gender
                };
                const { data } = await register(registerData);
                localStorage.setItem('token', data.token);
                onLogin();
            } else if (view === 'login') {
                const { data } = await login({
                    Email: formData.Email,
                    Password: formData.Password
                });
                localStorage.setItem('token', data.token);
                onLogin();
            } else if (view === 'forgot-password') {
                const { data } = await forgotPassword(formData.Email);
                alert(data.message || 'If an account exists, token sent.');
                setView('login');
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Error occurred');
        }
    };

    const getTitle = () => {
        if (view === 'register') return 'Create Account';
        if (view === 'forgot-password') return 'Reset Password';
        return 'Welcome Back';
    };

    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <div className="logo-container">
                <FaReact className="react-icon-spin" />
            </div>

            <h2>{getTitle()}</h2>
            <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                {view === 'register' && (
                    <>
                        <input
                            type="text"
                            name="FullName"
                            placeholder="Full Name"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="MobileNumber"
                            placeholder="Mobile Number"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="Address"
                            placeholder="Address"
                            onChange={handleChange}
                            required
                        />
                        <select
                            name="Gender"
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '16px', marginBottom: '20px', border: '2px solid #eef2f5', borderRadius: '12px', fontSize: '1rem', backgroundColor: '#fcfcfc', fontFamily: 'Outfit' }}
                            defaultValue=""
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </>
                )}

                <input
                    type="email"
                    name="Email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    required
                />

                {view !== 'forgot-password' && (
                    <input
                        type="password"
                        name="Password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                )}

                <button type="submit">
                    {view === 'register' ? 'Register' : view === 'forgot-password' ? 'Send Reset Token' : 'Login'}
                </button>
            </form>

            {/* Navigation Buttons with Icons */}
            <div className="auth-toggle-container">
                {view === 'login' && (
                    <>
                        <button className="auth-toggle" onClick={() => setView('register')}>
                            <FaUserPlus /> Need an account? Register
                        </button>
                        <button className="auth-toggle" onClick={() => setView('forgot-password')} style={{ backgroundColor: 'transparent', fontSize: '0.85rem' }}>
                            <FaKey /> Forgot Password?
                        </button>
                    </>
                )}

                {view === 'register' && (
                    <button className="auth-toggle" onClick={() => setView('login')}>
                        <FaSignInAlt /> Already have an account? Login
                    </button>
                )}

                {view === 'forgot-password' && (
                    <button className="auth-toggle" onClick={() => setView('login')}>
                        <FaSignInAlt /> Back to Login
                    </button>
                )}
            </div>
        </div>
    );
};
export default Auth;
