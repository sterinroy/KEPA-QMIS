import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate, Outlet } from "react-router-dom";
import QMIDashboard from "./QMIDashboard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Main from "../../components/Main";
import QMIEntries from "./QMIEntries";

function QMILayout() {
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState(<QMIDashboard />);
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
      path: "/QuarterMasterIssue/QMIDashboard",
      icon: <DashboardIcon className="icon" />,
      component: <QMIDashboard />,
    },
    {
      label: "Entries",
      path: "/QuarterMasterIssue/QMIEntries",
      icon: <DashboardIcon className="icon" />,
      component: <QMIEntries />,
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

export default QMILayout;
