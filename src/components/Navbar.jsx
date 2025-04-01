import React from "react";
import './Navbar.css'

const Navbar = ({ toggleDarkMode, darkMode }) => {
  
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Dashboard</h1>
      </div>
      <div className="nav-links">
        <a href="#dashboard">Dashboard</a>
        <a href="#analytics">Analytics</a>
        <a href="#reports">Reports</a>
      </div>
      <button onClick={toggleDarkMode} className="toggle-btn">
        {darkMode ? "Light Theme" : "Dark Theme"}
      </button>
    </nav>
  );
};
export default Navbar;