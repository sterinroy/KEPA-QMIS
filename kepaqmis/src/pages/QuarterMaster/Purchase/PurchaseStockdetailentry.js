
// export default PurchaseStockDetailEntry;
import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './PurchaseStockdetailentry.css';
import { fetchPurchases } from '../../../redux/actions/purchaseActions';
import Sidebar from '../../../components/Sidebar'
import Topbar from '../../../components/Topbar';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import {
  TextField, Select, MenuItem, InputLabel,
  FormControl, Button, Grid, Box, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions,
  
} from '@mui/material';
import { submitPurchaseStock } from '../../../redux/actions/purchaseActions';

const PurchaseStockDetailEntry = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const location = useLocation();
  const { loading, success, error } = useSelector((state) => state.purchase || {});
    const [pen, setPen] = useState('');
    const [role, setRole] = useState('');
    useEffect(() => {
        dispatch(fetchPurchases());
    
        const passedPen = location.state?.pen;
        const passedRole = location.state?.role;
    
        if (passedPen) {
          setPen(passedPen);
          localStorage.setItem('pen', passedPen); // optional
        } else {
          const storedPen = localStorage.getItem('pen') || 'NA';
          setPen(storedPen);
        }
    
        if (passedRole) {
          setRole(passedRole);
          localStorage.setItem('role', passedRole); // optional
        } else {
          const storedRole = localStorage.getItem('role') || 'NA';
          setRole(storedRole);
        }
      }, [dispatch, location.state]);

  const [subCategories, setSubCategories] = useState({ });
  const defaultSubCategories = {
    Electronics: ['Mobile', 'Laptop', 'Tablet'],
    Stationery: ['Pen', 'Notebook', 'Stapler'],
    Weapons: ['Pistol', 'Rifle', 'Ammunition'],
  };
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

  // Dialog popup state
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState(''); // 'success', 'error', 'loading'

  // useEffect(() => {
  //   const stored = localStorage.getItem('subCategories');
  //   if (stored) {
  //     setSubCategories(JSON.parse(stored));
  //   } else {
  //     setSubCategories(defaultSubCategories);
  //   }
  // }, []);
      useEffect(() => {
        const stored = localStorage.getItem('subCategories');
        if (stored) {
          setSubCategories(JSON.parse(stored));
        } else {
          setSubCategories(defaultSubCategories);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
        const SuccessAnimation = () => {
          return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              {/* You can customize this with SVG, Lottie, or CSS */}
              <div className="checkmark-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="checkmark-circle__circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="checkmark-circle__check"
                    fill="none"
                    d="M14 27l7 7 16-16"
                  />
                </svg>
              </div>
              <p>Transferred!</p>
            </div>
          );
        };

      const TransferAnimation = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div className="spinner" />
      <p>Transferring </p>
    </div>
  );
};
    // const TransferAnimation = () => (
    //   <Lottie animationData={transferAnimation} loop={true} style={{ height: 150 }} />
    // );

  // React to Redux state changes
  const handleDialogState = (loading, success, error) => {
  if (loading) {
    setDialogMessage('Transferring...');
    setDialogType('loading');
    setOpenDialog(true);
  }
  else if (success) {
  setDialogType('success');
  setOpenDialog(true);

  setTimeout(() => {
    setOpenDialog(false);
  }, 2000);
}
  // else if (success) {
  //   setDialogMessage('Transferred successfully!');
  //   setDialogType('success');
  //   setOpenDialog(true);

  //   setTimeout(() => {
  //     setOpenDialog(false);
  //   }, 2000);
  // } 
  else if (error) {
    setDialogMessage(error);
    setDialogType('error');
    setOpenDialog(true);
  }
};
  const generatePDF = () => {
          const doc = new jsPDF();

          // Title
          doc.setFontSize(18);
          doc.text('Purchase Stock Entry Report', 14, 20);

          // Paragraph
          doc.setFontSize(12);
          const statement = `This document contains the purchase details for stock entry made by the ${role}. Please find the below details for your reference.`;
          const wrapped = doc.splitTextToSize(statement, 180);
          doc.text(wrapped, 14, 30);

          // Table
          autoTable(doc, {
            startY: 50,
            head: [['Field', 'Value']],
            body: [
              ['Order No', formData.orderNo],
              ['Supply Order No', formData.supplyOrderNo],
              ['Invoice Date', formData.invoiceDate],
              ['From Whom', formData.fromWhom],
              ['To Whom', formData.toWhom],
              ['Date of Verification', formData.dateOfVerification],
              ['Bill/Invoice No', formData.billInvoiceNo],
              ['Amount', formData.amount],
              ['Item', formData.item],
              ['Sub-Category', formData.subCategory],
              ['Quantity', formData.qty],
            ]
          });

          doc.save(`Purchase_Stock_${formData.orderNo || 'Report'}.pdf`);
        };


  // const toggleDropdown = () => setShowDropdown(!showDropdown);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      order_no: formData.orderNo,
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

    dispatch(submitPurchaseStock(payload));
    handleDialogState(loading, success, error);
  };


  return (
    <div className="container">
      {/* Sidebar */}
     <Sidebar />
      {/* Main Content */}
      <main className="purchase-entry-main">
      <Topbar pen={pen} role={role} />

        {/* Form */}
        <Box className="purchase-form" 
        // sx={{ backgroundColor: '#111C44', p: 4, borderRadius: 2, boxShadow: 2 
          
        // }}
         sx={{
            backgroundColor: '#111C44',
            color: 'white', // ✨ Add this
            p: 4,
            borderRadius: 2,
            boxShadow: 2,
            overflowY: 'auto'
          }}
        >
          <h3>Purchase Details</h3>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
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
  value={formData[field.name]}
  onChange={handleInputChange}
  InputLabelProps={{
    shrink: true,
    style: { color: 'white' },
  }}
  InputProps={{
    style: { color: 'white' },
    sx: {
      svg: {
        color: 'white', // ✅ This ensures calendar icon is visible
      },
    },
  }}
  sx={{
    width: 500,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: '#ccc',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  }}
/>

</Grid>

              ))}

              {/* Item select */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required
                sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white',
                        },
                        '&:hover fieldset': {
                          borderColor: '#ccc',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white',
                        },
                      }
                    }}
                >
                  <InputLabel sx={{ color: 'white' }}>Item</InputLabel>
                  <Select
                    name="item"
                    value={formData.item}
                    onChange={handleCategoryChange}
                    label="Item"
                    sx={{ width: 500,
                      color: 'white',
                      '.MuiSvgIcon-root': { color: 'white' },
                    }}
                  >
                    {Object.keys(subCategories).map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Subcategory and + button */}
              <Grid item xs={10} md={5}>
                <FormControl fullWidth required 
                sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white',
                      },
                      '&:hover fieldset': {
                        borderColor: '#ccc',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white',
                      },
                    }
                  }}
                >
                  <InputLabel sx={{ color: 'white' }}>Sub-Category</InputLabel>
                  <Select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    label="Sub-Category"
                    sx={{ width: 425 ,
                      color: 'white',
                      '.MuiSvgIcon-root': { color: 'white' },
                    }}
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
                  // inputProps={{ min: 1 }}
                   InputLabelProps={{
                    style: { color: 'white' }, // ✨ Label color
                  }}
                  InputProps={{
                    min: 1,
                    style: { color: 'white' }, // ✨ Input text color
                  }}
                  fullWidth
                  required
                  value={formData.qty}
                  onChange={handleInputChange}
                  sx={{ width: 500,
                    '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white', // 👈 Border color
                    },
                    '&:hover fieldset': {
                      borderColor: '#ccc', // Optional: hover color
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white', // Focused border
                    },
                  },
                  }}
                />
              </Grid>
            </Grid>

            <Button type="submit" variant="contained"  sx={{ mt: 4 ,backgroundColor: '#2E00D5 !important',
                color: 'white',
                
                '&:hover': {
                  backgroundColor: '#f0f0f0',
    }}}>
              Transfer
            </Button>
            {/* <Button
                  variant="contained"
                  sx={{
                    mt: 4,
                    backgroundColor: '#2E00D5 !important',
                    color: 'white',
                    '&:hover': { backgroundColor: '#f0f0f0' },
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPreview(true);
                  }}
                >
                  Preview
                </Button> */}
          </form>
          {showPreview && (
  <Box sx={{
    mt: 4,
    p: 3,
    border: '1px solid #ccc',
    borderRadius: 2,
    backgroundColor: '#1A1A2E',
    color: 'white'
  }}>
    <Typography variant="h6" gutterBottom>
      Preview Purchase Details
    </Typography>

    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
      {Object.entries(formData).map(([key, value]) => (
        <li key={key}><strong>{key}:</strong> {value}</li>
      ))}
    </ul>

    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
      <Button variant="contained" color="success" onClick={handleSubmit}>
        Transfer
      </Button>
      <Button variant="outlined" color="info" onClick={generatePDF}>
        Generate PDF
      </Button>
      <Button variant="text" color="error" onClick={() => setShowPreview(false)}>
        Cancel
      </Button>
    </Box>
  </Box>
)}

        </Box>

        {/* Feedback Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>
            {dialogType === 'loading' && 'Processing'}
            {dialogType === 'success' && 'Success'}
            {dialogType === 'error' && 'Error'}
          </DialogTitle>
          {/* <DialogContent>
            <Typography
              color={
                dialogType === 'success' ? 'success.main' :
                dialogType === 'error' ? 'error' :
                'textPrimary'
              }
            >
              {dialogMessage}
            </Typography>
          </DialogContent> */}
          <DialogContent sx={{ width: 300, minWidth: 300, textAlign: 'center' }}>
            {dialogType === 'loading' ? (
              <TransferAnimation />
            ) : dialogType === 'success' ? (
              <SuccessAnimation />
            ) : (
              <Typography
                color={
                  dialogType === 'error' ? 'error' : 'textPrimary'
                }
              >
                {dialogMessage}
              </Typography>
            )}
          </DialogContent>


          <DialogActions>
            {dialogType !== 'loading' && (
              <Button onClick={() => setOpenDialog(false)} autoFocus>
                Close
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
};

export default PurchaseStockDetailEntry;
