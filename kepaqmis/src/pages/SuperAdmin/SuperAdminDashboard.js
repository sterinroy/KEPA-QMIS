import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SuperAdminDashboard.css';

import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const SuperAdminDashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setShowDropdown(false);
    navigate('/login');
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">Super Admin</div>
        <nav className="nav-menu">
          <div className="nav-item" onClick={() => navigate('/admin/overview')}>
            <DashboardIcon className="icon" /> Dashboard
          </div>
          <div className="nav-item" onClick={() => navigate('/SuperAdminApprovals')}>
            <DescriptionIcon className="icon" /> Approve Registrations
          </div>
          <div className="nav-item" onClick={() => navigate('/SuperAdminUsers')}>
            <BookmarkIcon className="icon" /> Manage Users
          </div>
        </nav>
      </aside>

      <main className="main">
        <nav className="top-navbar">
          <h1>Welcome Super Admin<br /><span>(Administrator Panel)</span></h1>
          <div className="header-right">
            <input type="text" className="search" placeholder="Search" />
            <NotificationsNoneIcon className="icon-bell" />
            <div className="profile" ref={profileRef} onClick={toggleDropdown}>
              <span className="profile-name">superadmin</span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-details">
                    <div className="name">Super Admin</div>
                    <div className="email">superadmin@domain.com</div>
                  </div>
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
