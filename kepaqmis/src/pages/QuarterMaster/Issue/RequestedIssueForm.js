import React, { useState, useEffect } from "react";
import { Switch, FormControlLabel } from "@mui/material";
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
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Issue.css";

const SIDEBAR_WIDTH = 20;

const unitOptions = [
  { value: "kg", label: "Kilogram" },
  { value: "litre", label: "Litre" },
  { value: "nos", label: "Nos" },
  { value: "meter", label: "Meter" },
];

const RequestedIssueForm = () => {
  const [formData, setFormData] = useState({
    qmSiNo: "",
    dateOfPurchase: "",
    item: "",
    category: "",
    subCategory: "",
    make: "",
    modelNo: "",
    productNo: "",
    quantity: "",
    quantityUnit: "",
    modelNo: "",
    purchaseOrderNo: "",
    reqNo: "",
    typeOfFund: "",
    amount: "",
  });

  const [perishableType, setPerishableType] = useState("non-perishable");

  // Set dateOfPurchase default to today's date in yyyy-mm-dd
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, dateOfPurchased: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [isPerishable, setIsPerishable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation example: check all fields filled
    for (const key in formData) {
      if (!formData[key]) {
        alert(`Please fill in the "${key}" field.`);
        return;
      }
    }
    alert("Transfer Successful!");
    console.log("Form Data:", formData);
    // Add your submit logic here
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#0C1227",
        minHeight: "100vh",
      }}
    >
      <Sidebar activeItem="issue" />
      <div style={{ marginLeft: SIDEBAR_WIDTH, flex: 1 }}>
        <Topbar />
        <div
          className="request-issue-root"
          style={{
            backgroundColor: "#0C1227",
            height: "calc(100vh - 64px)",
            padding: "2rem",
            overflowY: "auto",
          }}
        >
          <Box className="request-issue-box">
            <Typography
              variant="h5"
              mb={3}
              fontWeight="bold"
              textAlign="center"
              color="white"
            >
              Requested Issue Form
            </Typography>
            <form onSubmit={handleSubmit} className="mui-form">
              <TextField
                label="QM/SL. NO"
                name="qmSiNo"
                value={formData.qmSiNo}
                onChange={handleChange}
                required
                fullWidth
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
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
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                }}
              />
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
                }}
              />
              <TextField
                label="Category"
                name="category"
                value={formData.subCategory}
                onChange={handleChange}
                required
                fullWidth
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
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
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                }}
              />
              <TextField
                label="Make/ Brand"
                name="make"
                value={formData.subCategory}
                onChange={handleChange}
                required
                fullWidth
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                }}
              />
              <TextField
                label="Model"
                name="modelNo"
                value={formData.model}
                onChange={handleChange}
                required
                fullWidth
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                }}
              />
              <TextField
                label="Model No"
                name="modelNo"
                value={formData.subCategory}
                onChange={handleChange}
                required
                fullWidth
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                }}
              />
              <TextField
                label="Product No/ Serial No"
                name="productNo"
                value={formData.subCategory}
                onChange={handleChange}
                required
                fullWidth
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
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
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                }}
              />
              <FormControl
                fullWidth
                required
                sx={{
                  label: { color: "white" },
                  svg: { color: "white" },
                  fieldset: { borderColor: "white" },
                }}
              >
                <InputLabel sx={{ color: "white" }}>Unit</InputLabel>
                <Select
                  label="Unit"
                  name="quantityUnit"
                  value={formData.quantityUnit}
                  onChange={handleChange}
                  sx={{ color: "white" }}
                >
                  <MenuItem value="kg">Kilogram</MenuItem>
                  <MenuItem value="litre">Litre</MenuItem>
                  <MenuItem value="nos">Nos</MenuItem>
                  <MenuItem value="meter">Meter</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Purchase Order No"
                name="purchaseOrderNo"
                value={formData.purchaseOrderNo}
                onChange={handleChange}
                required
                fullWidth
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                }}
              />
              <TextField
                label="Request No"
                name="reqNo"
                value={formData.reqNo}
                onChange={handleChange}
                required
                fullWidth
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                }}
              />
              <TextField
                label="Type of Fund"
                name="typeOfFund"
                value={formData.typeOfFund}
                onChange={handleChange}
                required
                fullWidth
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                }}
              />
              <TextField
                label="Amount"
                name="amount"
                type="number"
                inputProps={{ min: 0 }}
                value={formData.amount}
                onChange={handleChange}
                required
                fullWidth
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                }}
              />
              <ToggleButtonGroup
                value={perishableType}
                exclusive
                onChange={(e, newValue) => {
                  if (newValue !== null) setPerishableType(newValue);
                }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <ToggleButton
                  value="perishable"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    "&.Mui-selected": {
                      backgroundColor: "#1976d2",
                      color: "white",
                    },
                  }}
                >
                  Perishable
                </ToggleButton>
                <ToggleButton
                  value="non-perishable"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    "&.Mui-selected": {
                      backgroundColor: "#1976d2",
                      color: "white",
                    },
                  }}
                >
                  Non-Perishable
                </ToggleButton>
              </ToggleButtonGroup>

              <Box
                display="flex"
                justifyContent="flex-end"
                sx={{ mt: 0, mb: 0, p: 0 }}
                style={{
                  marginTop: 0,
                  marginBottom: "5px",
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              >
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

export default RequestedIssueForm;
