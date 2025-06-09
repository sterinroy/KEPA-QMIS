import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  Modal,
  Box,
  Button,
  Typography
} from "@mui/material";

import "./SuperAdmin.css";
import logo from '../../assets/police_academy2.png';

const Sidebar = ({ activeItem }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [openModal, setOpenModal] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleKeyDown = (e, callback) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-title">
          <span className="kepa">KEPA</span> <span className="qmis">QMIS</span>
        </div>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <nav className="nav-menu">
          <div
            className={`nav-item ${currentPath === "/SuperAdminDashboard" ? "active" : ""}`}
            onClick={() => handleNavigate("/SuperAdminDashboard")}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, () => handleNavigate("/SuperAdminDashboard"))}
          >
            <DashboardIcon className="icon" /> Dashboard
          </div>

          <div
            className={`nav-item ${currentPath === "/SuperAdminApprovals" ? "active" : ""}`}
            onClick={() => handleNavigate("/SuperAdminApprovals")}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, () => handleNavigate("/SuperAdminApprovals"))}
          >
            <DescriptionIcon className="icon" /> Approve Registrations
          </div>

          <div
            className={`nav-item ${activeItem === "users" ? "active" : ""}`}
            onClick={() => handleNavigate("/SuperAdminUsers")}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, () => handleNavigate("/SuperAdminUsers"))}
          >
            <BookmarkIcon className="icon" /> Manage Users
          </div>

          <div
            className={`nav-item ${activeItem === "logs" ? "active" : ""}`}
            onClick={() => handleNavigate("/SuperAdminLogs")}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, () => handleNavigate("/SuperAdminLogs"))}
          >
            <BookmarkIcon className="icon" /> Logs
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
