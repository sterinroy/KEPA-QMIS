
// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Purchase.css';
import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar'
import Topbar from '../../../components/Topbar';
import { fetchPurchases } from '../../../redux/actions/purchaseActions';
import { useDispatch, useSelector } from 'react-redux';

const PurchaseDashboard = () => {
  // const [penNumber, setPenNumber] = useState(false);
    const dispatch = useDispatch();
    const [penNumber, setPenNumber] = useState('');
     useEffect(() => {
        dispatch(fetchPurchases());
        const storedPen = localStorage.getItem('pen') || 'NA';
        setPenNumber(storedPen);
      }, [dispatch]);
  
  const [role, setRole] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className="container">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <main className="main">
        <Topbar penNumber={penNumber} role={role} />
      </main>
    </div>
  );
};

export default PurchaseDashboard;
