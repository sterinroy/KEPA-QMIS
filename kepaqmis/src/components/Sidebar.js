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
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import { Logout as LogoutIcon, QuestionMark as QuestionIcon } from "@mui/icons-material";

const Sidebar = ({ navItems }) => {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pen, setPen] = useState("");

  const user = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth);

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
  if (!auth.isAuthenticated) return null;

  const isActive = (item) => {
    if (item.matchPaths) {
      return item.matchPaths.some((p) => location.pathname === p);
    }
    return location.pathname === item.path || location.pathname.startsWith(item.path + "/");
  };



  const handleLogout = () => {
    setOpenModal(true);
  };
  const confirmLogout = () => {
    try {
      dispatch(logout()); // assume this sets isAuthenticated to false
      localStorage.clear();

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 50); // short delay to allow state update

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
        className={`nav-item ${isActive(item) ? "active" : ""}`}
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
      <Dialog
        open={openModal}
        onClose={cancelLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          className: "premium-dialog-paper",
          sx: {
            bgcolor: "rgba(11, 16, 42, 0.9)",
            borderRadius: "28px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            padding: "24px",
            maxWidth: "400px",
            width: "100%",
          }
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center', pb: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: "rgba(244, 67, 54, 0.1)",
                color: "#f44336",
                border: "2px solid rgba(244, 67, 54, 0.2)"
              }}
            >
              <LogoutIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography variant="h5" color="white" fontWeight="800">
              Confirm Logout
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', px: 4 }}>
          <Typography
            id="alert-dialog-description"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "1rem",
              fontWeight: "500"
            }}
          >
            Are you sure you want to exit the Quarter Master system?
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            gap: 2,
            pt: 3,
            pb: 1
          }}
        >
          <Button
            onClick={cancelLogout}
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: "700",
              fontSize: "1rem",
              px: 4,
              py: 1.2,
              borderRadius: "14px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.2)"
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmLogout}
            variant="contained"
            sx={{
              bgcolor: "#f44336",
              color: "white",
              textTransform: "none",
              fontWeight: "700",
              fontSize: "1rem",
              px: 4,
              py: 1.2,
              borderRadius: "14px",
              boxShadow: "0 8px 20px rgba(244, 67, 54, 0.3)",
              "&:hover": {
                bgcolor: "#d32f2f",
                boxShadow: "0 10px 25px rgba(244, 67, 54, 0.4)"
              }
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;
