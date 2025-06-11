import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
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

//Issue
import Tempstockdetailentry from "./pages/QuarterMaster/Temp/Tempstockdetailentry";
import Temp from "./pages/QuarterMaster/Temp/Temp";
import Review from "./pages/QuarterMaster/Temp/Review";
import Tempissued from "./pages/QuarterMaster/Temp/Tempissued";
// Purchase Module
import PurchaseDashboard from "./pages/QuarterMaster/Purchase/Purchase";
import PurchaseTransfer from "./pages/QuarterMaster/Purchase/PurchaseTransfer";
import PurchaseForm from "./pages/QuarterMaster/Purchase/PurchaseForm"; // ← Now valid
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Purchase Routes */}
        <Route path="/purchase" element={<PurchaseDashboard />} />
        <Route path="/purchase-form" element={<PurchaseForm />} />
        <Route path="/purchased-stock-history" element={<PurchaseTransfer />} />
        {/* Temp Routes */}
        <Route path="/temp" element={<Temp />} />
        <Route path="/tempstockdetailentry" element={<Tempstockdetailentry />} />
        <Route path="/review" element={<Review />} />
        <Route path="/tempissued" element={<Tempissued />} />

        {/* Protected Routes - Admin */}
        <Route
          path="/AdminDashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - QuarterMasterPurchase */}
        <Route
          path="/QuarterMasterPurchase"
          element={
            <ProtectedRoute allowedRoles={["QuarterMasterPurchase"]}>
              <QuarterMasterPurchase />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - QuarterMasterIssue */}
        <Route
          path="/QuarterMasterIssue"
          element={
            <ProtectedRoute allowedRoles={["QuarterMasterIssue"]}>
              <QuarterMasterIssue />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - QuarterMasterACQM */}
        <Route
          path="/QuarterMasterACQM"
          element={
            <ProtectedRoute allowedRoles={["QuarterMasterACQM"]}>
              <QuarterMasterACQM />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - User */}
        <Route
          path="/UserDashboard"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes - SuperAdmin */}
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

        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<h1>403 - Unauthorized</h1>} />
      </Routes>
    </Router>
  );
}

export default App;