// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom'; // ✅ Import for navigation
// import './Purchase.css';
// import logoac from '../../assets/police_academy2.png';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import DescriptionIcon from '@mui/icons-material/Description';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import userimg from '../../assets/user.jpg'
// const PurchaseDashboard = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const profileRef = useRef(null);
//   const navigate = useNavigate(); // ✅ Create navigate instance
//   const penNumber = 'PEN123456';
//   const toggleDropdown = () => setShowDropdown(prev => !prev);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     // Optionally: Clear tokens, session, etc.
//     localStorage.clear();
//     setShowDropdown(false);
//     navigate('/login'); // ✅ Redirect to login route
//   };
//     const handleStockNavigation = () => {
//     navigate('/purchasestockdetailentry'); // Redirect to Stock page when clicked
//   };
//   // const handleStock=()=>{

//   // }
  
//     const handlePurchseDashboard=()=>{
//       navigate('/purchase');
//     }
//     const handlePurchseTransfer=()=>{
//       navigate('/purchasetransfer')
//     }
//   return (
//     <div className="container">
//       <aside className="sidebar">
//         <div className="logo">
//           <img src={logoac} alt="logo" />
//         </div>
//         <nav className="nav-menu">
//           <div className="nav-item active" onClick={handlePurchseDashboard}><DashboardIcon className="icon" /> Dashboard</div>
//           <div className="nav-item " onClick={handleStockNavigation}><DescriptionIcon className="icon" /> Stock Details Entry</div>
//           <div className="nav-item" onClick={handlePurchseTransfer}><BookmarkIcon className="icon" /> Transfer Stock</div>
//         </nav>
//       </aside>

//       <main className="main">
//         <nav className="top-navbar">
//           <h1>Welcome QuarterMaster<br /><span>(Purchase Wing)</span></h1>
//           <div className="header-right">
//             <input type="text" className="search" placeholder="Search" />
//             <NotificationsNoneIcon className="icon-bell" />
//             <div className="profile" ref={profileRef} onClick={toggleDropdown}>
//               <img src={userimg} alt="User" className="profile-pic" />
//               <span className="profile-name">PEN: {penNumber}</span>
//               {showDropdown && (
//                 <div className="dropdown-menu">
//                   <img src={logoac} alt="User" className="dropdown-pic" />
//                   <div className="dropdown-details">
//                     <div className="name">QuarterMaster</div>
//                     <div className="pen">PEN: {penNumber}</div>
//                   </div>
//                   <button className="logout-btn" onClick={handleLogout}>Logout</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </nav>
//       </main>
//     </div>
//   );
// };

// // export default PurchaseDashboard;
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Purchase.css';
// import logoac from '../../assets/police_academy2.png';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import DescriptionIcon from '@mui/icons-material/Description';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import userimg from '../../assets/user.jpg';

// const PurchaseDashboard = ({ penNumber = 'PEN123456', userName = 'QuarterMaster' }) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const profileRef = useRef(null);
//   const navigate = useNavigate();

//   const toggleDropdown = () => setShowDropdown(prev => !prev);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     setShowDropdown(false);
//     navigate('/login');
//   };

//   // Dynamic navigation config
//   const navItems = [
//     { label: 'Dashboard', icon: <DashboardIcon className="icon" />, onClick: () => navigate('/purchase') },
//     { label: 'Stock Details Entry', icon: <DescriptionIcon className="icon" />, onClick: () => navigate('/purchasestockdetailentry') },
//     { label: 'Transfer Stock', icon: <BookmarkIcon className="icon" />, onClick: () => navigate('/purchasetransfer') },
//   ];

//   return (
//     <div className="container">
//       <aside className="sidebar">
//         <div className="logo">
//           <img src={logoac} alt="logo" />
//         </div>
//         <nav className="nav-menu">
//           {navItems.map((item, i) => (
//             <div key={i} className="nav-item" onClick={item.onClick}>
//               {item.icon} {item.label}
//             </div>
//           ))}
//         </nav>
//       </aside>

//       <main className="main">
//         <nav className="top-navbar">
//           <h1>Welcome {userName}<br /><span>(Purchase Wing)</span></h1>
//           <div className="header-right">
//             <input type="text" className="search" placeholder="Search" />
//             <NotificationsNoneIcon className="icon-bell" />
//             <div className="profile" ref={profileRef} onClick={toggleDropdown}>
//               <img src={userimg} alt="User" className="profile-pic" />
//               <span className="profile-name">PEN: {penNumber}</span>
//               {showDropdown && (
//                 <div className="dropdown-menu">
//                   <img src={logoac} alt="User" className="dropdown-pic" />
//                   <div className="dropdown-details">
//                     <div className="name">{userName}</div>
//                     <div className="pen">PEN: {penNumber}</div>
//                   </div>
//                   <button className="logout-btn" onClick={handleLogout}>Logout</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </nav>
//       </main>
//     </div>
//   );
// };

// export default PurchaseDashboard;


// export default PurchaseStockDetailEntry;
// import React, { useState, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PurchaseStockdetailentry.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import userimg from '../../../assets/user.jpg';
import logoac from '../../../assets/police_academy2.png';
// import {
//   TextField, Select, MenuItem, InputLabel,
//   FormControl, Button, Grid, Box
// } from '@mui/material';

const PurchaseDashboard = () => {
  const[penNumber,setPenNumber]=useState(false);
  const[role,setRole]=useState(false);

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeNav, setActiveNav] = useState('stock');
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const handleNavigation = (page) => {
    setActiveNav(page);
    navigate(
      page === 'dashboard' ? '/purchase' :
      page === 'stock' ? '/purchasestockdetailentry' :
      '/purchasetransfer'
    );
  };

  const navItems = [
    { key: 'dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
    { key: 'stock', icon: <DescriptionIcon />, label: 'Stock Details Entry' },
    { key: 'transfer', icon: <BookmarkIcon />, label: 'Transfer Stock' },
  ];

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo"><img src={logoac} alt="logo" /></div>
        <nav className="nav-menu">
          {navItems.map((item) => (
            <div
              key={item.key}
              className={`nav-item ${activeNav === item.key ? 'active' : ''}`}
              onClick={() => handleNavigation(item.key)}
            >
              {item.icon} {item.label}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        <nav className="top-navbar">
          <h1>Welcome QuarterMaster<br /><span>(Purchase Wing)</span></h1>
          <div className="header-right">
            <input type="text" className="search" placeholder="Search" />
            <NotificationsNoneIcon className="icon-bell" />
            <div className="profile" onClick={toggleDropdown}>
              <img src={userimg} alt="User" className="profile-pic" />
              <span className="profile-name">PEN: {penNumber}</span>
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
      </main>
    </div>
  );
};

export default PurchaseDashboard;