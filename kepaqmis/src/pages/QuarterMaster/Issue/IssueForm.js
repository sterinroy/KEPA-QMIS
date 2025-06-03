import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Typography,
  Paper,
} from '@mui/material';

const unitOptions = [
  { value: 'kg', label: 'Kilogram' },
  { value: 'litre', label: 'Litre' },
  { value: 'nos', label: 'Nos' },
  { value: 'meter', label: 'Meter' },
];

const IssueForm = () => {
  const [formData, setFormData] = useState({
    qmSiNo: '',
    dateOfPurchase: '',
    item: '',
    subCategory: '',
    quantity: '',
    quantityUnit: '',
    model: '',
    purchaseOrderNo: '',
    reqNo: '',
    typeOfFund: '',
    amount: '',
  });

  // Set dateOfPurchase default to today's date in yyyy-mm-dd
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData((prev) => ({ ...prev, dateOfPurchase: today }));
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
    // Simple validation example: check all fields filled
    for (const key in formData) {
      if (!formData[key]) {
        alert(`Please fill in the "${key}" field.`);
        return;
      }
    }
    alert('Transfer Successful!');
    console.log('Form Data:', formData);
    // Add your submit logic here
  };

  return (
    <Paper
  elevation={3}
  sx={{
    maxWidth: 1200,
    maxHeight: 520,
    overflowY: 'auto',       // Increased width
    margin: '40px auto',  // Add top & bottom margin
    p: 5,                 // Slightly more padding
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: 'white',
    flexDirection: 'column',
  }}
>

    
      <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center">
        Direct Issue Form
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          {/* QM/SL NO */}
          <Grid item xs={12} sm={6} sx={{ pr: 25}}>
            <TextField
              label="QM/SL. NO"
              name="qmSiNo"
              value={formData.qmSiNo}
              onChange={handleChange}
              fullWidth
              required
              sx={{
              minHeight: 60,       // increase height of input area
              '& .MuiInputBase-root': { height: 50 },  // adjust input box height specifically
              minWidth: 450,       // minimum width if needed (overrides fullWidth slightly)
              }}
            />
          </Grid>

          {/* Date of Purchase */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Purchase"
              name="dateOfPurchase"
              type="date"
              value={formData.dateOfPurchase}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
              sx={{
              minHeight: 60,       // increase height of input area
              '& .MuiInputBase-root': { height: 50 },  // adjust input box height specifically
              minWidth: 450,       // minimum width if needed (overrides fullWidth slightly)
              }}
            />
          </Grid>

          {/* Item */}
          <Grid item xs={12} sm={6} sx={{ pr: 25 }}>
            <TextField
              label="Item Name"
              name="item"
              value={formData.item}
              onChange={handleChange}
              fullWidth
              required
              sx={{
              minHeight: 60,       // increase height of input area
              '& .MuiInputBase-root': { height: 50 },  // adjust input box height specifically
              minWidth: 450,       // minimum width if needed (overrides fullWidth slightly)
              }}
            />
          </Grid>

          {/* Sub Category */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Sub Category *"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              fullWidth
              sx={{
              minHeight: 60,       // increase height of input area
              '& .MuiInputBase-root': { height: 50 },  // adjust input box height specifically
              minWidth: 450,       // minimum width if needed (overrides fullWidth slightly)
              }}
            />
          </Grid>

          {/* Quantity */}
          <Grid item xs={12} sm={6} sx={{ pr: 25 }}>
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              inputProps={{ min: 1 }}
              value={formData.quantity}
              onChange={handleChange}
              fullWidth
              required
              sx={{
              minHeight: 60,       // increase height of input area
              '& .MuiInputBase-root': { height: 50 },  // adjust input box height specifically
              minWidth: 450,       // minimum width if needed (overrides fullWidth slightly)
              }}
            />
          </Grid>

          {/* Quantity Unit */}
          <Grid item xs={12} sm={6} > 
            <FormControl  sx={{ width: 200 }} required>
              <InputLabel id="quantityUnit-label" >Unit</InputLabel>
              <Select
                labelId="quantityUnit-label"
                label="Unit"
                name="quantityUnit"
                value={formData.quantityUnit}
                onChange={handleChange}
              >
                
                {unitOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Model */}
          <Grid item xs={12} sm={6} sx={{ pr: 25 }}>
            <TextField
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              fullWidth
              required
              sx={{
              minHeight: 60,       // increase height of input area
              '& .MuiInputBase-root': { height: 50 },  // adjust input box height specifically
              minWidth: 450,       // minimum width if needed (overrides fullWidth slightly)
              }}
            />
          </Grid>

          {/* Purchase Order No */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Purchase Order No"
              name="purchaseOrderNo"
              value={formData.purchaseOrderNo}
              onChange={handleChange}
              fullWidth
              required
              sx={{
              minHeight: 60,       // increase height of input area
              '& .MuiInputBase-root': { height: 50 },  // adjust input box height specifically
              minWidth: 450,       // minimum width if needed (overrides fullWidth slightly)
              }}
            />
          </Grid>

          {/* Request No */}
          <Grid item xs={12} sm={6} sx={{ pr: 25 }}>
            <TextField
              label="Request No"
              name="reqNo"
              value={formData.reqNo}
              onChange={handleChange}
              fullWidth
              required
              sx={{
              minHeight: 60,       // increase height of input area
              '& .MuiInputBase-root': { height: 50 },  // adjust input box height specifically
              minWidth: 450,       // minimum width if needed (overrides fullWidth slightly)
              }}
            />
          </Grid>

          {/* Type of Fund */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Type of Fund"
              name="typeOfFund"
              value={formData.typeOfFund}
              onChange={handleChange}
              fullWidth
              required
              sx={{
              minHeight: 60,       // increase height of input area
              '& .MuiInputBase-root': { height: 50 },  // adjust input box height specifically
              minWidth: 450,       // minimum width if needed (overrides fullWidth slightly)
              }}
            />
          </Grid>

          {/* Amount */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Amount"
              name="amount"
              type="number"
              inputProps={{ min: 0 }}
              value={formData.amount}
              onChange={handleChange}
              fullWidth
              required
              sx={{
              minHeight: 60,       // increase height of input area
              '& .MuiInputBase-root': { height: 50 },  // adjust input box height specifically
              minWidth: 450,       // minimum width if needed (overrides fullWidth slightly)
              }}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            {/* Box wraps the button and nudges it slightly left */}
            <Box display="flex" justifyContent="flex-start" mt={0} ml={61} sx={{ pl: 3 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  borderRadius: 2,
                  px: 5,
                  py: 2,       // wider button
                  fontWeight: 'bold',
                }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};


export default IssueForm;
