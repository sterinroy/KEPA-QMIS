import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import for navigation
import './Temp.css';
import logoac from '../../assets/police_academy2.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import userimg from '../../assets/user.jpg'
const Temp = ({children}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate(); // ✅ Create navigate instance

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
    // Optionally: Clear tokens, session, etc.
    localStorage.clear();
    setShowDropdown(false);
    navigate('/login'); // ✅ Redirect to login route
  };
    const handleStockNavigation = () => {
    navigate('/tempstockdetailentry'); // Redirect to Stock page when clicked
  };
  // const handleStock=()=>{

  // }
  
    const handlePurchseDashboard=()=>{
      navigate('/temp');
    }
    const handlePurchseTransfer=()=>{
      navigate('/tempissued')
    }
  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">
          <img src={logoac} alt="logo" />
        </div>
        <nav className="nav-menu">
          <div className="nav-item active" onClick={handlePurchseDashboard}><DashboardIcon className="icon" /> Dashboard</div>
          <div className="nav-item " onClick={handleStockNavigation}><DescriptionIcon className="icon" />Temporary Stock Issue Details</div>
          <div className="nav-item" onClick={handlePurchseTransfer}><BookmarkIcon className="icon" /> Temporary Stock <br></br> Issued</div>
        </nav>
      </aside>

      <main className="main">
        <nav className="top-navbar">
          <h1>Welcome QuarterMaster<br /><span>(Issue Wing)</span></h1>
          <div className="header-right">
            <input type="text" className="search" placeholder="Search" />
            <NotificationsNoneIcon className="icon-bell" />
            <div className="profile" ref={profileRef} onClick={toggleDropdown}>
              <img src={userimg} alt="User" className="profile-pic" />
              <span className="profile-name">qmtemp</span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <img src={logoac} alt="User" className="dropdown-pic" />
                  <div className="dropdown-details">
                    <div className="name">Quarter Master</div>
                    <div className="email">qmpurchase@domain.com</div>
                  </div>
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </nav>
        {children}
      </main>
    </div>
  );
};

export default Temp;