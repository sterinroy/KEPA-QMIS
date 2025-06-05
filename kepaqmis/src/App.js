import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SendRequest from "./pages/SendRequest";
import ManageRequest from "./pages/ManageRequest";
import Temp from "./pages/Temp";
import AdminDashboard from "./pages/AdminDashboard";
import QuarterMasterPurchase from "./pages/QuarterMaster/QuarterMasterPurchase";
import QuarterMasterIssue from "./pages/QuarterMaster/QuarterMasterIssue";
import QuarterMasterACQM from "./pages/QuarterMaster/QuarterMasterACQM";
import UserDashboard from "./pages/UserDashboard";
import SuperAdminDashboard from "./pages/SuperAdmin/SuperAdminDashboard";
import SuperAdminApprovals from "./pages/SuperAdmin/SuperAdminApprovals";
import SuperAdminUsers from "./pages/SuperAdmin/SuperAdminUsers";
import SuperAdminLogs from "./pages/SuperAdmin/SuperAdminLogs";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/AdminDashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/QuarterMasterPurchase"
          element={
            <ProtectedRoute allowedRoles={["QuarterMasterPurchase"]}>
              <QuarterMasterPurchase />
            </ProtectedRoute>
          }
        />
        <Route
          path="/QuarterMasterIssue"
          element={
            <ProtectedRoute allowedRoles={["QuarterMasterIssue"]}>
              <QuarterMasterIssue />
            </ProtectedRoute>
          }
        />
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
          path="/SendRequest"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <SendRequest />
            </ProtectedRoute>
          }
  
        />
        <Route
          path="/ManageRequest"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <ManageRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Temp"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <Temp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SuperAdminDashboard"
          element={
            <ProtectedRoute allowedRoles={["SuperAdmin"]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SuperAdminApprovals"
          element={
            <ProtectedRoute allowedRoles={["SuperAdmin"]}>
              <SuperAdminApprovals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SuperAdminUsers"
          element={
            <ProtectedRoute allowedRoles={["SuperAdmin"]}>
              <SuperAdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SuperAdminLogs"
          element={
            <ProtectedRoute allowedRoles={["SuperAdmin"]}>
              <SuperAdminLogs />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<h1>403 - Unauthorized</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
