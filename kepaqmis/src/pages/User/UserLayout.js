import React, { useState} from "react";
import Sidebar from "../../components/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import Main from "../../components/Main";
import UserDashboard from "./UserDashboard";
import SendRequest from "./UserIndent";
import ManageRequest from "./UserManageRequest";
import Temp from "./UserTemp";
import Return from "./UserReturn";
import { Send } from "@mui/icons-material";
import { Outlet } from "react-router-dom";


function UserLayout() {
  const [activeComponent, setActiveComponent] = useState(
    <UserDashboard />
  );

  const navItems = [
    {
      label: "Dashboard",
      path: "/UserDashboard",
      icon: <DashboardIcon className="icon" />,
      component: <UserDashboard />,
    },
    {
      label: "Indent Generation",
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
      icon: <HistoryIcon className="icon" />,
      component: <Return />,
    }


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