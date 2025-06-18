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

const Sidebar = ({ navItems, onNavItemClick }) => {
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

  const isActive = (path, item) => {
    // Use manual highlight if defined
    if (item && item.isActive !== undefined) {
      return item.isActive;
    }
    // Otherwise check current path
    return location.pathname === path;
  };

  const handleLogout = () => {
    setOpenModal(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    navigate("/login");
    setOpenModal(false);
  };

  const cancelLogout = () => {
    setOpenModal(false);
  };

  const renderNavItem = (item) => {
    const handleClick = () => {
      if (item.modal) {
        setOpenModal(true);
      } else if (onNavItemClick) {
        onNavItemClick(item); // Custom handler from layout
      } else {
        navigate(item.path); // Default behavior
      }
    };

    return (
      <div
        className={`nav-item ${isActive(item.path, item) ? "active" : ""}`}
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
          Logout
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <Dialog
        open={openModal}
        onClose={cancelLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelLogout} color="primary">
            No
          </Button>
          <Button onClick={confirmLogout} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;