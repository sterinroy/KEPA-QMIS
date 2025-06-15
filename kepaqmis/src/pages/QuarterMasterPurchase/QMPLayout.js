import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate, Outlet } from "react-router-dom";
import QMPDashboard from "./QMPDashboard";
import QMPOrder from "./QMPOrder";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import Main from "../../components/Main";

function QMPLayout() {
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState(<QMPDashboard />);
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
      path: "/QuarterMasterPurchase/QMPDashboard",
      icon: <DashboardIcon className="icon" />,
      component: <QMPDashboard />,
    },
    {
      label: "Orders",
      path: "/QuarterMasterPurchase/QMPOrder",
      icon: <LocalShippingIcon className="icon" />,
      component: <QMPOrder />,
    },
  ];
  const handleNavItemClick = (component) => {
    setActiveComponent(component);
  };
  return (
    <div className="container">
      <Sidebar navItems={navItems} onNavItemClick={handleNavItemClick} />

      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default QMPLayout;
