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
      label: "Direct Issue",
      path: "/QuarterMasterIssue/QMStockEntry",
      icon: <DashboardIcon className="icon" />,
      component: <QMStockEntry />,
    },
    {
      label: "Manage Requests",
      path: "/QuarterMasterIssue/QMIManageRequest",
      icon: <PendingActionsIcon className="icon" />,
      component: <QMIManageRequest />,
    },
    {
      label: "Temporary Stock",
      path: "/QuarterMasterIssue/UserTemp",
      icon: <Send className="icon" />,
      component: <UserTemp />,
    },
    {
      label: "Return Stock",
      path: "/QuarterMasterIssue/QMIReturn",
      icon: <AssignmentReturnIcon className="icon" />,
      component: <QMIReturn />,
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
