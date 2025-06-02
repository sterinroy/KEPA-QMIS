import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { submitTempStock } from '../../../redux/actions/tempActions';

import Sidebar from './Sidebar';
import Topbar from './Topbar';

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

const Tempstockdetailentry = () => {
  const [formData, setFormData] = useState({
    slNo: '',
    PENNo: '',
    toWhom: '',
    dateOfissue: new Date().toISOString().split('T')[0],
    name: '',
    mobile: '',
    itemDescription: '',
    purpose: '',
    qty: 1,
    amount: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await dispatch(submitTempStock(formData));
      alert(message);
      navigate('/review', { state: { formData } });
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar />
        <Box sx={{ p: 5 }}>
          <Paper
            elevation={3}
            sx={{
              maxWidth: 1200,
              minHeight: 600,
              margin: '40px auto',
              p: 5,
              borderRadius: 3,
              backgroundColor: 'white',
            }}
          >
            <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center">
              Temporary Issue Form
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={3}>
                {/* Sl No */}
                <Grid item xs={12} sm={6} sx={{ pr: 25 }}>
                  <TextField
                    label="Sl No"
                    name="slNo"
                    value={formData.slNo}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    sx={{
                      minHeight: 60,
                      '& .MuiInputBase-root': { height: 50 },
                      minWidth: 450,
                    }}
                  />
                </Grid>

                {/* PEN No */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="PEN No"
                    name="PENNo"
                    value={formData.PENNo}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    sx={{
                      minHeight: 60,
                      '& .MuiInputBase-root': { height: 50 },
                      minWidth: 450,
                    }}
                  />
                </Grid>

                {/* Date of Issue */}
                <Grid item xs={12} sm={6} sx={{ pr: 25 }}>
                  <TextField
                    label="Date of Issue"
                    type="date"
                    name="dateOfissue"
                    value={formData.dateOfissue}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      minHeight: 60,
                      '& .MuiInputBase-root': { height: 50 },
                      minWidth: 450,
                    }}
                  />
                </Grid>

                {/* To Whom */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="To Whom"
                    name="toWhom"
                    value={formData.toWhom}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    sx={{
                      minHeight: 60,
                      '& .MuiInputBase-root': { height: 50 },
                      minWidth: 450,
                    }}
                  />
                </Grid>

                {/* Name */}
                <Grid item xs={12} sm={6} sx={{ pr: 25 }}>
                  <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    sx={{
                      minHeight: 60,
                      '& .MuiInputBase-root': { height: 50 },
                      minWidth: 450,
                    }}
                  />
                </Grid>

                {/* Mobile */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    sx={{
                      minHeight: 60,
                      '& .MuiInputBase-root': { height: 50 },
                      minWidth: 450,
                    }}
                  />
                </Grid>

                {/* Amount */}
                <Grid item xs={12} sm={6} sx={{ pr: 25 }}>
                  <TextField
                    label="Amount"
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    sx={{
                      minHeight: 60,
                      '& .MuiInputBase-root': { height: 50 },
                      minWidth: 450,
                    }}
                  />
                </Grid>

                {/* Item Description */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Item Description"
                    name="itemDescription"
                    value={formData.itemDescription}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    multiline
                    rows={3}
                    sx={{
                      minWidth: 450,
                    }}
                  />
                </Grid>

                {/* Purpose */}
                <Grid item xs={12} sm={6} sx={{ pr: 25 }}>
                  <TextField
                    label="Purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    multiline
                    rows={3}
                    sx={{
                      minWidth: 450,
                    }}
                  />
                </Grid>

                {/* Quantity */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Quantity"
                    type="number"
                    name="qty"
                    inputProps={{ min: 1 }}
                    value={formData.qty}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    sx={{
                      minHeight: 60,
                      '& .MuiInputBase-root': { height: 50 },
                      minWidth: 450,
                    }}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-start" mt={0} ml={61} sx={{ pl: 3 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{
                        borderRadius: 2,
                        px: 5,
                        py: 2,
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
        </Box>
      </Box>
    </Box>
  );
};

export default Tempstockdetailentry;
