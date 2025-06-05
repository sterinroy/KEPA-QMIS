import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import './ManageRequest.css';
import logoac from '../../src/assets/police_academy2.png';
import userimg from '../../src/assets/user.jpg';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'orderID', headerName: 'Order ID', width: 130 },
  { field: 'invoiceDate', headerName: 'Invoice Date', width: 130 },
  { field: 'fromWhom', headerName: 'From Whom', width: 150 },
  { field: 'toWhom', headerName: 'To Whom', width: 150 },
  { field: 'item', headerName: 'Item', width: 130 },
  { field: 'subcategory', headerName: 'Subcategory', width: 130 },
  { field: 'quantity', headerName: 'Quantity', width: 100 },
  { field: 'amount', headerName: 'Amount', width: 100 },
  { field: 'billNo', headerName: 'Bill/Invoice No', width: 150 },
  { field: 'verifyDate', headerName: 'Verification Date', width: 150 },
];

const rows = []; // Replace with actual data

const ManageRequest = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeNav, setActiveNav] = useState('managerequest');

  const handleDropdownToggle = () => setShowDropdown(!showDropdown);

  const handleNavigation = (page) => {
    setActiveNav(page);
    if (page === 'dashboard') navigate('/Userdashboard');
    else if (page === 'sendrequest') navigate('/sendrequest');
    else if (page === 'managerequest') navigate('/managerequest');
    else if (page === 'temp') navigate('/temp');
    else if (page === 'return') navigate('/return');
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <img src={logoac} alt="Logo" />
        </div>
        <nav className="nav-menu">
          <div
            className={`nav-item ${activeNav === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleNavigation('dashboard')}
          >
            <DashboardIcon className="icon" /> Dashboard
          </div>
          <div
            className={`nav-item ${activeNav === 'sendrequest' ? 'active' : ''}`}
            onClick={() => handleNavigation('sendrequest')}
          >
            <DescriptionIcon className="icon" /> Send Request
          </div>
          <div
            className={`nav-item ${activeNav === 'temp' ? 'active' : ''}`}
            onClick={() => handleNavigation('temp')}
          >
            <DescriptionIcon className="icon" /> Temporary Issue
          </div>
          <div
            className={`nav-item ${activeNav === 'managerequest' ? 'active' : ''}`}
            onClick={() => handleNavigation('managerequest')}
          >
            <BookmarkIcon className="icon" /> Manage Request
          </div>
          <div
            className={`nav-item ${activeNav === 'return' ? 'active' : ''}`}
            onClick={() => handleNavigation('return')}
          >
            <AssignmentReturnIcon className="icon" /> Return
          </div>
          
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        {/* Top Navbar */}
        <nav className="top-navbar">
          <h1>Welcome ABCD<br /></h1>
          <div className="header-right">
            <input type="text" className="search" placeholder="Search" />
            <NotificationsNoneIcon className="icon-bell" />
            <div className="profile" onClick={handleDropdownToggle}>
              <img src={userimg} alt="User" className="profile-pic" />
              <span className="profile-name">ABCD</span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <img src={logoac} alt="User" className="dropdown-pic" />
                  <div className="dropdown-details">
                    <div className="name">ABCD</div>
                  </div>
                  <button className="logout-btn" onClick={() => navigate('/login')}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Data Table */}
        <div className="data-grid-wrapper">
          <h3>Manage Request</h3>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableRowSelectionOnClick
            getRowId={(row) => row.id}
            autoHeight={false}
            style={{ height: 600, width: '89%' }}
            className="data-grid"
            
          />
          {rows.length === 0 && <p style={{ padding: '10px' }}>0 Records</p>}
        </div>
      </main>
    </div>
  );
};

export default ManageRequest;
