// Topbar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Topbar.css';
import userimg from '../assets/user.jpg'; // Adjust as needed
import logoac from '../assets/logopolice.png'; ; // Adjust as needed

const Topbar = ({ penNumber, role }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <nav className="top-navbar">
      <h1>Welcome QuarterMaster<br /><span>(Purchase Wing)</span></h1>
      <div className="header-right">
        <div className="profile" onClick={toggleDropdown}>
          <img src={userimg} alt="User" className="profile-pic" />
          <span className="profile-name">{penNumber}</span>
          {showDropdown && (
            <div className="dropdown-menu">
              <img src={logoac} alt="User" className="dropdown-pic" />
              <div className="dropdown-details">
                <div className="name">{role}</div>
                <div className="pen">PEN: {penNumber}</div>
              </div>
              <button className="logout-btn" onClick={() => navigate('/login')}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
