import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({
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

            const response = await fetch("http://localhost:3000/api/login", requestOptions);
            const res = await response.json();

            if (response.ok) {
                toast.success('Login successful!');
                localStorage.setItem('token', res.token);
                localStorage.setItem('user', JSON.stringify(res.user));
                navigate('/');
            } else {
                toast.error(res.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('An error occurred during login');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card-modern">
                <div className="auth-header">
                    <div className="auth-logo">👋</div>
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Please enter your details to sign in</p>
                </div>


                <form onSubmit={handleSubmit}>
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
                        <label className="modern-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            Password
                        </label>
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
                        Sign In
                    </button>
                </form>

                <div className="auth-footer-modern">
                    Don't have an account?
                    <Link to="/register" className="link-highlight" style={{ marginLeft: '0.5rem' }}>
                        Create account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
