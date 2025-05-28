
// export default PurchaseStockDetailEntry;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tempstockdetailentry.css';
import logoac from '../../assets/police_academy2.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import userimg from '../../assets/user.jpg'
import {
  TextField,
  
  Button,
  Grid,
  Box,
} from '@mui/material';

const Tempstockdetailentry = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeNav, setActiveNav] = useState('stock');
  const [formData, setFormData] = useState({
     slNo: '',
          PENNo: '',
          toWhom: '',
          dateOfissue: '',
          name: '',
          mobile: '',
          itemDescription: '',
          purpose: '',
          qty: 1,
  });

  
  const navigate = useNavigate();

  const handleDropdownToggle = () => setShowDropdown(!showDropdown);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      slNo: formData.slNo,
      PENNo: formData.PENNo,
      to_whom: formData.toWhom,
      name:formData.name,
      mobile:formData.mobile,
      date_of_issue: formData.dateOfissue,
      amount: parseFloat(formData.amount),
      item_description: formData.itemDescription,
      purpose: formData.purpose,
      quantity: parseInt(formData.qty, 10),
    };

    fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((resData) => {
        alert(resData.message);
        setFormData({
          slNo: '',
          PENNo: '',
          toWhom: '',
          dateOfissue: '',
          name: '',
          mobile: '',
          itemDescription: '',
          purpose: '',
          qty: 1,
        });
      })
      .catch((err) => alert('Error: ' + err.message));
  };

  const handleNavigation = (page) => {
    setActiveNav(page);
    if (page === 'dashboard') navigate('/temp');
    else if (page === 'stock') navigate('/tempstockdetailentry');
    else if (page === 'transfer') navigate('/temptransfer');
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">
          <img src={logoac} alt="logo" />
        </div>
        <nav className="nav-menu">
          <div className={`nav-item ${activeNav === 'dashboard' ? 'active' : ''}`} onClick={() => handleNavigation('dashboard')}>
            <DashboardIcon className="icon" /> Dashboard
          </div>
          <div className={`nav-item ${activeNav === 'stock' ? 'active' : ''}`} onClick={() => handleNavigation('stock')}>
            <DescriptionIcon className="icon" /> Stock Details Entry
          </div>
          <div className={`nav-item ${activeNav === 'transfer' ? 'active' : ''}`} onClick={() => handleNavigation('transfer')}>
            <BookmarkIcon className="icon" /> Transfer Stock
          </div>
        </nav>
      </aside>

      <main className="main">
        <nav className="top-navbar">
          <h1>Welcome QuarterMaster<br /><span>(Temporary Allocation Wing)</span></h1>
          <div className="header-right">
            <input type="text" className="search" placeholder="Search" />
            <NotificationsNoneIcon className="icon-bell" />
            <div className="profile" onClick={handleDropdownToggle}>
              <img src={userimg} alt="User" className="profile-pic" />
              <span className="profile-name">qmtemp</span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <img src={logoac} alt="User" className="dropdown-pic" />
                  <div className="dropdown-details">
                    <div className="name">Quarter Master</div>
                    <div className="email">qmpurchase@domain.com</div>
                  </div>
                  <button className="logout-btn" onClick={() => navigate('/login')}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </nav>

        <Box className="purchase-form" sx={{ backgroundColor: '#fff', p: 4, borderRadius: 2, boxShadow: 2 }}>
  <h3>Purchase Details</h3>
  <form onSubmit={handleSubmit}>
    <Grid container spacing={2}>
      {/* Row 1 */}
      <Grid item xs={12} md={6}>
    <TextField
      label="SlNo"
      name="SlNo"
      fullWidth
      required
      value={formData.slNo}
      onChange={handleInputChange}
      sx={{ width:500}}
    />
  </Grid>
  <Grid item xs={12} md={6}>
    <TextField
      label="PEN No"
      name="PEN No"
      fullWidth
      required
      InputLabelProps={{ shrink: true }}
      value={formData.PENNo}
      onChange={handleInputChange}
      sx={{width:500}}
    />
  </Grid>

      {/* Row 2 */}
      <Grid item xs={12} md={6}>
       <TextField
          label="Date of Issue"
          type="date"
          name="dateOfissue"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={formData.dateOfissue}
          onChange={handleInputChange}
          sx={{width:500}}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="To Whom"
          name="toWhom"
          fullWidth
          required
          value={formData.toWhom}
          onChange={handleInputChange}
          sx={{width:500}}
        />
      </Grid>

      {/* Row 3 */}
      <Grid item xs={12} md={6}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={formData.name}
          onChange={handleInputChange}
          sx={{width:500}}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Mobile"
          name="mobile"
          fullWidth
          value={formData.mobile}
          onChange={handleInputChange}
          sx={{width:500}}
        />
      </Grid>

      {/* Row 4 */}
      <Grid item xs={12} md={6}>
        <TextField
          label="Amount"
          type="number"
          name="amount"
          fullWidth
          required
          value={formData.amount}
          onChange={handleInputChange}
          sx={{width:500}}
        />
      </Grid>
      
      
<Grid item xs={12} md={6}>
  <TextField
    label="Item Description"
    name="itemDescription"
    fullWidth
    required
    multiline
    rows={3}
    value={formData.itemDescription}
    onChange={handleInputChange}
    sx={{ width: 500 }}
  />
</Grid>
<Grid item xs={12} md={6}>
  <TextField
    label="Purpose"
    name="purpose"
    fullWidth
    required
    multiline
    rows={3}
    value={formData.purpose}
    onChange={handleInputChange}
    sx={{ width: 500 }}
  />
</Grid>

      {/* Row 6 */}
      <Grid item xs={12} md={6}>
        <TextField
          label="Quantity"
          type="number"
          name="qty"
          fullWidth
          required
          inputProps={{ min: 1 }}
          value={formData.qty}
          onChange={handleInputChange}
          sx={{width:500}}
        />
      </Grid>
    </Grid>

    <Button type="submit" variant="contained" color="success" sx={{ mt: 4 }}>
      GeneratePDF
    </Button>
  </form>
</Box>

      </main>
    </div>
  );
};

export default Tempstockdetailentry;
