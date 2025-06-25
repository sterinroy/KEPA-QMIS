// RequestedIssueForm.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Typography,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Issue.css';

const RequestedIssueForm = () => {
  const [formData, setFormData] = useState({
    qmNo: '',
    dateOfPurchased: '',
    item: '',
    category: '',
    subCategory: '',
    make: '',
    model: '',
    modelNo: '',
    productNo: '',
    qty: '',
    quantityUnit: '',
    purchaseOrderNo: '',
    reqNo: '',
    typeOfFund: '',
    amount: '',
    perishableType: '',
    purchasingParty: '',
    invoiceNumber: '',
    verificationDate: '',
  });

  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData((prev) => ({
      ...prev,
      dateOfPurchased: today,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    setSuccessMessage('');
    setTimeout(() => {
      setShowConfirmModal(true);
      setStatus('idle');
    }, 500);
  };

  const handleAddMoreYes = () => {
    setEntries((prev) => [...prev, formData]);
    const today = new Date().toISOString().split('T')[0];
    setFormData((prev) => ({
      ...prev,
      dateOfPurchased: today,
      item: '',
      category: '',
      subCategory: '',
      make: '',
      model: '',
      modelNo: '',
      productNo: '',
      qty: '',
      quantityUnit: '',
      purchaseOrderNo: '',
      reqNo: '',
      typeOfFund: '',
      amount: '',
      perishableType: '',
      purchasingParty: '',
      invoiceNumber: '',
      verificationDate: '',
    }));
    setShowConfirmModal(false);
    setSuccessMessage('Item added. Ready to add another.');
    setStatus('succeeded');
  };

  const handleAddMoreNo = () => {
    setEntries((prev) => [...prev, formData]);
    setShowConfirmModal(false);
    setShowPreviewModal(true);
  };

  const handleFinalSubmit = () => {
    setFormData({
      qmNo: '',
      dateOfPurchased: new Date().toISOString().split('T')[0],
      item: '',
      category: '',
      subCategory: '',
      make: '',
      model: '',
      modelNo: '',
      productNo: '',
      qty: '',
      quantityUnit: '',
      purchaseOrderNo: '',
      reqNo: '',
      typeOfFund: '',
      amount: '',
      perishableType: '',
      purchasingParty: '',
      invoiceNumber: '',
      verificationDate: '',
    });
    setSuccessMessage('Form submitted successfully!');
    setShowPreviewModal(false);
    setStatus('succeeded');
  };

  const handleProceedings = () => {
    if (entries.length === 0) {
      alert('Please submit at least one item before proceeding.');
      return;
    }
    navigate('/proceedings', { state: { entries } });
  };
  const handleBailTicket = () => {
  if (entries.length === 0) {
    alert('Please submit at least one item before generating the Bail Ticket.');
    return;
  }
  navigate('/BailTicket', { state: { entries } });
};


  const labelMap = {
    qmNo: 'QM No.',
    dateOfPurchased: 'Date Of Purchased',
    item: 'Item',
    category: 'Category',
    subCategory: 'Sub Category',
    make: 'Make/ Brand',
    model: 'Model',
    modelNo: 'Model No',
    productNo: 'Product No',
    qty: 'Quantity',
    quantityUnit: 'Quantity Unit',
    purchaseOrderNo: 'Purchase Order No',
    reqNo: 'Request No',
    typeOfFund: 'Type Of Fund',
    amount: 'Amount',
    perishableType: 'Is Perishable',
    purchasingParty: 'Purchasing Party',
    invoiceNumber: 'Invoice Number',
    verificationDate: 'Tentative date',
  };

  return (
    <>
      <Box className="request-issue-box">
        <Typography variant="h5" mb={2} fontWeight="bold" textAlign="center" color="white">
          Requested Issue Form
        </Typography>

        {status === 'failed' && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {status === 'succeeded' && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

        <form onSubmit={handleSubmit} className="mui-form">
          {Object.entries(labelMap).map(([name, label]) => {
            if (name === 'quantityUnit' || name === 'perishableType') return null;
            const isDate = name === 'dateOfPurchased' || name === 'verificationDate';
            return (
              <TextField
                key={name}
                label={label}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                type={isDate ? 'date' : 'text'}
                InputLabelProps={isDate ? { shrink: true } : {}}
                required
                fullWidth
                sx={{
                  input: { color: 'white' },
                  label: { color: 'white' },
                  fieldset: { borderColor: 'white' },
                  mb: 1,
                }}
              />
            );
          })}

          <FormControl fullWidth sx={{ mb: 1, fieldset: { borderColor: 'white' } }}>
            <InputLabel sx={{ color: 'white' }}>Quantity Unit</InputLabel>
            <Select
              name="quantityUnit"
              value={formData.quantityUnit}
              onChange={handleChange}
              required
              sx={{ color: 'white' }}
            >
              <MenuItem value="kg">Kilogram</MenuItem>
              <MenuItem value="litre">Litre</MenuItem>
              <MenuItem value="nos">Nos</MenuItem>
              <MenuItem value="meter">Meter</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2, fieldset: { borderColor: 'white' } }}>
            <InputLabel sx={{ color: 'white' }}>Is Perishable</InputLabel>
            <Select
              name="perishableType"
              value={formData.perishableType}
              onChange={handleChange}
              required
              sx={{ color: 'white' }}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ borderRadius: 2, px: 8.3, py: 0, fontWeight: 'bold' }}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        </form>

        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleProceedings}
            sx={{ borderRadius: 2, px: 8.3, py: 0, fontWeight: 'bold' }}
          >
            Verification Board Proceedings
          </Button>
           <Button
    variant="contained"
    color="success"
    onClick={handleBailTicket}
    sx={{ borderRadius: 2, px: 4, py: 0, fontWeight: 'bold' }}
  >
    Generate Bail Ticket
  </Button>
        </Box>
      </Box>

      {showConfirmModal && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgcolor="rgba(0,0,0,0.6)"
          zIndex={9999}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box bgcolor="#fff" p={4} borderRadius={2} boxShadow={3} maxWidth="400px" textAlign="center">
            <Typography variant="h6" gutterBottom>
              Do you want to add more items under the same QM/ SL No.?
            </Typography>
            <Box mt={2}>
              <Button variant="contained" color="success" onClick={handleAddMoreYes} sx={{ mr: 2 }}>
                Yes
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleAddMoreNo}>
                No
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {showPreviewModal && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgcolor="rgba(0,0,0,0.6)"
          zIndex={9999}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box bgcolor="#fff" p={4} borderRadius={2} boxShadow={3} maxWidth="500px" width="100%">
            <Typography variant="h6" gutterBottom textAlign="center">
              Preview Entries
            </Typography>
            {entries.map((entry, index) => (
              <Box key={index} mb={2}>
                <Typography fontWeight="bold" mb={1}>Item {index + 1}</Typography>
                {Object.entries(entry).map(([key, value]) => {
                  if (!value) return null;
                  const label = labelMap[key] || key;
                  return (
                    <Box key={key} display="flex" justifyContent="space-between" mb={0.5}>
                      <Typography fontWeight="bold">{label}:</Typography>
                      <Typography>{value}</Typography>
                    </Box>
                  );
                })}
              </Box>
            ))}
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={() => setShowPreviewModal(false)} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleFinalSubmit}>
                Confirm Submit
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default RequestedIssueForm;
