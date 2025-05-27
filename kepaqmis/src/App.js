import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import AdminDashboard from "./pages/AdminDashboard";
import QuarterMaster from "./pages/QuarterMaster";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AdminDashboard" element={
          <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        <Route path="/QuarterMaster" element={
          <ProtectedRoute allowedRoles={['QuarterMaster']}>
            <QuarterMaster />
          </ProtectedRoute>
        } />
       <Route path="/UserDashboard" element={
         <ProtectedRoute allowedRoles={['User']}>
           <UserDashboard />
         </ProtectedRoute>
        } />
        <Route path="/SuperAdminDashboard" element={
          <ProtectedRoute allowedRoles={['SuperAdmin']}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/unauthorized" element={<h1>403 - Unauthorized</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
