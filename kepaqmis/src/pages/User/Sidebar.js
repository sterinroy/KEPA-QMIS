import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";

import "./User.css";
import logoac from "../../assets/police_academy2.png"; 

const Sidebar = ({ activeItem }) => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState(activeItem );
  const handleNavigation = (page) => {
    setActiveNav(page);
    switch (page) {
      case "dashboard":
        navigate("/Userdashboard");
        break;
      case "sendrequest":
        navigate("/sendrequest");
        break;
      case "managerequest":
        navigate("/managerequest");
        break;
      case "temp":
        navigate("/temp");
        break;
      case "return":
        navigate("/return");
        break;
      default:
        break;
    }
  };

  return (
      <aside className="sidebar">
        <div className="logo">
          <img src={logoac} alt="logo" />
        </div>
        <nav className="nav-menu">
            <div className={`nav-item ${activeNav === 'dashboard' ? 'active' : ''}`} onClick={() => handleNavigation('dashboard')}>
                <DashboardIcon className="icon" /> Dashboard
            </div>
            <div className={`nav-item ${activeNav === 'sendrequest' ? 'active' : ''}`} onClick={() => handleNavigation('sendrequest')}>
                <DescriptionIcon className="icon" /> Send Request
            </div>
            <div className={`nav-item ${activeNav === 'temp' ? 'active' : ''}`} onClick={() => handleNavigation('temp')}>
                <DescriptionIcon className="icon" /> Temporary Issue
            </div>
            <div className={`nav-item ${activeNav === 'managerequest' ? 'active' : ''}`} onClick={() => handleNavigation('managerequest')}>
                <BookmarkIcon className="icon" /> Manage Request
            </div>
            <div className={`nav-item ${activeNav === 'return' ? 'active' : ''}`} onClick={() => handleNavigation('return')}>
                <AssignmentReturnIcon className="icon" /> Return
            </div>
            
        </nav>
      </aside>
  );
};

export default Sidebar;