// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Ensure this is imported
import QuarterMasterACQM from "./pages/QuarterMaster/QuarterMasterACQM";
import UserDashboard from "./pages/UserDashboard";
import SuperAdminDashboard from "./pages/SuperAdmin/SuperAdminDashboard";
import SuperAdminApprovals from "./pages/SuperAdmin/SuperAdminApprovals";
import SuperAdminUsers from "./pages/SuperAdmin/SuperAdminUsers";
import SuperAdminLogs from "./pages/SuperAdmin/SuperAdminLogs";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/SuperAdmin/Layout";
import StockItemView from "./pages/StockView";
import QMPDashboard from "./pages/QuarterMasterPurchase/QMPDashboard";
import QMPLayout from "./pages/QuarterMasterPurchase/QMPLayout";
import QMPOrder from "./pages/QuarterMasterPurchase/QMPOrder";
import QMILayout from "./pages/QuarterMasterIssue/QMILayout";
import QMIEntries from "./pages/QuarterMasterIssue/QMIEntries";
import QMIDashboard from "./pages/QuarterMasterIssue/QMIDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminLayout from "./pages/AdminDashboard/AdminLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/StockItemView" element={<StockItemView />} />
        
        <Route 
          path="/Admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="AdminDashboard" element={<AdminDashboard />} />
          <Route path="StockItemView" element={<StockItemView />} />
        </Route>
        <Route
          path="/QuarterMasterPurchase"
          element={
            <ProtectedRoute allowedRoles={["QuarterMasterPurchase"]}>
              <QMPLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<QMPDashboard />} />
          <Route path="QMPDashboard" element={<QMPDashboard />} />
          <Route path="QMPOrder" element={<QMPOrder />} />
        </Route>
        <Route
          path="/QuarterMasterIssue"
          element={
            <ProtectedRoute allowedRoles={["QuarterMasterIssue"]}>
              <QMILayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<QMIDashboard />} />
          <Route path="QMIDashboard" element={<QMIDashboard />} />
          <Route path="QMIEntries" element={<QMIEntries />} />
        </Route>
        <Route
          path="/QuarterMasterACQM"
          element={
            <ProtectedRoute allowedRoles={["QuarterMasterACQM"]}>
              <QuarterMasterACQM />
            </ProtectedRoute>
          }
        />
        <Route
          path="/UserDashboard"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SuperAdmin"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SuperAdminDashboard />} />
          <Route path="SuperAdminDashboard" element={<SuperAdminDashboard />} />
          <Route path="SuperAdminApprovals" element={<SuperAdminApprovals />} />
          <Route path="SuperAdminUsers" element={<SuperAdminUsers />} />
          <Route path="SuperAdminLogs" element={<SuperAdminLogs />} />
          <Route path="StockItemView" element={<StockItemView />} /> 
        </Route>
        <Route path="/unauthorized" element={<h1>403 - Unauthorized</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
