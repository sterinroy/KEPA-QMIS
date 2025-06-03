
// // export default PurchaseTransfer;
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Purchase.css';
// import logoac from '../../assets/police_academy2.png';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import DescriptionIcon from '@mui/icons-material/Description';
// import BookmarkIcon from '@mui/icons-material/Bookmark';
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import userimg from '../../assets/user.jpg';
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Chip,
//   Skeleton,
// } from '@mui/material';

// const PurchaseTransfer = () => {
//   const [penNumber, setPen] = useState('');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [purchases, setPurchases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const profileRef = useRef(null);
//   const navigate = useNavigate();

//   const toggleDropdown = () => setShowDropdown(prev => !prev);

//   useEffect(() => {
//     const fetchPurchases = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/api/purchasestransfer');
//         if (!response.ok) {
//           throw new Error('Failed to fetch purchases');
//         }
//         const data = await response.json();
//         setPurchases(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPurchases();
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     setShowDropdown(false);
//     navigate('/login');
//   };

//   const handleStockNavigation = () => {
//     navigate('/purchasestockdetailentry');
//   };

//   const handlePurchseDashboard = () => {
//     navigate('/purchase');
//   };

//   const handlePurchseTransfer = () => {
//     navigate('/purchasetransfer');
//   };

//   const getStatusChip = (status) => {
//     const color =
//       status === 'Pending' ? 'warning' : status === 'Completed' ? 'success' : 'default';
//     return <Chip label={status} color={color} size="small" />;
//   };

//   return (
//     <div className="container">
//       <aside className="sidebar">
//         <div className="logo">
//           <img src={logoac} alt="logo" />
//         </div>
//         <nav className="nav-menu">
//           <div className="nav-item" onClick={handlePurchseDashboard}>
//             <DashboardIcon className="icon" /> Dashboard
//           </div>
//           <div className="nav-item" onClick={handleStockNavigation}>
//             <DescriptionIcon className="icon" /> Stock Details Entry
//           </div>
//           <div className="nav-item active" onClick={handlePurchseTransfer}>
//             <BookmarkIcon className="icon" /> Transfer Stock
//           </div>
//         </nav>
//       </aside>

//       <main className="main">
//         <nav className="top-navbar">
//           <h1>
//             Welcome QuarterMaster
//             <br />
//             <span>(Purchase Wing)</span>
//           </h1>
//           <div className="header-right">
//             <input type="text" className="search" placeholder="Search" />
//             <NotificationsNoneIcon className="icon-bell" />
//             <div className="profile" ref={profileRef} onClick={toggleDropdown}>
//               <img src={userimg} alt="User" className="profile-pic" />
//               <span className="profile-name">{penNumber}</span>
//               {showDropdown && (
//                 <div className="dropdown-menu">
//                   <img src={logoac} alt="User" className="dropdown-pic" />
//                   <div className="dropdown-details">
//                     <div className="name">QuarterMaster</div>
//                     <div className="pen">PEN: {penNumber}</div>
//                   </div>
//                   <button className="logout-btn" onClick={handleLogout}>
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </nav>

//         <Box sx={{ mt: 8 }}>
//           <Paper elevation={3} sx={{ borderRadius: 2 }}>
//             <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider' }}>
//               <Typography variant="h6" fontWeight="medium">
//                 Recent Transfers
//               </Typography>
//             </Box>

//             <TableContainer sx={{ maxHeight: 400 }}>
//               <Table stickyHeader>
//                                 <TableHead>
//                   <TableRow>
//                     <TableCell>Order No</TableCell>
//                     <TableCell>Supply Order No</TableCell>
//                     <TableCell>Invoice Date</TableCell>
//                     <TableCell>From Whom</TableCell>
//                     <TableCell>To Whom</TableCell>
//                     <TableCell>Bill/Invoice No</TableCell>
//                     <TableCell>Amount</TableCell>
//                     <TableCell>Item</TableCell>
//                     <TableCell>Sub-Category</TableCell>
//                     <TableCell>Quantity</TableCell>
//                   </TableRow>
//                               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   <TableRow>
//                     <TableCell colSpan={10}>
//                       <Skeleton variant="rectangular" width="100%" height={118} />
//                     </TableCell>
//                   </TableRow>
//                 ) : error ? (
//                   <TableRow>
//                     <TableCell colSpan={10} align="center">
//                       <Typography color="error">{error}</Typography>
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   purchases.map((purchase, idx) => (
//                     <TableRow key={idx}>
//                       <TableCell>{purchase.order_no}</TableCell>
//                       <TableCell>{purchase.supply_order_no}</TableCell>
//                       <TableCell>{new Date(purchase.invoice_date).toLocaleDateString()}</TableCell>
//                       <TableCell>{purchase.from_whom}</TableCell>
//                       <TableCell>{purchase.to_whom}</TableCell>
//                       <TableCell>{purchase.bill_invoice_no}</TableCell>
//                       <TableCell>{purchase.amount}</TableCell>
//                       <TableCell>{purchase.item}</TableCell>
//                       <TableCell>{purchase.sub_category}</TableCell>
//                       <TableCell>{purchase.quantity}</TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Box>
//       </main>
//     </div>
//   );
// };

// export default PurchaseTransfer;

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPurchases } from '../../../redux/actions/purchaseActions';
// import { fetchPurchases } from '../../redux/actions/purchaseActions'; // Adjust the path as needed

import './Purchase.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import userimg from '../../../assets/user.jpg';
import logoac from '../../../assets/police_academy2.png';

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Skeleton,
} from '@mui/material';

