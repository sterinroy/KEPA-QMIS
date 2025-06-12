import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submitTempStock } from "../../redux/actions/tempActions";
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import "./User.css";
import { green, red } from "@mui/material/colors";

const SendRequest = () => {
  const [formData, setFormData] = useState({
    PENNo: "",
    date: new Date().toISOString().split("T")[0],
    item: "",
    subCategory: "",
    qty: 1,
  });

  const [subCategories, setSubCategories] = useState({
    Electronics: ["Mobile", "Laptop", "Tablet"],
    Furniture: ["Chair", "Table", "Cabinet"],
    Stationery: ["Pen", "Notebook", "Marker"],
    Tools: ["Hammer", "Screwdriver", "Wrench"],
    Weapons: ["Pistol", "Rifle", "Shotgun"],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await dispatch(submitTempStock(formData));
      alert(message);
      navigate("/review", { state: { formData } });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData((prev) => ({
      ...prev,
      item: selectedCategory,
      subCategory: "",
    }));
  };

  const handleAddSubCategory = () => {
    const category = formData.item;
    if (!category) {
      alert("Please select an Item first.");
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
        alert("This Sub-Category already exists.");
      }
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          marginLeft: 240,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="send-box">
          <Box
            className="send-form"
            sx={{
              width: "10000",
             
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              backgroundColor: "#111C44",
            }}
          >
            <Typography
              variant="h5"
              mb={3}
              fontWeight="bold"
              textAlign="center"
              color="white"
            >
              Send Request
            </Typography>
            <form onSubmit={handleSubmit} className="mui-form">
              <TextField
                label="PEN No"
                name="PENNo"
                value={formData.PENNo}
                onChange={handleChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                fullWidth
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required sx={{ mb: 2 }}>
                  <InputLabel>Item</InputLabel>
                  <Select
                    name="item"
                    value={formData.item}
                    onChange={handleCategoryChange}
                    required
                    fullWidth
                    label="Item"
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Stationery">Stationery</MenuItem>
                    <MenuItem value="Furniture">Furniture</MenuItem>
                    <MenuItem value="Tools">Tools</MenuItem>
                    <MenuItem value="Weapons">Weapons</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={10} md={5}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <FormControl required sx={{ flex: 1 }}>
                    <InputLabel>Sub-Category</InputLabel>
                    <Select
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleChange}
                      label="Sub-Category"
                      fullWidth
                    >
                      {subCategories[formData.item]?.map((subCat, idx) => (
                        <MenuItem key={idx} value={subCat}>{subCat}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button 
                    className="plus purchase-form" 
                    variant="outlined"
                    onClick={handleAddSubCategory}
                    sx={{ 
                      minWidth: '40px', 
                      height: '56px',
                      p: 0,
                      '&:hover': {
                        backgroundColor: '#7551FF !important',
                        color: 'white !important',
                        borderColor: '#7551FF !important'
                      }
                    }}
                  >
                    +
                  </Button>
                </Box>
              </Grid>
              <TextField
                label="Quantity"
                type="number"
                name="qty"
                inputProps={{ min: 1 }}
                value={formData.qty}
                onChange={handleChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <Box display="flex" justifyContent="flex-end" mt={0.7}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    borderRadius: 2,
                    px: 5,
                    py: 0,
                    fontWeight: "bold",
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

export default SendRequest;