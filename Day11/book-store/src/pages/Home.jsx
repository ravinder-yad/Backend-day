import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchBooks = async () => {
        try {
            setError('');
            const token = localStorage.getItem('token');
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            const endpoint = searchTerm
                ? `http://localhost:3000/api/books/search?title=${searchTerm}`
                : `http://localhost:3000/api/books`;

            const response = await fetch(endpoint, requestOptions);
            const res = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Please login to view books");
                }
                throw new Error(res.message || 'Failed to fetch books');
            }

            const data = res.books || res.search || [];
            setBooks(data);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to load books. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchBooks();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <>
            <Navbar />
            <div className="container animate-fade-in">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Library</h1>
                        <p style={{ color: 'var(--text-dim)', marginTop: '0.5rem', fontSize: '1.1rem' }}>
                            Manage your collection
                        </p>
                    </div>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search books..."
                            className="form-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {error && (
                    <div style={{
                        background: '#fee2e2', color: '#991b1b', padding: '1rem',
                        borderRadius: '0.5rem', marginBottom: '2rem', textAlign: 'center',
                        fontSize: '1rem', border: '1px solid #fecaca'
                    }}>
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="empty-state">
                        <div style={{ fontSize: '2rem', marginBottom: '1rem', opacity: 0.5 }}>🔄</div>
                        Loading books...
                    </div>
                ) : books.length === 0 && !error ? (
                    <div className="empty-state">
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                        <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>No books found</h3>
                        <p style={{ marginBottom: '1.5rem' }}>Your library is looking a bit empty.</p>
                        <Link to="/add-product" className="btn-primary" style={{ display: 'inline-block', width: 'auto', padding: '0.75rem 1.5rem' }}>
                            Add New Book
                        </Link>
                    </div>
                ) : (
                    <div className="grid">
                        {books.map((book) => (
                            <div key={book._id} className="card">
                                <div className="card-img">
                                    {book.coverImage ? (
                                        <img src={book.coverImage} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <span>📖</span>
                                    )}
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title">{book.title}</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: 500 }}>
                                        by {book.author}
                                    </p>
                                    <div className="card-price">${book.price}</div>
                                    <p className="card-desc">
                                        {book.description || "No description available."}
                                    </p>
                                    <div className="card-footer">
                                        <span
                                            className={`card-badge ${book.inStock ? 'badge-success' : 'badge-danger'}`}
                                        >
                                            {book.inStock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                        <button className="btn-primary btn-sm" style={{ width: 'auto' }}>
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
