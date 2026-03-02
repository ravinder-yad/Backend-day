import { Link, NavLink } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        SkillSwap Hub
      </Link>
      <nav className="nav-links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/dashboard" className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/profile" className="nav-link">
          Profile
        </NavLink>
      </nav>
      <div>
        {isAuthenticated ? (
          <Button variant="ghost" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Link to="/login" className="inline-link">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
