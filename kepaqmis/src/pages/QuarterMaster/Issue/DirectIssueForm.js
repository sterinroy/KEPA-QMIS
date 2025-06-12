import React, { useEffect, useState } from 'react';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';

// ✅ Correct icon import
import CloseIcon from '@mui/icons-material/Close';

import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';
import './Issue.css';

import { useSelector, useDispatch } from 'react-redux';
import {
  updateField,
  resetForm,
  setInitialDates,
  submitDirectIssue,
} from '../../../redux/slices/directIssueSlice';

const SIDEBAR_WIDTH = 240;

const DirectIssueForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.directIssue);
  const { status, error, successMessage } = formData;

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openAddAnotherDialog, setOpenAddAnotherDialog] = useState(false);

  useEffect(() => {
    dispatch(setInitialDates());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField(name, value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenConfirmDialog(true); // Open confirmation dialog
  };

  const handleConfirmSubmit = () => {
    dispatch(submitDirectIssue(formData)); // Submit data
    setOpenConfirmDialog(false);
    setOpenAddAnotherDialog(true); // Ask if user wants to add more
  };

  const handleCloseDialog = () => {
    setOpenConfirmDialog(false);
  };

  const resetFormExceptIndent = () => {
    const indentNo = formData.indentNo;
    dispatch(resetForm()); // Resets all fields
    dispatch(updateField('indentNo', indentNo)); // Restore indent number
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
  };

  return (
    <>
      <div style={{ display: 'flex', backgroundColor: '#0C1227', minHeight: '100vh' }}>
        <Sidebar activeItem="issue" />
        <div style={{ marginLeft: SIDEBAR_WIDTH, flex: 1, paddingBottom: '4rem' }}>
          <Topbar />
          <div
            className="direct-issue-root"
            style={{
              backgroundColor: '#0C1227',
              minHeight: '100vh',
              padding: '2rem',
              paddingBottom: '5rem',
            }}
          >
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

              {/* Show alerts */}
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
                  sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
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
                  sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
                />
                <FormControl
                  fullWidth
                  required
                  sx={{ label: { color: 'white' }, svg: { color: 'white' }, fieldset: { borderColor: 'white' } }}
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
                  sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
                />
                <TextField
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
                />
                <TextField
                  label="Sub Category"
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
                />
                <TextField
                  label="Make/ Brand"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
                />
                <TextField
                  label="Model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
                />
                <TextField
                  label="Model No"
                  name="modelNo"
                  value={formData.modelNo}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
                />
                <TextField
                  label="Product No/ Serial No"
                  name="productNo"
                  value={formData.productNo}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
                />
                <TextField
                  label="Quantity"
                  type="number"
                  name="qty"
                  value={formData.qty}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
                />
                <FormControl
                  fullWidth
                  sx={{ label: { color: 'white' }, svg: { color: 'white' }, fieldset: { borderColor: 'white' } }}
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
                  sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
                />

                <Box display="flex" justifyContent="flex-end" mt={2} ml={60}>
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
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Confirm Submission
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Please review your details before submitting:
          </Typography>

          {Object.entries(formData).map(([key, value]) => {
            if (
              ['status', 'error', 'successMessage'].includes(key) ||
              value === '' ||
              typeof value === 'function'
            )
              return null;

            const label = labelMap[key] || key.replace(/([A-Z])/g, ' $1').trim();

            return (
              <Box key={key} display="flex" justifyContent="space-between" mb={1}>
                <Typography color="textSecondary">{label}:</Typography>
                <Typography>{value}</Typography>
              </Box>
            );
          })}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Edit
          </Button>
          <Button onClick={handleConfirmSubmit} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Another Item Dialog */}
      <Dialog
        open={openAddAnotherDialog}
        onClose={() => setOpenAddAnotherDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Add Another Item?
          <IconButton
            aria-label="close"
            onClick={() => setOpenAddAnotherDialog(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography>
            Do you want to add another item under the same Indent Number?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => {
              setOpenAddAnotherDialog(false);
              resetFormExceptIndent();
            }}
            color="primary"
            variant="contained"
          >
            Yes, Add Another
          </Button>
          <Button
            onClick={() => {
              setOpenAddAnotherDialog(false);
              dispatch(resetForm());
            }}
            color="inherit"
            variant="outlined"
          >
            No, Finish
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
};

export default DirectIssueForm;