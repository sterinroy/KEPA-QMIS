import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Purchase.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Login from '../../Login';

const PurchaseDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [pen, setPen] = useState('');
  const [role, setRole] = useState('');
  const [isLoggedout, setIsLogout] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const passedPen = location.state?.pen;
    const passedRole = location.state?.role;

    // Check if user is authenticated by looking at localStorage or some session logic
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    if (passedPen) {
      setPen(passedPen);
      localStorage.setItem('pen', passedPen); // optional: persist
    } else {
      const storedPen = localStorage.getItem('pen') || 'NA';
      setPen(storedPen);
    }

    if (passedRole) {
      setRole(passedRole);
      localStorage.setItem('role', passedRole); // optional: persist
    } else {
      const storedRole = localStorage.getItem('role') || 'NA';
      setRole(storedRole);
    }
  }, [location.state, navigate]);

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
        <Topbar pen={pen} role={role} />
      </main>
    </div>
  );
};

export default PurchaseDashboard;