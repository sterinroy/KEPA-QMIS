import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Main from "../../components/Main";
import StockItemView from "../StockView";
import DescriptionIcon from "@mui/icons-material/Description";
import AdminDashboard from "./AdminDashboard";


function AdminLayout() {
  const [ setActiveComponent] = useState(<AdminDashboard />);

  const navItems = [
    {
      label: "Dashboard",
      path: "/Admin/AdminDashboard",
      icon: <DashboardIcon className="icon" />,
      component: <AdminDashboard />,
    },
    {
      label: "Stock Items",
      path: "/Admin/StockItemView",
      icon: <DescriptionIcon className="icon" />,
      component: <StockItemView />,
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

export default AdminLayout;
