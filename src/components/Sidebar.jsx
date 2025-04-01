import React, { useState } from 'react';
import { FaBars, FaTachometerAlt, FaChartBar, FaFileAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ onSelect, darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(true); // Start with sidebar open

  return (
    <div className={`sidebar ${darkMode ? 'dark' : 'light'} ${isOpen ? '' : 'closed'}`}>
      {/* Sidebar toggle button */}
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>

      {/* Sidebar Navigation */}
      <nav>
        <button onClick={() => onSelect('Dashboard')} className="nav-item">
          <FaTachometerAlt /> {isOpen && 'Dashboard'}
        </button>
        <button onClick={() => onSelect('Analytics')} className="nav-item">
          <FaChartBar /> {isOpen && 'Analytics'}
        </button>
        <button onClick={() => onSelect('Reports')} className="nav-item">
          <FaFileAlt /> {isOpen && 'Reports'}
        </button>
      </nav>

      {/* Dark Mode Toggle */}
      <button className="dark-mode-btn" onClick={toggleDarkMode}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
};

export default Sidebar;
