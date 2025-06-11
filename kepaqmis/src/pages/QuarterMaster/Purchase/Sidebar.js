import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import "./Purchase.css";
import logoac from "../../../assets/police_academy2.png";
import {
  Button,
  Typography,
} from "@mui/material";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleKeyDown = (e, callback) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <span className="kepa">KEPA</span> <span className="qmis">QMIS</span>
      </div>
      <div className="logo">
        <img src={logoac} alt="logo" />
      </div>
      <nav className="nav-menu">
        <div
          className={`nav-item ${isActive("/dashboard") ? "active" : ""}`}
          onClick={() => handleNavigate("/dashboard")}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, () => handleNavigate("/dashboard"))}
        >
          <DashboardIcon className="icon" /> Dashboard
        </div>
        <div
          className={`nav-item ${isActive("/purchase-form") ? "active" : ""}`}
          onClick={() => handleNavigate("/purchase-form")}
          tabIndex={0}
          onKeyDown={(e) =>
            handleKeyDown(e, () => handleNavigate("/purchase-form"))
          }
        >
          <AssignmentTurnedInIcon className="icon" /> Purchase Form
        </div>
        <div
          className={`nav-item ${isActive("/purchased-stock-history") ? "active" : ""}`}
          onClick={() => handleNavigate("/purchased-stock-history")}
          tabIndex={0}
          onKeyDown={(e) =>
            handleKeyDown(e, () =>
              handleNavigate("/purchased-stock-history")
            )
          }
        >
          <Inventory2Icon className="icon" /> Purchased Stock History
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;