// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Register from "./pages/Register";
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

import Sidebar from "./pages/QuarterMaster/Issue/Sidebar";
import Topbar from "./pages/QuarterMaster/Issue/Topbar";

import Tempstockdetailentry from "./pages/QuarterMaster/Issue/Tempstockdetailentry";
import Review from "./pages/QuarterMaster/Issue/Review";
import Tempissued from "./pages/QuarterMaster/Issue/Tempissued";
import MainDashboard from './pages/QuarterMaster/Issue/MainDashboard';
import IssueDashboard from './pages/QuarterMaster/Issue/IssueDashboard';
import StockDetails from './pages/QuarterMaster/Issue/StockDetails';
import ReturnRequest from './pages/QuarterMaster/Issue/ReturnRequest';
import Qouta from './pages/QuarterMaster/Issue/Qouta';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/tempstockdetailentry" element={<Tempstockdetailentry />} />
        <Route path="/review" element={<Review />} />
        <Route path="/tempissued" element={<Tempissued />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/issue-request" element={<IssueDashboard />} />
        <Route path="/stock" element={<StockDetails />} />
        <Route path="/return-request" element={<ReturnRequest />} />
        <Route path="/qouta" element={<Qouta />} />

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
