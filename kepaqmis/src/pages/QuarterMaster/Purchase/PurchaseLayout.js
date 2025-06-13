import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import Main from "../../../components/Main";
import PurchaseDashboard from "./PurchaseDashboard"; 
import PurchaseForm from "./PurchaseForm";
import PurchaseTransfer from "./PurchaseTransfer";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Inventory2Icon from "@mui/icons-material/Inventory2";

function QuarterLayout() {
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState(
    <PurchaseDashboard />
  );
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
      path: "/PurchaseDashboard",
      icon: <DashboardIcon className="icon" />,
      component: <PurchaseDashboard />,
    },
       {
      label: "Purchase-Form",
      path: "/purchase-form",
      icon: <AssignmentTurnedInIcon className="icon" />,
      component: <PurchaseForm />,
    },
           {
      label: "Purchase-Stock-History",
      path: "/purchased-stock-history",
      icon: <Inventory2Icon className="icon" />,
      component: <PurchaseTransfer />,
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

export default QuarterLayout;
