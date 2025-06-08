import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import DescriptionIcon from "@mui/icons-material/Description";
import HistoryIcon from "@mui/icons-material/History";
import {
  Modal,
  Box,
  Button,
  Typography
} from "@mui/material";

import "./Issue.css";
import logoac from "../../../assets/police_academy2.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const isActive = (path) => location.pathname === path;

  return (
    <>
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
            className={`nav-item ${isActive("/directissueform") || isActive("/issue-request") ? "active" : ""}`}
            onClick={() => setOpenModal(true)}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, () => setOpenModal(true))}
          >
            <AssignmentTurnedInIcon className="icon" /> Issue Form
          </div>

          <div
            className={`nav-item ${isActive("/stock") ? "active" : ""}`}
            onClick={() => handleNavigate("/stock")}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, () => handleNavigate("/stock"))}
          >
            <Inventory2Icon className="icon" /> Stock Details
          </div>

          <div
            className={`nav-item ${isActive("/tempstockdetailentry") ? "active" : ""}`}
            onClick={() => handleNavigate("/tempstockdetailentry")}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, () => handleNavigate("/tempstockdetailentry"))}
          >
            <DescriptionIcon className="icon" /> Temporary Issue Form
          </div>

          <div
            className={`nav-item ${isActive("/temphistory") ? "active" : ""}`}
            onClick={() => handleNavigate("/temphistory")}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, () => handleNavigate("/temphistory"))}
          >
            <HistoryIcon className="icon" /> Temporary Issue History
          </div>

          <div
            className={`nav-item ${isActive("/return-request") ? "active" : ""}`}
            onClick={() => handleNavigate("/return-request")}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, () => handleNavigate("/return-request"))}
          >
            <AssignmentReturnIcon className="icon" /> Return Request
          </div>
        </nav>
      </aside>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#111C44",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            minWidth: 300,
            outline: "none",
          }}
        >
          <Typography variant="h6" mb={2} color="white">
            Choose Entry Type
          </Typography>
          <Button
            variant="contained"
            fullWidth
            className="qouta-button"
            sx={{ mb: 2 }}
            onClick={() => {
              setOpenModal(false);
              navigate("/directissueform");
            }}
          >
            Direct Issue Entry
          </Button>
          <Button
            variant="contained"
            fullWidth
            className="direct-button"
            onClick={() => {
              setOpenModal(false);
              navigate("/issue-request");
            }}
          >
            Requested Issue Entry
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Sidebar;
