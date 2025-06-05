import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';
import userimg from '../../src/assets/user.jpg';
import logoac from '../../src/assets/police_academy2.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const UserDashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown(prev => !prev);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setShowDropdown(false);
    navigate('/login');
  };

  // Fixed navigation functions
  const Dashboard = () => {
    navigate('/Userdashboard');
  };

  const SendRequest = () => {
    navigate('/sendrequest');
  };

  const ManageRequest = () => {
    navigate('/managerequest');
  };

  const Temp = () => {
    navigate('/temp');
  };

  const Return = () => {
    navigate('/return');
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">
          <img src={logoac} alt="logo" />
        </div>
        <nav className="nav-menu">
          {/* Fixed navigation items with correct click handlers */}
          <div className="nav-item active" onClick={Dashboard}>
            <DashboardIcon className="icon" /> Dashboard
          </div>
          <div className="nav-item" onClick={SendRequest}>
            <DescriptionIcon className="icon" /> Send Request
          </div>
          <div className="nav-item" onClick={Temp}>
            <DescriptionIcon className="icon" /> Temporary Issue
          </div>
          <div className="nav-item" onClick={ManageRequest}>
            <BookmarkIcon className="icon" /> Manage Request
          </div>
          
          <div className="nav-item" onClick={Return}>
            <AssignmentReturnIcon className="icon" /> Return
          </div>
        </nav>
      </aside>

      <main className="main">
        <nav className="top-navbar">
          <h1>Welcome ABCD<br /><span>(User)</span></h1>
          <div className="header-right">
            <input type="text" className="search" placeholder="Search" />
            <NotificationsNoneIcon className="icon-bell" />
            <div className="profile" ref={profileRef} onClick={toggleDropdown}>
              <img src={userimg} alt="User" className="profile-pic" />
              <span className="profile-name">ABCD</span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <img src={logoac} alt="User" className="dropdown-pic" />
                  <div className="dropdown-details">
                    <div className="name">ABCD</div>
                  </div>
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Added dashboard content area */}
        <div className="dashboard-content">
          <div className="large-box">
            <h2>Dashboard Overview</h2>
            <p>Welcome to your dashboard. Use the navigation menu to access different features.</p>
          </div>
          
          <div className="card-row">
            <div className="card">
              <h3>Recent Requests</h3>
              <p>View your recent submitted requests</p>
            </div>
            <div className="card">
              <h3>Quick Actions</h3>
              <p>Access frequently used features</p>
            </div>
            <div className="card">
              <h3>Notifications</h3>
              <p>Check your latest updates</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;