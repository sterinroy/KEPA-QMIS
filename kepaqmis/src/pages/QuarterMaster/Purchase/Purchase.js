
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Purchase.css';
import Sidebar from '../../../components/Sidebar';
import Topbar from '../../../components/Topbar';
import { fetchPurchases } from '../../../redux/actions/purchaseActions';
import { useDispatch } from 'react-redux';

const PurchaseDashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const navigate = useNavigate();

  const [pen, setPen] = useState('');
  const [role, setRole] = useState('');
  // const [showDropdown, setShowDropdown] = useState(false);

  // const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    dispatch(fetchPurchases());

    const passedPen = location.state?.pen;
    const passedRole = location.state?.role;

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
  }, [dispatch, location.state]);

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

