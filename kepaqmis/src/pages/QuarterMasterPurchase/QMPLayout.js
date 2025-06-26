import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import QMPDashboard from "./QMPDashboard";
import QMPOrder from "./QMPOrder/QMPOrder";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Main from "../../components/Main";
import QMPEntries from "./QMPEntries";
import StockItemView from "../StockView";

function QMPLayout() {
  const [setActiveComponent] = useState(<QMPDashboard />);

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
    {
      label: "Entries",
      path: "/QuarterMasterPurchase/QMPEntries",
      icon: <LocalShippingIcon className="icon" />,
      component: <QMPEntries />,
    },
    {
      label: "Stock Items",
      path:"/QuarterMasterPurchase/StockItemView",
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

export default QMPLayout;
