import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import QMIDashboard from "./QMIDashboard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import Main from "../../components/Main";
import QMIManageRequest from "./QMIManageRequest";
import UserTemp from "../User/UserTemp";
import { Send } from "@mui/icons-material";
import QMIReturn from "./QMIReturn";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import QMStockEntry from "./QMStockEntry"
import DescriptionIcon from "@mui/icons-material/Description";
import StockItemView from "../StockView";


function QMILayout() {
  const [setActiveComponent] = useState(<QMIDashboard />);

  const navItems = [
    {
      label: "Dashboard",
      path: "/QuarterMasterIssue/QMIDashboard",
      icon: <DashboardIcon className="icon" />,
      component: <QMIDashboard />,
    },
    {
      label: "Stock Entry Forms",
      path: "/QuarterMasterIssue/QMStockEntry",
      matchPaths: [
        "/QuarterMasterIssue/QMStockEntry",
        "/QuarterMasterIssue/QMIDirectForm",
        "/QuarterMasterIssue/QMIPurchase",
        "/QuarterMasterIssue/QMIStockEntryForm"
      ],
      icon: <DashboardIcon className="icon" />,
      component: <QMStockEntry />,
    },
    {
      label: "Manage Requests",
      path: "/QuarterMasterIssue/QMIManageRequests",
      matchPaths: [
        "/QuarterMasterIssue/QMIManageRequests",
        "/QuarterMasterIssue/QMIManageApproval",
        "/QuarterMasterIssue/QMIManageUsers"
      ],
      icon: <PendingActionsIcon className="icon" />,
      component: <QMIManageRequest />,
    },
    {
      label: "Temporary Issue Form",
      path: "/QuarterMasterIssue/UserTemp",
      icon: <Send className="icon" />,
      component: <UserTemp />,
    },
    {
      label: "Stock Returns",
      path: "/QuarterMasterIssue/QMIReturn",
      matchPaths: [
        "/QuarterMasterIssue/QMIReturn",
        "/QuarterMasterIssue/QMIReturnT",
        "/QuarterMasterIssue/QMIReturnP"
      ],
      icon: <AssignmentReturnIcon className="icon" />,
      component: <QMIReturn />,
    },
    {
      label: "Stock Items",
      path:"/QuarterMasterIssue/StockItemView",
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

export default QMILayout;
