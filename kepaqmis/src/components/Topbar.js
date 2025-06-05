// Topbar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Topbar.css';
import { useDispatch } from 'react-redux';
import userimg from '../assets/userlogo.png'; // Adjust as needed
import logoac from '../assets/logopolice.png';  // Adjust as needed
import Login from '../pages/Login';

const Topbar = ({ pen, role }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const [isLoggedout,setIsLogout] = useState(false);
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Logout logged successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }

    localStorage.clear();
    setShowDropdown(false);
    setIsLogout(true);
    navigate("/login");
  };
  if (isLoggedout) {
    return <Login />; // Redirect to Login component if logged out
  }

  return (
    <nav className="top-navbar">
      <h1>Welcome QuarterMaster<br /><span>(Purchase Wing)</span></h1>
      <div className="header-right">
        <div className="profile" onClick={toggleDropdown}>
          <img src={userimg} alt="User" className="profile-pic" />
          <span className="profile-name">{pen}</span>
          {showDropdown && (
            <div className="dropdown-menu">
              <img src={logoac} alt="User" className="dropdown-pic" />
              <div className="dropdown-details">
                <div className="name">{role}</div>
                <div className="pen">PEN: {pen}</div>
              </div>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
