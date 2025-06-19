import React, { useState} from "react";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import QMADashboard from "./QMADashboard";
// import QMPOrder from "./QMPOrder";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Main from "../../components/Main";
// import QMPEntries from "./QMPEntries";
import QMAPurchase from "./QMAPurchase"
import QMACategories from "./QMACategories"
import AddIcon from '@mui/icons-material/Add';
import QMAPurchaseOverview from "./QMAPurchaseOverview";
import QMAIssueOverview from "./QMAIssueOverview";
function QMALayout() {
  const [setActiveComponent] = useState(<QMADashboard />);

  const navItems = [
    {
      label: "Dashboard",
      path: "/QuarterMasterACQM/QMADashboard",
      icon: <DashboardIcon className="icon" />,
      component: <QMADashboard />,
    },
    //     {
    //   label: "PurchaseEntries",
    //   path: "/QuarterMasterACQM/QMAPurchase",
    //   icon: <LocalShippingIcon className="icon" />,
    //   component: <QMAPurchase />,
    // },
            {
      label: "Categories",
      path: "/QuarterMasterACQM/QMACategories",
      icon: <AddIcon className="icon" />,
      component: <QMACategories/>,
    },
    {
      label: "Purchase",
      path: "/QuarterMasterACQM/QMAPurchaseOverview",
      icon: <LocalShippingIcon className="icon" />,
      component: <QMAPurchaseOverview />,
    },
        {
      label: "Issue",
      path: "/QuarterMasterACQM/QMAIssueOverview",
      icon: <LocalShippingIcon className="icon" />,
      component: <QMAIssueOverview />,
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

export default QMALayout;
