import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase"; // Import Firebase auth
import "./Sidebar.css"; // Sidebar styles

const Sidebar = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out from Firebase
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/transactions">Transactions</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
