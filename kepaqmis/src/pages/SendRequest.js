import React, { useState } from 'react';
import './SendRequest.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Box,
} from '@mui/material';

const SendRequest = () => {
  const [activeNav, setActiveNav] = useState('sendrequest');
  const [formData, setFormData] = useState({
    penNo: '',
    date: '',
    item: '',
    subCategory: '',
    qty: 1,
  });

  const [subCategories, setSubCategories] = useState({
    Electronics: ['Mobile', 'Laptop', 'Tablet'],
    Stationery: ['Pen', 'Notebook', 'Stapler'],
    Weapons: ['Pistol', 'Rifle', 'Ammunition'],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    if (!category) {
      alert('Please select an Item first.');
      return;
    }
    const newSubCategory = prompt(`Add new Sub-Category under "${category}":`);
    if (newSubCategory) {
      if (!subCategories[category].includes(newSubCategory)) {
        setSubCategories((prev) => ({
          ...prev,
          [category]: [...prev[category], newSubCategory],
        }));
        setFormData((prev) => ({
          ...prev,
          subCategory: newSubCategory,
        }));
      } else {
        alert('This Sub-Category already exists.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      Pen_no: formData.penNo,
      date: formData.date,
      item: formData.item,
      sub_category: formData.subCategory,
      quantity: parseInt(formData.qty, 10),
    };

    fetch('http://localhost:3001/User', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((resData) => {
        alert(resData.message);
        setFormData({
          penNo: '',
          date: '',
          item: '',
          subCategory: '',
          qty: 1,
        });
      })
      .catch((err) => alert('Error: ' + err.message));
  };

  return (
    <div className="container">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      
      <main className="main">
        <Topbar userName="ABCD" />

        <Box className="purchase-form" sx={{ backgroundColor: '#fff', p: 4, borderRadius: 2, boxShadow: 2 }}>
          <h3>Send Request</h3>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Row 1 */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Pen No"
                  name="penNo"
                  fullWidth
                  required
                  value={formData.penNo}
                  onChange={handleInputChange}
                  sx={{ width: 500 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Date"
                  type="date"
                  name="date"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  value={formData.date}
                  onChange={handleInputChange}
                  sx={{ width: 500 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Item</InputLabel>
                  <Select
                    name="item"
                    value={formData.item}
                    onChange={handleCategoryChange}
                    label="Item"
                    sx={{ width: 500 }}
                  >
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Stationery">Stationery</MenuItem>
                    <MenuItem value="Weapons">Weapons</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Row 5 - Sub-Category and + button */}
              <Grid item xs={10} md={5}>
                <FormControl fullWidth required>
                  <InputLabel>Sub-Category</InputLabel>
                  <Select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    label="Sub-Category"
                    sx={{ width: 425 }}
                  >
                    {subCategories[formData.item]?.map((subCat, idx) => (
                      <MenuItem key={idx} value={subCat}>{subCat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2} md={1}>
                <Button variant="outlined" fullWidth onClick={handleAddSubCategory}>
                  +
                </Button>
              </Grid>

              {/* Row 6 */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Quantity"
                  type="number"
                  name="qty"
                  fullWidth
                  required
                  inputProps={{ min: 1 }}
                  value={formData.qty}
                  onChange={handleInputChange}
                  sx={{ width: 500 }}
                />
              </Grid>
            </Grid>

            <Button className="sub-but" type="submit" variant="contained" color="success" sx={{ mt: 4 }}>
              Submit
            </Button>
          </form>
        </Box>
      </main>
    </div>
  );
};

export default SendRequest;