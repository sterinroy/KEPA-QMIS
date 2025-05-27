
// export default PurchaseStockDetailEntry;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PurchaseStockdetailentry.css';
import logoac from '../../assets/police_academy2.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import userimg from '../../assets/user.jpg'

const PurchaseStockDetailEntry = () => {
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
    if (page === 'dashboard') navigate('/purchase');
    else if (page === 'stock') navigate('/purchasestockdetailentry');
    else if (page === 'transfer') navigate('/purchasetransfer');
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
          <h1>Welcome QuarterMaster<br /><span>(Purchase Wing)</span></h1>
          <div className="header-right">
            <input type="text" className="search" placeholder="Search" />
            <NotificationsNoneIcon className="icon-bell" />
            <div className="profile" onClick={handleDropdownToggle}>
              <img src={userimg} alt="User" className="profile-pic" />
              <span className="profile-name">qmpurchase</span>
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

        <div className="purchase-form">
          <h3>Purchase Details</h3>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Supply Order No</label>
                <input type="text" className="form-control" name="supplyOrderNo" value={formData.supplyOrderNo} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Invoice Date</label>
                <input type="date" className="form-control" name="invoiceDate" value={formData.invoiceDate} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">From Whom</label>
                <input type="text" className="form-control" name="fromWhom" value={formData.fromWhom} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">To Whom</label>
                <input type="text" className="form-control" name="toWhom" value={formData.toWhom} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Date of Verification</label>
                <input type="date" className="form-control" name="dateOfVerification" value={formData.dateOfVerification} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Bill/Invoice No</label>
                <input type="text" className="form-control" name="billInvoiceNo" value={formData.billInvoiceNo} onChange={handleInputChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Amount</label>
                <input type="number" className="form-control" name="amount" value={formData.amount} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Item</label>
                <select className="form-select" name="item" value={formData.item} onChange={handleCategoryChange} required>
                  <option value="" disabled>Select Item</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Stationery">Stationery</option>
                  <option value="Weapons">Weapons</option>
                </select>
              </div>
              <div className="col-md-5">
                <label className="form-label">Sub-Category</label>
                <select className="form-select" name="subCategory" value={formData.subCategory} onChange={handleInputChange} required>
                  <option value="" disabled>Select Sub-Category</option>
                  {subCategories[formData.item]?.map((subCat, index) => (
                    <option key={index} value={subCat}>{subCat}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-1 d-flex align-items-end">
                <button type="button" className="btn btn-outline-primary" onClick={handleAddSubCategory}>+</button>
              </div>
              <div className="col-md-6">
                <label className="form-label">Quantity</label>
                <input type="number" className="form-control" name="qty" value={formData.qty} onChange={handleInputChange} min="1" required />
              </div>
            </div>
            <button type="submit" className="btn btn-success mt-3">Submit</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PurchaseStockDetailEntry;
