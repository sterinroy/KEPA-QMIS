
// export default PurchaseStockDetailEntry;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SendRequest.css';
import userimg from '../../src/assets/user.jpg';
import logoac from '../../src/assets/police_academy2.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Box,
} from '@mui/material';

const SendRequest = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeNav, setActiveNav] = useState('stock');
  const [formData, setFormData] = useState({
    supplyOrderNo: '',
    invoiceDate: '',
    fromWhom: '',
    toWhom: '',
    dateOfVerification: '',
    billInvoiceNo: '',
    amount: '',
    item: '',
    subCategory: '',
    qty: 1,
  });

  const [subCategories, setSubCategories] = useState({
    Electronics: ['Mobile', 'Laptop', 'Tablet'],
    Stationery: ['Pen', 'Notebook', 'Stapler'],
    Weapons: ['Pistol', 'Rifle', 'Ammunition'],
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

  const handleCategoryChange = (e) => {
    const selectedItem = e.target.value;
    setFormData((prev) => ({
      ...prev,
      item: selectedItem,
      subCategory: '',
    }));
  };

  const handleAddSubCategory = () => {
    const category = formData.item;
    if (!category) {
      alert('Please select an Item first.');
      return;
    }
    const newSubCategory = prompt(`Add new Sub-Category under "${category}":`);
    if (newSubCategory) {
      if (!subCategories[category].includes(newSubCategory)) {
        setSubCategories((prev) => ({
          ...prev,
          [category]: [...prev[category], newSubCategory],
        }));
        setFormData((prev) => ({
          ...prev,
          subCategory: newSubCategory,
        }));
      } else {
        alert('This Sub-Category already exists.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      supply_order_no: formData.supplyOrderNo,
      invoice_date: formData.invoiceDate,
      from_whom: formData.fromWhom,
      to_whom: formData.toWhom,
      date_of_verification: formData.dateOfVerification,
      bill_invoice_no: formData.billInvoiceNo,
      amount: parseFloat(formData.amount),
      item: formData.item,
      sub_category: formData.subCategory,
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
          supplyOrderNo: '',
          invoiceDate: '',
          fromWhom: '',
          toWhom: '',
          dateOfVerification: '',
          billInvoiceNo: '',
          amount: '',
          item: '',
          subCategory: '',
          qty: 1,
        });
      })
      .catch((err) => alert('Error: ' + err.message));
  };

const handleNavigation = (page) => {
  setActiveNav(page);
  if (page === 'dashboard') navigate('/Userdashboard');
  else if (page === 'sendrequest') navigate('/sendrequest');
  else if (page === 'managerequest') navigate('/managerequest');
  else if (page === 'return') navigate('/return');
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
            <div className={`nav-item ${activeNav === 'sendrequest' ? 'active' : ''}`} onClick={() => handleNavigation('sendrequest')}>
                <DescriptionIcon className="icon" /> Send Request
            </div>
            <div className={`nav-item ${activeNav === 'managerequest' ? 'active' : ''}`} onClick={() => handleNavigation('managerequest')}>
                <BookmarkIcon className="icon" /> Manage Request
            </div>
            <div className={`nav-item ${activeNav === 'return' ? 'active' : ''}`} onClick={() => handleNavigation('return')}>
                <AssignmentReturnIcon className="icon" /> Return
            </div>
        </nav>
      </aside>

      <main className="main">
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

        <Box className="purchase-form" sx={{ backgroundColor: '#fff', p: 4, borderRadius: 2, boxShadow: 2 }}>
  <h3>Send Request</h3>
  <form onSubmit={handleSubmit}>
    <Grid container spacing={2}>
      {/* Row 1 */}
      <Grid item xs={12} md={6}>
    <TextField
      label="Supply Order No"
      name="supplyOrderNo"
      fullWidth
      required
      value={formData.supplyOrderNo}
      onChange={handleInputChange}
      sx={{ width:500}}
    />
  </Grid>
  <Grid item xs={12} md={6}>
    <TextField
      label="Invoice Date"
      type="date"
      name="invoiceDate"
      fullWidth
      required
      InputLabelProps={{ shrink: true }}
      value={formData.invoiceDate}
      onChange={handleInputChange}
      sx={{width:500}}
    />
  </Grid>

      {/* Row 2 */}
      <Grid item xs={12} md={6}>
        <TextField
          label="From Whom"
          name="fromWhom"
          fullWidth
          required
          value={formData.fromWhom}
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
          label="Date of Verification"
          type="date"
          name="dateOfVerification"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={formData.dateOfVerification}
          onChange={handleInputChange}
          sx={{width:500}}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Bill/Invoice No"
          name="billInvoiceNo"
          fullWidth
          value={formData.billInvoiceNo}
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
        <FormControl fullWidth required>
          <InputLabel>Item</InputLabel>
          <Select
            name="item"
            value={formData.item}
            onChange={handleCategoryChange}
            label="Item"
            sx={{width:500}}
          >
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Stationery">Stationery</MenuItem>
            <MenuItem value="Weapons">Weapons</MenuItem>
          </Select>
        </FormControl>
        
      </Grid>

      {/* Row 5 - Sub-Category and + button */}
      <Grid item xs={10} md={5}>
        <FormControl fullWidth required>
          <InputLabel>Sub-Category</InputLabel>
          <Select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleInputChange}
            label="Sub-Category"
            sx={{width:425}}
          >
            {subCategories[formData.item]?.map((subCat, idx) => (
              <MenuItem key={idx} value={subCat}>{subCat}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2} md={1}>
        <Button variant="outlined" fullWidth onClick={handleAddSubCategory}>
          +
        </Button>
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
      Transfer
    </Button>
  </form>
</Box>

      </main>
    </div>
  );
};

export default SendRequest;