import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import for navigation
import './Purchase.css';
import logoac from '../../assets/police_academy2.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import userimg from '../../assets/user.jpg'
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
} from '@mui/material';


const PurchaseTransfer = () => {
  const [penNumber, setPen] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate(); // ✅ Create navigate instance

  const toggleDropdown = () => setShowDropdown(prev => !prev);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Optionally: Clear tokens, session, etc.
    localStorage.clear();
    setShowDropdown(false);
    navigate('/login'); // ✅ Redirect to login route
  };
    const handleStockNavigation = () => {
    navigate('/purchasestockdetailentry'); // Redirect to Stock page when clicked
  };
  // const handleStock=()=>{

  // }
  
    const handlePurchseDashboard=()=>{
      navigate('/purchase');
    }
    const handlePurchseTransfer=()=>{
      navigate('/purchasetransfer')
    }
    const transfer = [
    {
      id: 'TR-2023-045',
      date: '15 Oct 2023',
      type: 'Transfer',
      items: 12,
      status: 'Pending',
    },
    {
      id: 'ST-2023-128',
      date: '14 Oct 2023',
      type: 'Stock In',
      items: 50,
      status: 'Completed',
    },
    {
      id: 'TR-2023-044',
      date: '12 Oct 2023',
      type: 'Transfer',
      items: 8,
      status: 'Completed',
    },
  ];
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
          <div className="nav-item " onClick={handlePurchseDashboard}><DashboardIcon className="icon" /> Dashboard</div>
          <div className="nav-item " onClick={handleStockNavigation}><DescriptionIcon className="icon" /> Stock Details Entry</div>
          <div className="nav-item active" onClick={handlePurchseTransfer}><BookmarkIcon className="icon" /> Transfer Stock</div>
        </nav>
      </aside>

      <main className="main">
        <nav className="top-navbar">
          <h1>Welcome QuarterMaster<br /><span>(Purchase Wing)</span></h1>
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
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
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
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transfer.map((tx, idx) => (
                <TableRow key={idx}>
                  <TableCell>{tx.id}</TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>{tx.items}</TableCell>
                  <TableCell>{getStatusChip(tx.status)}</TableCell>
                </TableRow>
              ))}
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
