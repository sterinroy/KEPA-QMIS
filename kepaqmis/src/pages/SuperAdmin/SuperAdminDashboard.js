// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// import DashboardIcon from "@mui/icons-material/Dashboard";
// import DescriptionIcon from "@mui/icons-material/Description";
// import GroupIcon from "@mui/icons-material/Group";
// import Login from "../Login";
// import Sidebar from "../SuperAdmin/Sidebar";
// import SuperAdminUsers from "./SuperAdminUsers";
// import SuperAdminApprovals from "./SuperAdminApprovals";
// import SuperAdminLogs from "./SuperAdminLogs";
// import HistoryIcon from "@mui/icons-material/History";
// import Main from "./Main";

// const SuperAdminDashboard = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const profileRef = useRef(null);
//   const [isLoggedOut, setIsLoggedOut] = useState(false);
//   const navigate = useNavigate();
//   const [activeComponent, setActiveComponent] = useState(
//     <div>Dashboard Content</div>
//   );

//   const toggleDropdown = () => setShowDropdown((prev) => !prev);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       await fetch("/api/auth/logout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       alert("Logout logged successfully");
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }

//     localStorage.clear();
//     setShowDropdown(false);
//     setIsLoggedOut(true);
//     navigate("/login");
//   };
//   if (isLoggedOut) {
//     return <Login />;
//   }
//   const navItems = [
//     {
//       label: "Dashboard",
//       path: "/SuperAdminDashboard",
//       icon: <DashboardIcon className="icon" />,
//       component: <div>Dashboard Content</div>,
//     },
//     {
//       label: "Approve Registrations",
//       path: "/SuperAdminApprovals",
//       icon: <DescriptionIcon className="icon" />,
//       component: <SuperAdminApprovals />,
//     },
//     {
//       label: "Manage Users",
//       path: "/SuperAdminUsers",
//       icon: <GroupIcon className="icon" />,
//       component: <SuperAdminUsers />,
//     },
//     {
//       label: "Logs",
//       path: "/SuperAdminLogs",
//       icon: <HistoryIcon className="icon" />,
//       component: <SuperAdminLogs />,
//     },
//   ];

//   const handleNavItemClick = (component) => {
//     setActiveComponent(component);
//   };

//   return (
//     <div className="container">
//       <Sidebar navItems={navItems} onNavItemClick={handleNavItemClick} />
//       <Main>{activeComponent}</Main>
//     </div>
//   );
// };

// export default SuperAdminDashboard;

import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Dashboard = () => {
  return (
    <div>
      <h1>Hi everyone</h1>
      <p>
        Welcome to the SuperAdmin Dashboard! Here you can manage users, approve
        registrations, and view logs. Feel free to explore the different
        sections.
      </p>
    </div>
  );
};

export default Dashboard;
