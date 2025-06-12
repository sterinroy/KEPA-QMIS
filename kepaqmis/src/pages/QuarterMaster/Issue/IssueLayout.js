import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import ReturnRequest from "./ReturnRequest";
import DirectIssueForm from "./DirectIssueForm";
import IssueDashboard from "./IssueDashboard";
import RequestedIssueForm from "./RequestedIssueForm";
import StockDetails from "./StockDetails";
import TempIssueForm from "./TempIssueForm";
import Temphistory from "./Temphistory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import DescriptionIcon from "@mui/icons-material/Description";
import HistoryIcon from "@mui/icons-material/History";
import Main from "../../../components/Main";

function IssueLayout() {
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState(<IssueDashboard />);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    {
      label: "Dashboard",
      path: "/IssueDashboard",
      icon: <DashboardIcon className="icon" />,
      component: <IssueDashboard />,
    },
    {
      label: "Direct Issue Form",
      path: "/directissueform",
      icon: <AssignmentTurnedInIcon className="icon" />,
      component: <DirectIssueForm />,
    },
        {
      label: "Requested Issue Form",
      path: "/issue-request",
      icon: <AssignmentTurnedInIcon className="icon" />,
      component: <RequestedIssueForm />,
    },
    {
      label: "Stock Details",
      path: "/stock",
      icon: <Inventory2Icon className="icon" />,
      component: <StockDetails />,
    },
    {
      label: "Temporary Issue Form",
      path: "/tempissueform",
      icon: <DescriptionIcon className="icon" />,
      component: <TempIssueForm />,
    },
    {
      label: "Temporary Issue History",
      path: "/temphistory",
      icon: <HistoryIcon className="icon" />,
      component: <Temphistory />,
    },
    {
      label: "Return Request",
      path: "/return-request",
      icon: <AssignmentReturnIcon className="icon" />,
      component: <ReturnRequest />,
    },
  ];
  const handleNavItemClick = (component) => {
    setActiveComponent(component);
  };
  return (
    <div className="container">
      <Sidebar navItems={navItems} onNavItemClick={handleNavItemClick} />

      <Main>{activeComponent}</Main>
    </div>
  );
}

export default IssueLayout;
