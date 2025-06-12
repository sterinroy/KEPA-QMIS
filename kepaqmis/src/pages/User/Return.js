import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import "./User.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Return = () => {
  const [formData, setFormData] = useState({
    item: "",
    category: "",
    subCategory: "", // Starts blank
    quantity: "",
    dateOfReturn: "",
    penNo: "",
  });

  const [addedSubCategories, setAddedSubCategories] = useState([
    "Electronics",
    "Telecommunication",
    "Electrical",
    "IT",
  ]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, dateOfReturn: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubCategory = () => {
    if (formData.newSubCategory && formData.newSubCategory.trim() !== "") {
      setAddedSubCategories((prev) => [...prev, formData.newSubCategory]);
      setFormData((prev) => ({ ...prev, newSubCategory: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Return Request submitted:", formData);
    alert("Return Request submitted successfully!");
  };

  return (
    <>
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar activeItem="return" />
        <div
          className="mui-form"
          style={{
            backgroundColor: "#0C1227",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            width: "calc(100% - 260px)", // Adjust for sidebar width
            marginLeft: "260px", // Match sidebar width
            marginTop: "90px", // Match topbar height
          }}
        >
          <Box
            sx={{
              backgroundColor: "#111C44",
              borderRadius: "20px",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
              width: "100%",
              maxWidth: "600px",
              padding: "30px 40px 20px 40px",
            }}
          >
            <Typography
              variant="h5"
              mb={3}
              fontWeight="bold"
              textAlign="center"
              color="white"
            >
              Return Request Form
            </Typography>

            <form onSubmit={handleSubmit} noValidate>
              {/* PEN No */}
              <TextField
                label="PEN No."
                name="penNo"
                value={formData.penNo}
                onChange={handleChange}
                required
                fullWidth
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                  mb: 2,
                }}
              />

              {/* Date of Return */}
              <TextField
                label="Date of Return"
                type="date"
                name="dateOfReturn"
                value={formData.dateOfReturn}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                  mb: 2,
                }}
              />

              {/* Item */}
              <TextField
                label="Item"
                name="item"
                value={formData.item}
                onChange={handleChange}
                required
                fullWidth
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                  mb: 2,
                }}
              />

              {/* Category */}
              <TextField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                fullWidth
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                  mb: 2,
                }}
              />

              {/* Sub Category */}
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="sub-category-label" sx={{ color: "white" }}>
                  Sub Category *
                </InputLabel>
                <Select
                  labelId="sub-category-label"
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  label="Sub Category"
                  sx={{
                    color: "white",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                  }}
                >
                  {/* Placeholder Option */}
                  <MenuItem value="" disabled selected={!formData.subCategory}>
                    <em>Select Sub Category</em>
                  </MenuItem>

                  {/* Dynamic Options */}
                  {addedSubCategories.map((subcategory, index) => (
                    <MenuItem key={index} value={subcategory}>
                      {subcategory}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Add Subcategory Field and Button */}
              <Box sx={{ mb: 2, display: "flex", gap: 1, alignItems: "center" }}>
                <TextField
                  label="Add New Subcategory"
                  name="newSubCategory"
                  value={formData.newSubCategory || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, newSubCategory: e.target.value })
                  }
                  fullWidth
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    fieldset: { borderColor: "white" },
                    flex: 1,
                    minWidth: "200px",
                    maxWidth: "500px",
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddSubCategory}
                  sx={{
                    px: 4,
                    py: 1,
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  Add
                </Button>
              </Box>

              {/* Quantity */}
              <TextField
                label="Quantity"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                fullWidth
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                  mb: 2,
                }}
              />

              {/* Submit Button */}
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    borderRadius: 2,
                    px: 8,
                    py: 1,
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
    </>
  );
};

export default Return;