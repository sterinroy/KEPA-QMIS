// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Ensure this is imported
import AdminDashboard from "./pages/AdminDashboard";
import QuarterMasterPurchase from "./pages/QuarterMaster/QuarterMasterPurchase";
import QuarterMasterIssue from "./pages/QuarterMaster/QuarterMasterIssue";
import QuarterMasterACQM from "./pages/QuarterMaster/QuarterMasterACQM";
import UserDashboard from "./pages/User/UserDashboard";
import SendRequest from "./pages/User/SendRequest";
import ManageRequest from "./pages/User/ManageRequest";
import Return from "./pages/User/Return";
import Temp from "./pages/User/Temp";
import Review from "./pages/User/Review";
import SuperAdminDashboard from "./pages/SuperAdmin/SuperAdminDashboard";
import SuperAdminApprovals from "./pages/SuperAdmin/SuperAdminApprovals";
import SuperAdminUsers from "./pages/SuperAdmin/SuperAdminUsers";
import SuperAdminLogs from "./pages/SuperAdmin/SuperAdminLogs";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/SuperAdmin/Layout";
import UserLayout from "./pages/User/UserLayout";

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
              <UserLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SendRequest"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <UserLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Return"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <Return />
            </ProtectedRoute>
          }
        />
        <Route
          path="/review"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <Review />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SuperAdminDashboard"
          element={
            <ProtectedRoute allowedRoles={["SuperAdmin"]}>
              <Layout />
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
