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

  // Set today's date on load
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
    setSuccessMessage('');

    setTimeout(() => {
      setShowConfirmModal(true);
      setStatus('idle');
    }, 500);
  };

  const handleAddMoreYes = () => {
    const today = new Date().toISOString().split('T')[0];
    const currentIndentNo = formData.indentNo;

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
      indentNo: currentIndentNo,
      perishableType: '', // ✅ Resetting same key
    });

    setShowConfirmModal(false);
    setSuccessMessage('Ready to add another item with the same indent.');
    setStatus('succeeded');
  };

  const handleAddMoreNo = () => {
    setShowConfirmModal(false);
    setShowPreviewModal(true);
  };

  const handleFinalSubmit = () => {
    console.log('Form Data Submitted:', formData);

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
      perishableType: '', // ✅ Clearing after submit
    });

    setShowPreviewModal(false);
    setSuccessMessage('Form submitted successfully!');
    setStatus('succeeded');
  };

  const labelMap = {
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
    indentNo: 'Indent No',
    perishableType: 'Is Perishable',
  };

  return (
    <>
      <Box className="direct-issue-box">
        <Typography
          variant="h5"
          mb={2}
          fontWeight="bold"
          textAlign="center"
          color="white"
        >
          Direct Issue Form
        </Typography>

        {/* Show success or error alerts */}
        {status === 'failed' && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {status === 'succeeded' && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="mui-form">
          <TextField
            label="Date of Issue"
            type="date"
            name="dateOfIssue"
            value={formData.dateOfIssue}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />
          <TextField
            label="Date of Purchased"
            type="date"
            name="dateOfPurchased"
            value={formData.dateOfPurchased}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />
          <FormControl
            fullWidth
            required
            sx={{
              label: { color: 'white' },
              svg: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          >
            <InputLabel sx={{ color: 'white' }}>Issued From</InputLabel>
            <Select
              name="fromChiefDistrictOrOther"
              value={formData.fromChiefDistrictOrOther}
              onChange={handleChange}
              sx={{ color: 'white' }}
            >
              <MenuItem value="Chief">Chief</MenuItem>
              <MenuItem value="District">District</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Item"
            name="item"
            value={formData.item}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />
          <TextField
            label="Sub Category"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />
          <TextField
            label="Make/ Brand"
            name="make"
            value={formData.make}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />
          <TextField
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />
          <TextField
            label="Model No"
            name="modelNo"
            value={formData.modelNo}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />
          <TextField
            label="Product No/ Serial No"
            name="productNo"
            value={formData.productNo}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />
          <TextField
            label="Quantity"
            type="number"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />
          <FormControl
            fullWidth
            sx={{
              label: { color: 'white' },
              svg: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          >
            <InputLabel sx={{ color: 'white' }}>Unit</InputLabel>
            <Select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              sx={{ color: 'white' }}
            >
              <MenuItem value="kg">Kilogram</MenuItem>
              <MenuItem value="litre">Litre</MenuItem>
              <MenuItem value="nos">Nos</MenuItem>
              <MenuItem value="meter">Meter</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Indent No"
            name="indentNo"
            value={formData.indentNo}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              input: { color: 'white' },
              label: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          />

          {/* ✅ Is Perishable Dropdown - Already Correct */}
          <FormControl
            fullWidth
            required
            sx={{
              label: { color: 'white' },
              svg: { color: 'white' },
              fieldset: { borderColor: 'white' },
            }}
          >
            <InputLabel sx={{ color: 'white' }}>Is Perishable</InputLabel>
            <Select
              name="perishableType"
              value={formData.perishableType}
              onChange={handleChange}
              sx={{ color: 'white' }}
            >
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

      {/* 🧨 Modal: Confirm Add More Items */}
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
          <Box
            bgcolor="#fff"
            p={4}
            borderRadius={2}
            boxShadow={3}
            maxWidth="400px"
            textAlign="center"
          >
            <Typography variant="h6" gutterBottom>
              Do you want to add more items under the same Indent Number?
            </Typography>
            <Box mt={2}>
              <Button
                variant="contained"
                color="success"
                onClick={handleAddMoreYes}
                sx={{ mr: 2 }}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleAddMoreNo}
              >
                No
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* 🧾 Modal: Preview Before Submit */}
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
          <Box
            bgcolor="#fff"
            p={4}
            borderRadius={2}
            boxShadow={3}
            maxWidth="500px"
            width="100%"
          >
            <Typography variant="h6" gutterBottom textAlign="center">
              Confirm Submission
            </Typography>
            <Box mb={2}>
              {Object.entries(formData).map(([key, value]) => {
                if (!value) return null;
                const label = labelMap[key] || key;
                return (
                  <Box key={key} display="flex" justifyContent="space-between" mb={1}>
                    <Typography fontWeight="bold">{label}:</Typography>
                    <Typography>{value}</Typography>
                  </Box>
                );
              })}
            </Box>
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

export default DirectIssueForm;