const PurchaseTransfer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const [penNumber, setPenNumber] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { purchases, loading, error } = useSelector((state) => state.purchase);

  useEffect(() => {
    dispatch(fetchPurchases());
    const storedPen = localStorage.getItem('pen') || 'NA';
    setPenNumber(storedPen);
  }, [dispatch]);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    setShowDropdown(false);
    navigate('/login');
  };

  const handleStockNavigation = () => {
    navigate('/purchasestockdetailentry');
  };

  const handlePurchseDashboard = () => {
    navigate('/purchase');
  };

  const handlePurchseTransfer = () => {
    navigate('/purchasetransfer');
  };

  const getStatusChip = (status) => {
    const color =
      status === 'Pending' ? 'warning' : status === 'Completed' ? 'success' : 'default';
    return <Chip label={status} color={color} size="small" />;
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">
          <img src={logoac} alt="logo" />
        </div>
        <nav className="nav-menu">
          <div className="nav-item" onClick={handlePurchseDashboard}>
            <DashboardIcon className="icon" /> Dashboard
          </div>
          <div className="nav-item" onClick={handleStockNavigation}>
            <DescriptionIcon className="icon" /> Stock Details Entry
          </div>
          <div className="nav-item active" onClick={handlePurchseTransfer}>
            <BookmarkIcon className="icon" /> Transfer Stock
          </div>
        </nav>
      </aside>

      <main className="main">
        <nav className="top-navbar">
          <h1>
            Welcome QuarterMaster
            <br />
            <span>(Purchase Wing)</span>
          </h1>
          <div className="header-right">
            <input type="text" className="search" placeholder="Search" />
            <NotificationsNoneIcon className="icon-bell" />
            <div className="profile" ref={profileRef} onClick={toggleDropdown}>
              <img src={userimg} alt="User" className="profile-pic" />
              <span className="profile-name">{penNumber}</span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <img src={logoac} alt="User" className="dropdown-pic" />
                  <div className="dropdown-details">
                    <div className="name">QuarterMaster</div>
                    <div className="pen">PEN: {penNumber}</div>
                  </div>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        <Box sx={{ mt: 8 }}>
          <Paper elevation={3} sx={{ borderRadius: 2 }}>
            <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6" fontWeight="medium">
                Recent Transfers
              </Typography>
            </Box>

            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Order No</TableCell>
                    <TableCell>Supply Order No</TableCell>
                    <TableCell>Invoice Date</TableCell>
                    <TableCell>From Whom</TableCell>
                    <TableCell>To Whom</TableCell>
                    <TableCell>Bill/Invoice No</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell>Sub-Category</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={10}>
                        <Skeleton variant="rectangular" width="100%" height={118} />
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={10} align="center">
                        <Typography color="error">{error}</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    purchases.map((purchase, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{purchase.order_no}</TableCell>
                        <TableCell>{purchase.supply_order_no}</TableCell>
                        <TableCell>{new Date(purchase.invoice_date).toLocaleDateString()}</TableCell>
                        <TableCell>{purchase.from_whom}</TableCell>
                        <TableCell>{purchase.to_whom}</TableCell>
                        <TableCell>{purchase.bill_invoice_no}</TableCell>
                        <TableCell>{purchase.amount}</TableCell>
                        <TableCell>{purchase.item}</TableCell>
                        <TableCell>{purchase.sub_category}</TableCell>
                        <TableCell>{purchase.quantity}</TableCell>
                        <TableCell>status</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </main>
    </div>
  );
};

export default PurchaseTransfer;
