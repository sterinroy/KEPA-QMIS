import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DescriptionIcon from "@mui/icons-material/Description";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HistoryIcon from "@mui/icons-material/History";

import "./Issue.css";
import logoac from "../../../assets/police_academy2.png";

const Sidebar = ({ activeItem }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleKeyDown = (e, path) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(path);
    }
  };

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
          className={`nav-item ${activeItem === "dashboard" ? "active" : ""}`}
          onClick={() => handleNavigate("/temp")}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, "/temp")}
        >
          <DashboardIcon className="icon" /> Dashboard
        </div>
        <div
          className={`nav-item ${activeItem === "qouta" ? "active" : ""}`}
          onClick={() => handleNavigate("/qouta")}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, "/qouta")}
        >
          <PlaylistAddIcon className="icon" /> Qouta Entry
        </div>

        <div
          className={`nav-item ${activeItem === "issue" ? "active" : ""}`}
          onClick={() => handleNavigate("/issue-request")}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, "/issue-request")}
        >
          <AssignmentTurnedInIcon className="icon" /> Issue Form
        </div>

        <div
          className={`nav-item ${activeItem === "stock" ? "active" : ""}`}
          onClick={() => handleNavigate("/stock")}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, "/stock")}
        >
          <Inventory2Icon className="icon" /> Stock Details
        </div>
        <div
          className={`nav-item ${activeItem === "stock" ? "active" : ""}`}
          onClick={() => handleNavigate("/tempstockdetailentry")}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, "/tempstockdetailentry")}
        >
          <DescriptionIcon className="icon" /> Temporary Issue Form
        </div>

        {/* New Temporary Issue History */}
        <div
          className={`nav-item ${
            activeItem === "temp-issue-history" ? "active" : ""
          }`}
          onClick={() => handleNavigate("/tempissued")}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, "/tempissued")}
        >
          <HistoryIcon className="icon" /> Temporary Issue History
        </div>

        <div
          className={`nav-item ${activeItem === "return" ? "active" : ""}`}
          onClick={() => handleNavigate("/return-request")}
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, "/return-request")}
        >
          <AssignmentReturnIcon className="icon" /> Return Request
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
