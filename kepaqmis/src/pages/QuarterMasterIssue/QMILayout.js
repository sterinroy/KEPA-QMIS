import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import {  Outlet } from "react-router-dom";
import QMIDashboard from "./QMIDashboard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Main from "../../components/Main";
import QMIEntries from "./QMIEntries";
import QMIDirectForm from "./QMIDirectForm";

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
      label: "Entries",
      path: "/QuarterMasterIssue/QMIEntries",
      icon: <DashboardIcon className="icon" />,
      component: <QMIEntries />,
    },
    {
      label: "Direct Issue",
      path: "/QuarterMasterIssue/QMIDirectForm",
      icon: <DashboardIcon className="icon" />,
      component: <QMIDirectForm />,
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
