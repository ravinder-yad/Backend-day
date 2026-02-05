import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // Safely parse user from localStorage
    let user = {};
    try {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== "undefined") {
            user = JSON.parse(storedUser);
        }
    } catch (error) {
        console.error("Error parsing user from local storage", error);
        localStorage.removeItem('user'); // Clear bad data
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="nav-logo">
                    <span style={{ fontSize: '1.8rem', marginRight: '5px' }}>📚</span> BookStore
                </Link>
                <div className="nav-links">
                    {token ? (
                        <>
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/add-product" className="nav-link">Add Book</Link>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '0.5rem' }}>
                                <div style={{
                                    width: '35px', height: '35px', borderRadius: '50%',
                                    backgroundColor: '#EEF2FF',
                                    color: 'var(--primary)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 'bold', border: '1px solid #E0E7FF'
                                }}>
                                    {user.name ? user.name[0].toUpperCase() : 'U'}
                                </div>
                            </div>
                            <button onClick={handleLogout} className="btn-logout">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="btn-primary" style={{ padding: '0.5rem 1.2rem', width: 'auto' }}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
