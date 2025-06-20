import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import QMIDashboard from "./QMIDashboard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import VerifiedIcon from "@mui/icons-material/Verified";
import DescriptionIcon from "@mui/icons-material/Description";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import UndoIcon from '@mui/icons-material/Undo';
import Main from "../../components/Main";
import { Box, Modal, Button, Typography } from "@mui/material";

function QMILayout() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const isQMIEntriesActive = window.location.pathname.startsWith(
    "/QuarterMasterIssue/QMIEntries"
  );

  const navItems = [
    {
      label: "Dashboard",
      path: "/QuarterMasterIssue/QMIDashboard",
      icon: <DashboardIcon className="icon" />,
    },
    {
      label: "QM Stock Entry",
      path: "#", // Prevents navigation
      icon: <AssignmentTurnedInIcon className="icon" />,
      isActive: showModal || isQMIEntriesActive, // ✅ Highlight if modal is open OR on any QMIEntries sub-route
    },
    {
      label: "Verification Status",
      path: "/QuarterMasterIssue/QMIVerificationStatus",
      icon: <VerifiedIcon className="icon" />, // Optional: add MUI VerifiedIcon
    },
    {
      label: "Manage Requests",
      path: "/QuarterMasterIssue/QMIManageRequest",
      icon: <PendingActionsIcon className="icon" />,
    },
    {
      label: "Stock Issue Form",
      path: "/QuarterMasterIssue/QMIStockIssueForm",
      icon: <DescriptionIcon className="icon" />,
    },
    {
      label: "Temporary Issue Form",
      path: "/QuarterMasterIssue/QMITempIssueForm",
      icon: <DescriptionIcon className="icon" />,
    },
    {
      label: "Temporary Issue Return",
      path: "/QuarterMasterIssue/QMITempIssueReturn",
      icon: <UndoIcon className="icon" />,
    },
  ];

  const handleNavItemClick = (item) => {
    if (item.path === "#") {
      // Show modal instead of navigating
      setShowModal(true);
    } else {
      navigate(item.path);
    }
  };

  const handleOptionClick = (path) => {
    setShowModal(false);
    navigate(path);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "58.5%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    width: "400px",
    minWidth: 300,
    zIndex: 1300,
  };

  return (
    <div className="container">
      <Sidebar navItems={navItems} onNavItemClick={handleNavItemClick} />

      <Main>
        <Outlet />
      </Main>

      {/* Modal Dialog */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>
            Choose Entry Type
          </Typography>

          {/* Wrapper Box with gap */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() =>
                handleOptionClick(
                  "/QuarterMasterIssue/QMIEntries/QMIPurchasedStock"
                )
              }
              className="modal-button purchased-button"
            >
              Purchased Stock Details Entry
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() =>
                handleOptionClick(
                  "/QuarterMasterIssue/QMIEntries/QMIDirectStock"
                )
              }
              className="modal-button direct-button"
            >
              Direct Issued Stock Details Entry
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default QMILayout;
