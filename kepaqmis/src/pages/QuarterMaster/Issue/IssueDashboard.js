// IssueDashboard.js
import React from "react";
import { useLocation } from "react-router-dom"; // ✅ import this
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import IssueForm from "./RequestedIssueForm";

const SIDEBAR_WIDTH = 240;

const IssueDashboard = () => {
  const location = useLocation(); // ✅ get current path
  const currentPath = location.pathname;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar activeItem={currentPath} /> {/* ✅ pass the path */}
      <div style={{ flexGrow: 1, marginLeft: SIDEBAR_WIDTH }}>
        <Topbar />
        <main
          style={{
            padding: "80px 20px 20px",
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <IssueForm />
        </main>
      </div>
    </div>
  );
};

export default IssueDashboard;
