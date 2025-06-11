
// import React, { useState, useEffect } from 'react';
// import { useLocation,useNavigate } from 'react-router-dom';
// import './Purchase.css';
// import Sidebar from '../../../components/Sidebar';
// import Topbar from '../../../components/Topbar';
// import { fetchPurchases } from '../../../redux/actions/purchaseActions';
// import { useDispatch,useSelector } from 'react-redux';

// const PurchaseDashboard = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const [pen, setPen] = useState('');
//   const [role, setRole] = useState('');
//   const navigate = useNavigate();
//   const auth = useSelector((state) => state.auth);
//   useEffect(() => {
//     dispatch(fetchPurchases());

//     const passedPen = location.state?.pen;
//     const passedRole = location.state?.role;

//     if (!auth.isAuthenticated) {
//   navigate("/login");
// }

//     if (passedPen) {
//       setPen(passedPen);
//       localStorage.setItem('pen', passedPen); // optional
//     } else {
//       const storedPen = localStorage.getItem('pen') || 'NA';
//       setPen(storedPen);
//     }

//     if (passedRole) {
//       setRole(passedRole);
//       localStorage.setItem('role', passedRole); // optional
//     } else {
//       const storedRole = localStorage.getItem('role') || 'NA';
//       setRole(storedRole);
//     }
//   }, [dispatch, location.state,auth]);

  




  
//   return (
//     <div className="container">
//       {/* Sidebar Component */}
//       <Sidebar />

//       {/* Main Content */}
//       <main className="main">
//         <Topbar pen={pen} role={role} />
//       </main>
//     </div>
//   );
// };

// export default PurchaseDashboard;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Purchase.css';
import Sidebar from '../../../components/Sidebar';
import Topbar from '../../../components/Topbar';
import { fetchPurchases } from '../../../redux/actions/purchaseActions';
import { useDispatch, useSelector } from 'react-redux';

const PurchaseDashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [pen, setPen] = useState('');
  const [role, setRole] = useState('');
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!auth.isAuthenticated) {
      navigate('/login');
      return;
    }

    setShouldRender(true); // ✅ only set true if authenticated

    dispatch(fetchPurchases());

    const passedPen = location.state?.pen;
    const passedRole = location.state?.role;

    if (passedPen) {
      setPen(passedPen);
      localStorage.setItem('pen', passedPen);
    } else {
      setPen(localStorage.getItem('pen') || 'NA');
    }

    if (passedRole) {
      setRole(passedRole);
      localStorage.setItem('role', passedRole);
    } else {
      setRole(localStorage.getItem('role') || 'NA');
    }
  }, [auth.isAuthenticated, dispatch, location.state, navigate]);

  if (!shouldRender) return null; // ⛔ Don't render the page content if not ready

  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <Topbar pen={pen} role={role} />
        {/* Dashboard content */}
      </main>
    </div>
  );
};

export default PurchaseDashboard;
