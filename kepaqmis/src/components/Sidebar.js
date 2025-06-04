// Sidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import logoac from '../assets/logopolice.png'; // adjust path as needed
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { key: 'dashboard', icon: <DashboardIcon />, label: 'Dashboard', path: '/purchase' },
    { key: 'stock', icon: <DescriptionIcon />, label: 'Stock Details Entry', path: '/purchasestockdetailentry' },
    { key: 'transfer', icon: <BookmarkIcon />, label: 'Transfer Stock', path: '/purchasetransfer' },
  ];

  const getActiveNav = (pathname) => {
    if (pathname === '/purchase') return 'dashboard';
    if (pathname === '/purchasestockdetailentry') return 'stock';
    if (pathname === '/purchasetransfer') return 'transfer';
    return '';
  };

  const activeNav = getActiveNav(location.pathname);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className="sidebar">
      <div className='kepa'>KEPA QMIS</div>
      <div className="logo"><img src={logoac} alt="logo" /></div>
      <nav className="nav-menu">
        {navItems.map((item) => (
          <div
            key={item.key}
            className={`nav-item ${activeNav === item.key ? 'active' : ''}`}
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon} {item.label}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
