import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import Main from "../../components/Main";
import { Card, CardContent, Box, Typography, Grid } from "@mui/material";
import UserDashboard from "./UserDashboard";
import SendRequest from "./SendRequest";
import ManageRequest from "./ManageRequest";
import Temp from "./Temp";
import Return from "./Return";
import { Send } from "@mui/icons-material";





function UserLayout() {
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState(
    <UserDashboard />
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
      path: "/UserDashboard",
      icon: <DashboardIcon className="icon" />,
      component: <UserDashboard />,
    },
    {
      label: "Send Request",
      path: "/SendRequest",
      icon: <DescriptionIcon className="icon" />,
      component: <SendRequest />,
    },
    {
      label: "Manage Requests",
      path: "/ManageRequest",
      icon: <GroupIcon className="icon" />,
      component: <ManageRequest />,
    },
  
    {
      label: "Temporary Stock",
      path: "/Temp",
      icon: <Send className="icon" />,
      component: <Temp />,
    },

    {
      label: "Return",
      path: "/Return",
      icon: <Send className="icon" />,
      component: <Return />,
    }


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

export default UserLayout;