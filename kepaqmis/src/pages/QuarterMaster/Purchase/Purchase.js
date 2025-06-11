
import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './Purchase.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { fetchPurchases } from '../../../redux/actions/purchaseActions';
import { useDispatch,useSelector } from 'react-redux';
import Login from '../../Login';

const PurchaseDashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [pen, setPen] = useState('');
  const [role, setRole] = useState('');
  const [isLoggedout,setIsLogout] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(fetchPurchases());

    const passedPen = location.state?.pen;
    const passedRole = location.state?.role;

    if (!auth.isAuthenticated) {
  navigate("/login");
}

    if (passedPen) {
      setPen(passedPen);
      localStorage.setItem('pen', passedPen); // optional
    } else {
      const storedPen = localStorage.getItem('pen') || 'NA';
      setPen(storedPen);
    }

    if (passedRole) {
      setRole(passedRole);
      localStorage.setItem('role', passedRole); // optional
    } else {
      const storedRole = localStorage.getItem('role') || 'NA';
      setRole(storedRole);
    }
  }, [dispatch, location.state,auth]);

  
const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Logout logged successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }

    localStorage.clear();
    setShowDropdown(false);
    setIsLogout(true);
    navigate("/login");
  };
  if (isLoggedout) {
    return <Login />; // Redirect to Login component if logged out
  }




  return (
    <div className="container">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <main className="main">
        {<Topbar pen={pen} role={role} />}
      </main>
    </div>
  );
};

export default PurchaseDashboard;

