import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logoac from "../assets/police_academy2.png";
import "../components/Sidebar.css";
import { logout } from "../redux/actions/authActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const Sidebar = ({ navItems }) => {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pen, setPen] = useState("");

  const user = useSelector((state) => state.auth);

  const handleKeyDown = (e, callback) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  useEffect(() => {
    if (user?.pen) {
      setPen(user.pen);
    }
  }, [user]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    setOpenModal(true);
  };
  const confirmLogout = () => {
    try {
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("pen");
      navigate("/login", { replace: true });
      setOpenModal(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const cancelLogout = () => {
    setOpenModal(false);
  };

  const renderNavItem = (item) => {
    const handleClick = () => {
      if (item.modal) {
        setOpenModal(true);
      } else {
        navigate(item.path);
      }
    };

    return (
      <div
        className={`nav-item ${isActive(item.path) ? "active" : ""}`}
        onClick={handleClick}
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, handleClick)}
      >
        {item.icon} {item.label}
      </div>
    );
  };

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-title">
          <span className="kepa">KEPA</span> <span className="qmis">QMIS</span>
          <div className="pen-display">PEN: {pen || "Loading..."}</div>
        </div>
        <div className="logo">
          <img src={logoac} alt="logo" />
        </div>
        <nav className="nav-menu">
          {navItems.map((item, index) => (
            <React.Fragment key={index}>{renderNavItem(item)}</React.Fragment>
          ))}
        </nav>
        <div className="logout-button" onClick={handleLogout}>
          {/* <LogoutIcon className="logout-icon" /> */}
          Logout
        </div>
      </aside>
      <Dialog
        open={openModal}
        onClose={cancelLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          container: "dialog-container",
          paper: "dialog-paper",
        }}
      >
        <DialogTitle id="alert-dialog-title" className="dialog-title">
          Confirm Logout
        </DialogTitle>
        <DialogContent className="dialog-content">
          <DialogContentText
            id="alert-dialog-description"
            className="dialog-content-text"
          >
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={cancelLogout} className="dialog-button-no">
            No
          </Button>
          <Button onClick={confirmLogout} className="dialog-button-yes">
            Yes
          </Button> 
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;
