
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

// import React, { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchPurchases } from '../../../redux/actions/purchaseActions';
// // import { fetchPurchases } from '../../redux/actions/purchaseActions'; // Adjust the path as needed

// import './Purchase.css';
// import Sidebar from '../../../components/Sidebar'
// import Topbar from '../../../components/Topbar';

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
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [penNumber, setPenNumber] = useState('');
//   const [role, setRole] = useState(false);

//   const { purchases, loading, error } = useSelector((state) => state.purchase);

//   useEffect(() => {
//     dispatch(fetchPurchases());
//     const storedPen = localStorage.getItem('pen') || 'NA';
//     setPenNumber(storedPen);
//   }, [dispatch]);

//   const getStatusChip = (status) => {
//     const color =
//       status === 'Pending' ? 'warning' : status === 'Completed' ? 'success' : 'default';
//     return <Chip label={status} color={color} size="small" />;
//   };

//   return (
//     <div className="container">
//      <Sidebar/>

//       <main className="main">
//         <Topbar penNumber={penNumber} role={role} />

//         <Box sx={{ mt: 8 }}>
//           <Paper elevation={3} sx={{ borderRadius: 2 }}>
//             <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider' }}>
//               <Typography variant="h6" fontWeight="medium">
//                 Recent Transfers
//               </Typography>
//             </Box>

//             <TableContainer sx={{ maxHeight: 400 }}>
//               <Table stickyHeader>
//                 <TableHead>
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
//                     <TableCell>Status</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {loading ? (
//                     <TableRow>
//                       <TableCell colSpan={10}>
//                         <Skeleton variant="rectangular" width="100%" height={118} />
//                       </TableCell>
//                     </TableRow>
//                   ) : error ? (
//                     <TableRow>
//                       <TableCell colSpan={10} align="center">
//                         <Typography color="error">{error}</Typography>
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     purchases.map((purchase, idx) => (
//                       <TableRow key={idx}>
//                         <TableCell>{purchase.order_no}</TableCell>
//                         <TableCell>{purchase.supply_order_no}</TableCell>
//                         <TableCell>{new Date(purchase.invoice_date).toLocaleDateString()}</TableCell>
//                         <TableCell>{purchase.from_whom}</TableCell>
//                         <TableCell>{purchase.to_whom}</TableCell>
//                         <TableCell>{purchase.bill_invoice_no}</TableCell>
//                         <TableCell>{purchase.amount}</TableCell>
//                         <TableCell>{purchase.item}</TableCell>
//                         <TableCell>{purchase.sub_category}</TableCell>
//                         <TableCell>{purchase.quantity}</TableCell>
//                         <TableCell>status</TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Box>
//       </main>
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPurchases } from '../../../redux/actions/purchaseActions';
import Sidebar from '../../../components/Sidebar';
import Topbar from '../../../components/Topbar';
import './PurchaseTransfer.css';
import { Box, Paper, Typography, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const PurchaseTransfer = () => {
  const dispatch = useDispatch();

  const [penNumber, setPenNumber] = useState('');
  const [role, setRole] = useState(false);

  const { purchases, loading } = useSelector((state) => state.purchase);

  useEffect(() => {
    dispatch(fetchPurchases());
    const storedPen = localStorage.getItem('pen') || 'NA';
    setPenNumber(storedPen);
  }, [dispatch]);

  const columns = [
    { field: 'order_no', headerName: 'Order No', width: 100 },
    { field: 'supply_order_no', headerName: 'Supply Order No', width: 120 },
    {
      field: 'invoice_date',
      headerName: 'Invoice Date',
      width: 120,
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : '',
    },
    { field: 'from_whom', headerName: 'From Whom', width: 120 },
    { field: 'to_whom', headerName: 'To Whom', width: 120 },
    { field: 'bill_invoice_no', headerName: 'Bill/Invoice No', width: 120 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 100,
      type: 'number',
    },
    { field: 'item', headerName: 'Item', width: 120 },
    { field: 'sub_category', headerName: 'Sub-Category', width: 120 },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 100,
      type: 'number',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        const status = params.value;
        let color;
        if (status === 'Pending') color = 'warning';
        else if (status === 'Completed') color = 'success';
        else color = 'default';
        return <Chip label={status} color={color} size="small" />;
      },
    },
  ];

  const rows = purchases.map((purchase, index) => ({
    id: index,
    ...purchase,
  }));

  return (
    <div className="container">
      <Sidebar />

      <main className="main">
        <Topbar penNumber={penNumber} role={role} />

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mt: 2 }}>
          <Paper
            sx={{
              borderRadius: 2,
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#111C44',
              p: 2,
            }}
          >
            <Box sx={{ px: 2, py: 2, borderBottom: 1, borderColor: '#2C2F57' }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
                Recent Transfers
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, overflowX: 'auto', mt: 1 }}>
             <DataGrid
  rows={rows}
  columns={columns}
  loading={loading}
  pageSize={10}
  rowsPerPageOptions={[5, 10, 20]}
  disableSelectionOnClick
  autoHeight={false}
  sx={{
    minWidth: '100%',
    backgroundColor: '#111C44',
    color: 'white',
    border: 'none',
    '.MuiDataGrid-cell': {
      color: 'white',
    },
    '.MuiDataGrid-columnHeaders': {
      backgroundColor: '#111C44',
      color: 'white',
    },
    '.MuiDataGrid-columnHeaderTitle': {
      fontWeight: 'bold',
      fontSize: '0.9rem',
      color: 'white',
    },
    '.MuiDataGrid-columnHeader': {
      backgroundColor: '#111C44',
    },
    '.MuiDataGrid-virtualScrollerRenderZone': {
      backgroundColor: '#111C44',
    },
    '.MuiDataGrid-virtualScroller': {
      backgroundColor: '#111C44',
    },
    '.MuiDataGrid-footerContainer': {
      backgroundColor: '#1A2251',
      color: 'white',
    },
    '.MuiDataGrid-row:hover': {
      backgroundColor: '#2C2F57',
    },

    // 🔥 Column menu (3 dots) + filters
    '.MuiDataGrid-menu': {
      backgroundColor: '#1A2251',
      color: 'white',
    },
    '.MuiDataGrid-iconButtonContainer .MuiSvgIcon-root': {
      color: 'white',
    },
    '.MuiPaper-root.MuiMenu-paper': {
      backgroundColor: '#1A2251 !important',
      color: 'white',
    },
    '.MuiMenuItem-root': {
      color: 'white',
    },
    '.MuiMenuItem-root:hover': {
      backgroundColor: '#2C2F57',
    },

    // 🔥 Tooltips
    '.MuiTooltip-tooltip': {
      backgroundColor: '#1A2251',
      color: 'white',
    },

    // 🔥 Pagination (rows per page, page buttons, etc.)
    '.MuiTablePagination-root': {
      color: 'white',
    },
    '.MuiTablePagination-selectLabel': {
      color: 'white',
    },
    '.MuiSelect-icon': {
      color: 'white',
    },
    '.MuiTablePagination-select': {
      color: 'white',
    },
    '.MuiInputBase-root': {
      color: 'white',
    },
    '.MuiSvgIcon-root': {
      color: 'white',
    },
    '.Mui-disabled': {
      color: '#888', // Optional: faded color for disabled buttons
    },
  }}
/>

            </Box>
          </Paper>
        </Box>
      </main>
    </div>
  );
};

export default PurchaseTransfer;

