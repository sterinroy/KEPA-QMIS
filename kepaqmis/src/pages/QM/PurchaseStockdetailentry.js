

// export default PurchaseStockDetailEntry;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PurchaseStockdetailentry.css';
import logoac from '../../assets/police_academy2.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import userimg from '../../assets/user.jpg';
import {
  TextField, Select, MenuItem, InputLabel,
  FormControl, Button, Grid, Box
} from '@mui/material';

const PurchaseStockDetailEntry = (
  {
//   // const[penNumber,setPen]=useState(false);
//   penNumber = 'PEN000000',
//   userName = 'QuarterMaster',
  apiUrl = 'http://localhost:3000/api/purchasestockdetailentry', // ✅ Dynamic API endpoint
  initialCategories = {
    Electronics: ['Mobile', 'Laptop', 'Tablet'],
    Stationery: ['Pen', 'Notebook', 'Stapler'],
    Weapons: ['Pistol', 'Rifle', 'Ammunition'],
  }
}
) => {
  const[penNumber,setPenNumber]=useState(false);
  const[role,setRole]=useState(false);

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeNav, setActiveNav] = useState('stock');
  const [subCategories, setSubCategories] = useState(initialCategories);

  const [formData, setFormData] = useState({
    orderNo: '',
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

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    if (!category) return alert('Select a category first.');

    const newSubCat = prompt(`Add sub-category to "${category}"`);
    if (newSubCat && !subCategories[category]?.includes(newSubCat)) {
      setSubCategories((prev) => ({
        ...prev,
        [category]: [...(prev[category] || []), newSubCat]
      }));
      setFormData((prev) => ({ ...prev, subCategory: newSubCat }));
    } else if (newSubCat) {
      alert('Sub-category already exists.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      order_no: formData.orderNo,
      // order_no: formData.orderNo,
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

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const resData = await res.json();
      alert(resData.message || 'Submitted successfully');
      setFormData({
        orderNo:'',
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
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleNavigation = (page) => {
    setActiveNav(page);
    navigate(
      page === 'dashboard' ? '/purchase' :
      page === 'stock' ? '/purchasestockdetailentry' :
      '/purchasetransfer'
    );
  };

  const navItems = [
    { key: 'dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
    { key: 'stock', icon: <DescriptionIcon />, label: 'Stock Details Entry' },
    { key: 'transfer', icon: <BookmarkIcon />, label: 'Transfer Stock' },
  ];

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo"><img src={logoac} alt="logo" /></div>
        <nav className="nav-menu">
          {navItems.map((item) => (
            <div
              key={item.key}
              className={`nav-item ${activeNav === item.key ? 'active' : ''}`}
              onClick={() => handleNavigation(item.key)}
            >
              {item.icon} {item.label}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        <nav className="top-navbar">
          <h1>Welcome QuarterMaster<br /><span>(Purchase Wing)</span></h1>
          <div className="header-right">
            <input type="text" className="search" placeholder="Search" />
            <NotificationsNoneIcon className="icon-bell" />
            <div className="profile" onClick={toggleDropdown}>
              <img src={userimg} alt="User" className="profile-pic" />
              <span className="profile-name">PEN: {penNumber}</span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <img src={logoac} alt="User" className="dropdown-pic" />
                  <div className="dropdown-details">
                    <div className="name">{role}</div>
                    <div className="pen">PEN: {penNumber}</div>
                  </div>
                  <button className="logout-btn" onClick={() => navigate('/login')}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Purchase Form */}
        <Box className="purchase-form" sx={{ backgroundColor: '#fff', p: 4, borderRadius: 2, boxShadow: 2 }}>
          <h3>Purchase Details</h3>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Grid rows simplified */}
              {[
                { label: 'Order No', name: 'orderNo' },
                { label: 'Supply Order No', name: 'supplyOrderNo' },
                { label: 'Invoice Date', name: 'invoiceDate', type: 'date' },
                { label: 'From Whom', name: 'fromWhom' },
                { label: 'To Whom', name: 'toWhom' },
                { label: 'Date of Verification', name: 'dateOfVerification', type: 'date' },
                { label: 'Bill/Invoice No', name: 'billInvoiceNo' },
                { label: 'Amount', name: 'amount', type: 'number' },
              ].map((field, idx) => (
                <Grid key={idx} item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label={field.label}
                    name={field.name}
                    type={field.type || 'text'}
                    InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    sx={{ width: 500 }}
                  />
                </Grid>
              ))}

              {/* Item select */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Item</InputLabel>
                  <Select
                    name="item"
                    value={formData.item}
                    onChange={handleCategoryChange}
                    label="Item"
                    sx={{ width: 500 }}
                  >
                    {Object.keys(subCategories).map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Subcategory and + button */}
              <Grid item xs={10} md={5}>
                <FormControl fullWidth required>
                  <InputLabel>Sub-Category</InputLabel>
                  <Select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    label="Sub-Category"
                    sx={{ width: 425 }}
                  >
                    {(subCategories[formData.item] || []).map((sub, i) => (
                      <MenuItem key={i} value={sub}>{sub}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2} md={1}>
                <Button variant="outlined" fullWidth onClick={handleAddSubCategory}>+</Button>
              </Grid>

              {/* Quantity */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Quantity"
                  type="number"
                  name="qty"
                  inputProps={{ min: 1 }}
                  fullWidth
                  required
                  value={formData.qty}
                  onChange={handleInputChange}
                  sx={{ width: 500 }}
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

export default PurchaseStockDetailEntry;
