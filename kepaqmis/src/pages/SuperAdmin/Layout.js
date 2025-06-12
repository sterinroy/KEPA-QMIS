import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import SuperAdminUsers from "./SuperAdminUsers";
import SuperAdminApprovals from "./SuperAdminApprovals";
import SuperAdminLogs from "./SuperAdminLogs";
import SuperAdminDashboard from "./SuperAdminDashboard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import Main from "../../components/Main";

function Layout() {
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState(
    <SuperAdminDashboard />
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
      path: "/SuperAdminDashboard",
      icon: <DashboardIcon className="icon" />,
      component: <SuperAdminDashboard />,
    },
    {
      label: "Approve Registrations",
      path: "/SuperAdminApprovals",
      icon: <DescriptionIcon className="icon" />,
      component: <SuperAdminApprovals />,
    },
    {
      label: "Manage Users",
      path: "/SuperAdminUsers",
      icon: <GroupIcon className="icon" />,
      component: <SuperAdminUsers />,
    },
    {
      label: "Logs",
      path: "/SuperAdminLogs",
      icon: <HistoryIcon className="icon" />,
      component: <SuperAdminLogs />,
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

export default Layout;
