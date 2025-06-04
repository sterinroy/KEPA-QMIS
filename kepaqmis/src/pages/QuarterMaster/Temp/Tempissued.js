import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTempIssued } from '../../../redux/actions/tempActions';

import logoac from '../../../assets/police_academy2.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import userimg from '../../../assets/user.jpg';

import {
  Box,
  Typography,
  Skeleton,
  Paper,
  Button
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import './Tempissued.css';

const Tempissued = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const [penNumber, setPenNumber] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { issuedList, loading, error } = useSelector((state) => state.temp);

  useEffect(() => {
    dispatch(fetchTempIssued());
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

  const handleDashboard = () => {
    navigate('/tempdashboard');
  };

  const handleStockEntry = () => {
    navigate('/tempstockdetailentry');
  };

  const handleTempIssued = () => {
    navigate('/tempissued');
  };

  const columns = [
    { field: 'slNo', headerName: 'Sl No', width: 90 },
    { field: 'PENNo', headerName: 'PEN No', width: 120 },
    { field: 'toWhom', headerName: 'To Whom', width: 130 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'mobile', headerName: 'Mobile', width: 130 },
    {
      field: 'dateOfissue',
      headerName: 'Date of Issue',
      width: 150,
      renderCell: (params) => {
        const date = new Date(params.value);
        return isNaN(date.getTime()) ? 'N/A' : date.toLocaleString();
      },
    },
    { field: 'amount', headerName: 'Amount', width: 100 },
    { field: 'itemDescription', headerName: 'Item Description', width: 180 },
    { field: 'purpose', headerName: 'Purpose', width: 130 },
    { field: 'qty', headerName: 'Quantity', width: 100 },
    {
      field: 'returnStatus',
      headerName: 'Return',
      width: 120,
      renderCell: (params) => (
        <select
          defaultValue={params.value || 'No'}
          onChange={(e) => {
            const newValue = e.target.value;
            console.log(`Row ${params.id} return changed to: ${newValue}`);
          }}
          style={{ width: '100%', padding: 4, borderRadius: 4 }}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      )
    }
  ];

  const allRows = issuedList.map((row, index) => ({
    id: index,
    returnStatus: row.returnStatus || 'No',
    ...row
  }));

  const yesRows = allRows.filter(row => row.returnStatus === 'Yes');
  const noRows = allRows.filter(row => row.returnStatus === 'No');

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <img src={logoac} alt="logo" />
        </div>
        <nav className="nav-menu">
          <div className="nav-item" onClick={handleDashboard}>
            <DashboardIcon className="icon" /> Dashboard
          </div>
          <div className="nav-item" onClick={handleStockEntry}>
            <DescriptionIcon className="icon" /> Temp Stock Entry
          </div>
          <div className="nav-item active" onClick={handleTempIssued}>
            <BookmarkIcon className="icon" /> Temp Stock Issued
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        {/* Top Navbar */}
        <nav className="top-navbar">
          <h1>
            Welcome QuarterMaster
            <br />
            <span>(Temporary Issue Wing)</span>
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

        {/* Data Tables */}
        <Box sx={{ mt: 8, px: 3 }}>
          <Typography variant="h6" gutterBottom>
            Returned Items (Yes)
          </Typography>
          <Paper sx={{ height: 400, mb: 4, borderRadius: 2 }}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={400} />
            ) : error ? (
              <Typography color="error" sx={{ p: 2 }}>
                {error}
              </Typography>
            ) : (
              <DataGrid
                rows={yesRows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            )}
          </Paper>

          <Typography variant="h6" gutterBottom>
            Not Returned Items (No)
          </Typography>
          <Paper sx={{ height: 400, borderRadius: 2 }}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={400} />
            ) : error ? (
              <Typography color="error" sx={{ p: 2 }}>
                {error}
              </Typography>
            ) : (
              <DataGrid
                rows={noRows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            )}
          </Paper>

          <Box sx={{ mt: 3 }}>
            <Button variant="outlined" color="secondary" onClick={handleStockEntry}>
              ← Back to Stock Entry
            </Button>
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default Tempissued;
