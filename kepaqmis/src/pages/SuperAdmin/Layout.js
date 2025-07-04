import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import SuperAdminUsers from "./SuperAdminUsers";
import SuperAdminApprovals from "./SuperAdminApprovals";
import SuperAdminLogs from "./SuperAdminLogs";
import SuperAdminDashboard from "./SuperAdminDashboard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import Main from "../../components/Main";
import StockItemView from "../StockView";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import SAEdit from "./SAEdit.js";


function Layout() {
  const [setActiveComponent] = useState(
    <SuperAdminDashboard />
  );

  const navItems = [
    {
      label: "Dashboard",
      path: "/SuperAdmin/SuperAdminDashboard",
      icon: <DashboardIcon className="icon" />,
      component: <SuperAdminDashboard />,
    },
    {
      label: "Approve Registrations",
      path: "/SuperAdmin/SuperAdminApprovals",
      icon: <DescriptionIcon className="icon" />,
      component: <SuperAdminApprovals />,
    },
    {
      label: "Manage Users",
      path: "/SuperAdmin/SuperAdminUsers",
      icon: <GroupIcon className="icon" />,
      component: <SuperAdminUsers />,
    },
    {
      label: "Log Details",
      path: "/SuperAdmin/SuperAdminLogs",
      icon: <HistoryIcon className="icon" />,
      component: <SuperAdminLogs />,
    },
    {
      label: "Stock Items",
      path:"/SuperAdmin/StockItemView",
      icon: <DescriptionIcon className="icon" />,
      component: <StockItemView />,
    },
    {
      label: "Edit/Add",
      path:"/SuperAdmin/SAEdit",
      icon: <EditDocumentIcon className="icon" />,
      component: <SAEdit />,
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

export default Layout;
