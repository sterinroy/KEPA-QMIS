import React, { useEffect } from 'react';
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

  // Grab formData and status from redux store
  const formData = useSelector((state) => state.directIssue);
  const { status, error, successMessage } = formData;

  useEffect(() => {
    dispatch(setInitialDates());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField(name, value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitDirectIssue(formData));
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
      <Footer />
    </>
  );
};

export default DirectIssueForm;
