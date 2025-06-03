import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Issue.css';

const SIDEBAR_WIDTH = 240;

const Qouta = () => {
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
    subCategory: '',
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
    <div style={{ display: 'flex' }}>
      <Sidebar activeItem="qouta" />
      <div style={{ marginLeft: SIDEBAR_WIDTH, flex: 1 }}>
        <Topbar />
        <div
          className="if-issue-root"
          style={{
            backgroundColor: '#f9f9f9',
            minHeight: '100vh',
            padding: '2rem',
          }}
        >
          <Box className="if-issue-box">
            <Typography
              variant="h5"
              mb={3}
              fontWeight="bold"
              textAlign="center"
            >
              Qouta Entry Form
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
              />
              <TextField
                label="Item Name"
                name="item"
                value={formData.item}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Sub Category"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Quantity"
                type="number"
                name="qty"
                value={formData.qty}
                onChange={handleChange}
                required
                fullWidth
              />
              <FormControl fullWidth required>
                <InputLabel>Unit</InputLabel>
                <Select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                >
                  <MenuItem value="kg">Kilogram</MenuItem>
                  <MenuItem value="litre">Litre</MenuItem>
                  <MenuItem value="nos">Nos</MenuItem>
                  <MenuItem value="meter">Meter</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel>Issued From</InputLabel>
                <Select
                  name="fromChiefDistrictOrOther"
                  value={formData.fromChiefDistrictOrOther}
                  onChange={handleChange}
                >
                  <MenuItem value="Chief">Chief</MenuItem>
                  <MenuItem value="District">District</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Indent No"
                name="indentNo"
                value={formData.indentNo}
                onChange={handleChange}
                required
                fullWidth
              />
              <Box display="flex" justifyContent="flex-end" mt={2} mr={-79}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    borderRadius: 2,
                    px: 5,
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

export default Qouta;
