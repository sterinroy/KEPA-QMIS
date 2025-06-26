import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Register from "./pages/Register";
import QuarterMasterACQM from "./pages/QuarterMaster/QuarterMasterACQM";
import SuperAdminDashboard from "./pages/SuperAdmin/SuperAdminDashboard";
import SuperAdminApprovals from "./pages/SuperAdmin/SuperAdminApprovals";
import SuperAdminUsers from "./pages/SuperAdmin/SuperAdminUsers";
import SuperAdminLogs from "./pages/SuperAdmin/SuperAdminLogs";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/SuperAdmin/Layout";
import StockItemView from "./pages/StockView";
import QMPDashboard from "./pages/QuarterMasterPurchase/QMPDashboard";
import QMPLayout from "./pages/QuarterMasterPurchase/QMPLayout";
import QMPOrder from "./pages/QuarterMasterPurchase/QMPOrder/QMPOrder.js";
import QMILayout from "./pages/QuarterMasterIssue/QMILayout";
import QMIEntries from "./pages/QuarterMasterIssue/QMIEntries";
import QMIManageRequest from "./pages/QuarterMasterIssue/QMIManageRequest/QMIManageRequest";
import QMIDashboard from "./pages/QuarterMasterIssue/QMIDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminLayout from "./pages/AdminDashboard/AdminLayout";
import QMPEntries from "./pages/QuarterMasterPurchase/QMPEntries";
import QMIDirectForm from "./pages/QuarterMasterIssue/QMIDirectForm";
import UserLayout from "./pages/User/UserLayout";
import UserDashboard from "./pages/User/UserDashboard";
import UserIndent from "./pages/User/UserIndent";
import UserManageRequest from "./pages/User/UserManageRequest";
import UserReturn from "./pages/User/UserReturn";
import UserTemp from "./pages/User/UserTemp";
import Indent from "./components/Indent";
import LARSPrint from "./components/LARSPrint";
import Proceedings from "./components/proceedings.js";
import SAEdit from "./pages/SuperAdmin/SAEdit.js";
import SACategories from "./pages/SuperAdmin/SACategories.js";
import SAOffices from "./pages/SuperAdmin/SAOffices.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/StockItemView" element={<StockItemView />} />
        <Route path="/Indent" element={<Indent />} />
        <Route path="/lars-print" element={<LARSPrint />} />
        <Route path="/proceedings" element={<Proceedings />} />

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
          <Route path="QMPEntries" element={<QMPEntries />} />
          <Route path="StockItemView" element={<StockItemView />} />
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
          <Route path="QMIDirectForm" element={<QMIDirectForm />} />
          <Route path="QMIManageRequest" element={<QMIManageRequest />} />
          <Route path="UserTemp" element={<UserTemp />} />
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
          path="/User"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="UserDashboard" element={<UserDashboard />} />
          <Route path="UserIndent" element={<UserIndent />} />
          <Route path="UserManageRequest" element={<UserManageRequest />} />
          <Route path="UserReturn" element={<UserReturn />} />
          <Route path="UserTemp" element={<UserTemp />} />
        </Route>

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
          <Route path="SAEdit" element={<SAEdit />} />
          <Route path="SACategories" element={<SACategories />} />
          <Route path="SAOffices" element={<SAOffices />} />
        </Route>
        <Route path="/unauthorized" element={<h1>403 - Unauthorized</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
