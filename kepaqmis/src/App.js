import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import AdminDashboard from "./pages/AdminDashboard";
import QuarterMaster from "./pages/QuarterMaster";
import UserDashboard from "./pages/UserDashboard";
import PurchaseDashboard from "./pages/QM/Purchase"
import PurchaseTransfer from "./pages/QM/PurchaseTransfer"
import PurchaseStockDetailEntry from "./pages/QM/PurchaseStockdetailentry";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/QuarterMaster" element={<QuarterMaster />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/purchase" element={<PurchaseDashboard />} />
        <Route path="/purchasestockdetailentry" element={<PurchaseStockDetailEntry />} />
        <Route path="/purchasetransfer" element={<PurchaseTransfer />} />


      </Routes>
    </Router>
  );
}

export default App;
