import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" className="side-link">
        All Skills
      </NavLink>
      <NavLink to="/dashboard?tab=my-skills" className="side-link">
        My Skills
      </NavLink>
      <NavLink to="/dashboard?tab=requests" className="side-link">
        Requests
      </NavLink>
      <NavLink to="/profile" className="side-link">
        Profile
      </NavLink>
    </aside>
  );
}

export default Sidebar;
