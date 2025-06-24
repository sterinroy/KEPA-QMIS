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
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import VerifiedIcon from "@mui/icons-material/Verified";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import UndoIcon from '@mui/icons-material/Undo';
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
    // {
    //   label: "Purchase",
    //   path: "/QuarterMasterACQM/QMAPurchaseOverview",
    //   icon: <LocalShippingIcon className="icon" />,
    //   component: <QMAPurchaseOverview />,
    // },
    //     {
    //   label: "Issue",
    //   path: "/QuarterMasterACQM/QMAIssueOverview",
    //   icon: <LocalShippingIcon className="icon" />,
    //   component: <QMAIssueOverview />,
    // },
    {
      label:"QM Stock Entry",
      path:"#",
      icon:<AssignmentTurnedInIcon className="icon" />,
    },
        {
      label: "Verification Status",
      path: "/QuarterMasterACQM/QMIVerificationStatus",
      icon: <VerifiedIcon className="icon" />, // Optional: add MUI VerifiedIcon
    },
    {
      label: "Stock Issue Form",
      path: "/QuarterMasterACQM/QMIStockIssueForm",
      icon: <DescriptionIcon className="icon" />,
    },
    {
      label: "Temporary Issue Form",
      path: "/QuarterMasterACQM/QMITempIssueForm",
      icon: <DescriptionIcon className="icon" />,
    },
    {
      label: "Temporary Issue Return",
      path: "/QuarterMasterACQM/QMITempIssueReturn",
      icon: <UndoIcon className="icon" />,
    },
    {
      label:"Stocks",
      path:"/QuarterMasterACQM/StockItemView",
      icon:<AccountBalanceIcon className="icon"/>,

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
