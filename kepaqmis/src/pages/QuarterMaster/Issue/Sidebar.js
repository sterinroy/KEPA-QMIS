import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import './Temp.css';
import logoac from '../../../assets/police_academy2.png';

const Sidebar = ({ activeItem }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleKeyDown = (e, path) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(path);
    }
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logoac} alt="logo" />
      </div>
      <nav className="nav-menu">
        <div
          className={`nav-item ${activeItem === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleNavigate('/temp')}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, '/temp')}
        >
          <DashboardIcon className="icon" /> Dashboard
        </div>

        <div
          className={`nav-item ${activeItem === 'stock' ? 'active' : ''}`}
          onClick={() => handleNavigate('/tempstockdetailentry')}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, '/tempstockdetailentry')}
        >
          <DescriptionIcon className="icon" /> Temporary Stock Issue Details
        </div>

        <div
          className={`nav-item ${activeItem === 'transfer' ? 'active' : ''}`}
          onClick={() => handleNavigate('/tempissued')}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, '/tempissued')}
        >
          <BookmarkIcon className="icon" /> Temporary Stock Issued
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
