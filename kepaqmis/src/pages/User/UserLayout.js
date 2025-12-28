import React, { useState} from "react";
import Sidebar from "../../components/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import Main from "../../components/Main";
import UserDashboard from "./UserDashboard";
import UserIndent from "./UserIndent";
import UserManageRequest from "./UserManageRequest";
import UserTemp from "./UserTemp";
import UserReturn from "./UserReturn";
import { Send } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import UserStockView from "./UserStockView";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';


function UserLayout() {
  const [setActiveComponent] = useState(
    <UserDashboard />
  );

  const navItems = [
    {
      label: "Dashboard",
      path: "/User/UserDashboard",
      icon: <DashboardIcon className="icon" />,
      component: <UserDashboard />,
    },
    {
      label: "Indent Generation",
      path: "/User/UserIndent",
      icon: <DescriptionIcon className="icon" />,
      component: <UserIndent/>,
    },
    {
      label: "Manage Requests",
      path: "/User/UserManageRequest",
      icon: <GroupIcon className="icon" />,
      component: <UserManageRequest />,
    },
    {
      label: "Temporary Stock Request Form",
      path: "/User/UserTemp",
      icon: <Send className="icon" />,
      component: <UserTemp />,
    },
    {
      label: "Stock Return Form",
      path: "/User/UserReturn",
      icon: <HistoryIcon className="icon" />,
      component: <UserReturn />,
    },
    {
      label: "My Allocated Stock",
      path: "/User/UserStockView",
      icon: <ShoppingCartCheckoutIcon className="icon" />,
      component: <UserStockView />,
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

export default UserLayout;