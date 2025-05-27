import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import Purchase from "./pages/QM/Purchase";
import PurchaseStockDetailEntry from "./pages/QM/PurchaseStockdetailentry";
import PurchaseTransfer from "./pages/QM/PurchaseTransfer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/purchase" element={<Purchase/>}/>
        <Route path="/purchasestockdetailentry" element={<PurchaseStockDetailEntry/>}/>
        <Route path="/purchasetransfer" element={<PurchaseTransfer/>}/>
      </Routes>
    </Router>
  );
}

export default App;
