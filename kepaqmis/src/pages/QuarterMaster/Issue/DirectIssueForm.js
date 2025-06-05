import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Issue.css';

const SIDEBAR_WIDTH = 240;

const DirectIssueForm = () => {
  const getTodayDateISO = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [formData, setFormData] = useState({
    dateOfIssue: '',
    dateOfPurchased: '',
    item: '',
    category:'',
    subCategory: '',
    make:'',
    model:'',
    modelNo:'',
    productNo:'',
    qty: '',
    unit: '',
    fromChiefDistrictOrOther: '',
    indentNo: '',
  });

  useEffect(() => {
    const todayISO = getTodayDateISO();
    setFormData((prev) => ({
      ...prev,
      dateOfIssue: todayISO,
      dateOfPurchased: todayISO,
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
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#0C1227', minHeight: '100vh' }}>
      <Sidebar activeItem="issue" />
      <div style={{ marginLeft: SIDEBAR_WIDTH, flex: 1 }}>
        <Topbar />
        <div
          className="direct-issue-root"
          style={{
            backgroundColor: '#0C1227',
            minHeight: '100vh',
            padding: '2rem',
          }}
        >
          <Box className="direct-issue-box">
            <Typography
              variant="h5"
              mb={3}
              fontWeight="bold"
              textAlign="center"
              color="white"
            >
              Direct Issue Form
            </Typography>
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
                            <FormControl fullWidth required sx={{ label: { color: 'white' }, svg: { color: 'white' }, fieldset: { borderColor: 'white' } }}>
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
                value={formData.subCategory}
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
                value={formData.subCategory}
                onChange={handleChange}
                required
                fullWidth
                sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
              />
              <TextField
                label="Model"
                name="model"
                value={formData.subCategory}
                onChange={handleChange}
                required
                fullWidth
                sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
              />
              <TextField
                label="Model No"
                name="modelNo"
                value={formData.subCategory}
                onChange={handleChange}
                required
                fullWidth
                sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
              />
              <TextField
                label="Product No/ Seriel No"
                name="productNo"
                value={formData.subCategory}
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
              <FormControl sx={{ label: { color: 'white' }, svg: { color: 'white' }, fieldset: { borderColor: 'white' } }}>
                <InputLabel sx={{ color: 'white' }}>Unit</InputLabel>
                <Select
                  name="unit"
                  value={formData.quantityUnit}
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
                  sx={{
                    borderRadius: 2,
                    px: 8.3,
                    py: 0,
                    fontWeight: 'bold',
                  }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default DirectIssueForm;
