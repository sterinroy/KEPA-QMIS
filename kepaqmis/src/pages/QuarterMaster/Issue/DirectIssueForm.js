import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import jsPDF from 'jspdf';
import './Issue.css';

const DirectIssueForm = () => {
  const [formData, setFormData] = useState({
    dateOfIssue: '',
    dateOfPurchased: '',
    fromChiefDistrictOrOther: '',
    item: '',
    category: '',
    subCategory: '',
    make: '',
    model: '',
    modelNo: '',
    productNo: '',
    qty: '',
    unit: '',
    indentNo: '',
    perishableType: '',
  });

  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);

  // ✅ List of submitted items under same indent number
  const [submittedItems, setSubmittedItems] = useState([]);

  const [labelMap] = useState({
    dateOfIssue: 'Date of Issue',
    dateOfPurchased: 'Date of Purchased',
    fromChiefDistrictOrOther: 'Issued From',
    item: 'Item',
    category: 'Category',
    subCategory: 'Sub Category',
    make: 'Make / Brand',
    model: 'Model',
    modelNo: 'Model No',
    productNo: 'Product No / Serial No',
    qty: 'Quantity',
    unit: 'Unit',
    perishableType: 'Is Perishable',
    indentNo: 'Indent No'
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData((prev) => ({
      ...prev,
      dateOfIssue: today,
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

    setTimeout(() => {
      // Add current data to list
      setSubmittedItems((prev) => [...prev, formData]);
      setShowConfirmModal(true);
      setStatus('idle');
    }, 500);
  };

  const handleAddMoreYes = () => {
    const today = new Date().toISOString().split('T')[0];

    setFormData((prev) => ({
      ...prev,
      dateOfIssue: today,
      dateOfPurchased: today,
      fromChiefDistrictOrOther: '',
      item: '',
      category: '',
      subCategory: '',
      make: '',
      model: '',
      modelNo: '',
      productNo: '',
      qty: '',
      unit: '',
      perishableType: '',
    }));

    setShowConfirmModal(false);
    setSuccessMessage('Ready to add another item with the same indent.');
    setStatus('succeeded');
  };

  const handleAddMoreNo = () => {
    setShowConfirmModal(false);
    setShowPreviewModal(true);
  };

  const handleFinalSubmit = () => {
    setShowPreviewModal(false);
    setShowPdfModal(true);
  };

  const generateAndDownloadPDF = () => {
    const doc = new jsPDF();

    const indentNumber = formData.indentNo || 'N/A';
    doc.setFontSize(16);
    doc.text(`Indent Number: ${indentNumber}`, 20, 20);
    doc.setFontSize(14);
    doc.text("Submitted Items", 20, 30);
    doc.setFontSize(10);

    let y = 40;

    submittedItems.forEach((item, index) => {
      doc.text(`Item #${index + 1}:`, 20, y);
      y += 5;
      Object.entries(item).forEach(([key, value]) => {
        if (value && key !== 'dateOfIssue' && key !== 'dateOfPurchased') {
          doc.text(`${labelMap[key] || key}: ${value}`, 25, y);
          y += 5;
        }
      });
      y += 10;
    });

    doc.save(`form_entry_indent_${indentNumber}.pdf`);
    resetFormAndState();
  };

  const resetFormAndState = () => {
    const today = new Date().toISOString().split('T')[0];
    setFormData({
      dateOfIssue: today,
      dateOfPurchased: today,
      fromChiefDistrictOrOther: '',
      item: '',
      category: '',
      subCategory: '',
      make: '',
      model: '',
      modelNo: '',
      productNo: '',
      qty: '',
      unit: '',
      indentNo: '',
      perishableType: '',
    });

    setSubmittedItems([]);
    setSuccessMessage('Form submitted successfully!');
    setStatus('succeeded');
    setShowPdfModal(false);
  };

  return (
    <>
      <Box className="direct-issue-box">
        <Typography variant="h5" mb={2} fontWeight="bold" textAlign="center" color="white">
          Direct Issue Form
        </Typography>

        {/* Alerts */}
        {status === 'failed' && <Alert severity="error">{error}</Alert>}
        {status === 'succeeded' && <Alert severity="success">{successMessage}</Alert>}

        <form onSubmit={handleSubmit} className="mui-form">
          <TextField label="Date of Issue" type="date" name="dateOfIssue"
            value={formData.dateOfIssue}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required fullWidth sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />

          <TextField label="Date of Purchased" type="date" name="dateOfPurchased"
            value={formData.dateOfPurchased}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required fullWidth sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />

          <FormControl fullWidth required sx={{ label: { color: 'white' }, svg: { color: 'white' }, fieldset: { borderColor: 'white' } }}>
            <InputLabel sx={{ color: 'white' }}>Issued From</InputLabel>
            <Select name="fromChiefDistrictOrOther"
              value={formData.fromChiefDistrictOrOther}
              onChange={handleChange}
              sx={{ color: 'white' }}
            >
              <MenuItem value="Chief">Chief</MenuItem>
              <MenuItem value="District">District</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <TextField label="Item" name="item"
            value={formData.item}
            onChange={handleChange}
            required fullWidth sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />

          <TextField label="Category" name="category"
            value={formData.category}
            onChange={handleChange}
            required fullWidth sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />

          <TextField label="Sub Category" name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            required fullWidth sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />

          <TextField label="Make/ Brand" name="make"
            value={formData.make}
            onChange={handleChange}
            required fullWidth sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />

          <TextField label="Model" name="model"
            value={formData.model}
            onChange={handleChange}
            required fullWidth sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />

          <TextField label="Model No" name="modelNo"
            value={formData.modelNo}
            onChange={handleChange}
            required fullWidth sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />

          <TextField label="Product No/Serial No" name="productNo"
            value={formData.productNo}
            onChange={handleChange}
            required fullWidth sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />

          <TextField label="Quantity" type="number" name="qty"
            value={formData.qty}
            onChange={handleChange}
            required fullWidth sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />

          <FormControl fullWidth sx={{ label: { color: 'white' }, svg: { color: 'white' }, fieldset: { borderColor: 'white' }, }}>
            <InputLabel sx={{ color: 'white' }}>Unit</InputLabel>
            <Select name="unit" value={formData.unit} onChange={handleChange} sx={{ color: 'white' }}>
              <MenuItem value="kg">Kilogram</MenuItem>
              <MenuItem value="litre">Litre</MenuItem>
              <MenuItem value="nos">Nos</MenuItem>
              <MenuItem value="meter">Meter</MenuItem>
            </Select>
          </FormControl>

          <TextField label="Indent No" name="indentNo"
            value={formData.indentNo}
            onChange={handleChange}
            required fullWidth sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />

          <FormControl fullWidth required sx={{ label: { color: 'white' }, svg: { color: 'white' }, fieldset: { borderColor: 'white' }, }}>
            <InputLabel sx={{ color: 'white' }}>Is Perishable</InputLabel>
            <Select name="perishableType" value={formData.perishableType} onChange={handleChange} sx={{ color: 'white' }}>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>

          <Box display="flex" justifyContent="flex-end" mt={2} ml={77}>
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
      </Box>

      {/* Modal: Confirm Add More Items */}
      {showConfirmModal && (
        <Box position="fixed" top="0" left="0" width="100%" height="100%"
          bgcolor="rgba(0,0,0,0.6)" zIndex={9999} display="flex"
          justifyContent="center" alignItems="center"
        >
          <Box bgcolor="#fff" p={4} borderRadius={2} boxShadow={3} maxWidth="400px" textAlign="center">
            <Typography variant="h6" gutterBottom>
              Do you want to add more items under the same Indent Number?
            </Typography>
            <Box mt={2}>
              <Button variant="contained" color="success" onClick={handleAddMoreYes} sx={{ mr: 2 }}>Yes</Button>
              <Button variant="outlined" color="secondary" onClick={handleAddMoreNo}>No</Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* Modal: Preview Before Submit */}
      {showPreviewModal && (
        <Box position="fixed" top="0" left="0" width="100%" height="100%"
          bgcolor="rgba(0,0,0,0.6)" zIndex={9999} display="flex"
          justifyContent="center" alignItems="center"
        >
          <Box bgcolor="#fff" p={4} borderRadius={2} boxShadow={3} maxWidth="500px" width="100%">
            <Typography variant="h6" gutterBottom textAlign="center">Confirm Submission</Typography>
            <Box mb={2}>
              {Object.entries(formData).map(([key, value]) => {
                if (!value) return null;
                return (
                  <Box key={key} display="flex" justifyContent="space-between" mb={1}>
                    <Typography fontWeight="bold">{labelMap[key] || key}:</Typography>
                    <Typography>{value}</Typography>
                  </Box>
                );
              })}
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={() => setShowPreviewModal(false)} sx={{ mr: 2 }}>Cancel</Button>
              <Button variant="contained" color="primary" onClick={handleFinalSubmit}>
                Confirm Submit
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* Modal: Generate PDF? */}
      {showPdfModal && (
        <Box position="fixed" top="0" left="0" width="100%" height="100%"
          bgcolor="rgba(0,0,0,0.6)" zIndex={9999} display="flex"
          justifyContent="center" alignItems="center"
        >
          <Box bgcolor="#fff" p={4} borderRadius={2} boxShadow={3} maxWidth="400px" textAlign="center">
            <Typography variant="h6" gutterBottom>
              Would you like to generate a PDF of this entry?
            </Typography>
            <Box mt={2}>
              <Button variant="contained" color="primary"
                onClick={generateAndDownloadPDF}
                sx={{ mr: 2 }}
              >
                Yes, Download PDF
              </Button>
              <Button variant="outlined" color="secondary"
                onClick={resetFormAndState}
              >
                No, Skip
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default DirectIssueForm;