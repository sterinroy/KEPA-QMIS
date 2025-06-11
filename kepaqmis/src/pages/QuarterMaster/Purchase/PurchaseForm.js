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
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Purchase.css";

const SIDEBAR_WIDTH = 240;

const PurchaseForm = () => {
  // Local state for form data
  const [formData, setFormData] = useState({
    orderNo: "",
    supplyOrderNo: "",
    invoiceDate: "",
    from: "",
    to: "",
    dateOfVerification: "",
    billInvoiceNo: "",
    amount: "",
    item: "",
    category: "",
    subCategory: "",
    qty: "",
    isPerishable: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, invoiceDate: today, dateOfVerification: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          backgroundColor: "#0C1227",
          minHeight: "100vh",
        }}
      >
        <Sidebar activeItem="purchase-form" />
        <div style={{ marginLeft: SIDEBAR_WIDTH, flex: 1 }}>
          <Topbar />
          {/* Scrollable Container */}
          <div
            className="purchase-root"
            style={{
              backgroundColor: "#0C1227",
              height: "calc(100vh - 64px)", // Adjust based on header height
              padding: "2rem",
              overflowY: "auto", // Enable vertical scrolling
            }}
          >
            <Box className="purchase-box">
              <Typography
                variant="h5"
                mb={3}
                fontWeight="bold"
                textAlign="center"
                color="white"
              >
                Purchase Details Entry Form
              </Typography>

              <form onSubmit={handleSubmit} className="mui-form">
                <TextField
                  label="Order No"
                  name="orderNo"
                  value={formData.orderNo}
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
                <TextField
                  label="Supply Order No"
                  name="supplyOrderNo"
                  value={formData.supplyOrderNo}
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
                <TextField
                  label="Invoice Date"
                  type="date"
                  name="invoiceDate"
                  value={formData.invoiceDate}
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
                <TextField
                  label="Bill Invoice No"
                  name="billInvoiceNo"
                  value={formData.billInvoiceNo}
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
                <TextField
                  label="Amount"
                  name="amount"
                  value={formData.amount}
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
                <TextField
                  label="From (Party Name)"
                  name="from"
                  value={formData.from}
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
                <TextField
                  label="To (Office/Company)"
                  name="to"
                  value={formData.to}
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
                <TextField
                  label="Date Of Verification"
                  type="date"
                  name="dateOfVerification"
                  value={formData.dateOfVerification}
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
                    mb: 2,
                  }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="perishable-label" sx={{ color: "white" }}>
                    Is Perishable? *
                  </InputLabel>
                  <Select
                    labelId="perishable-label"
                    name="isPerishable"
                    value={formData.isPerishable}
                    onChange={handleChange}
                    label="Is Perishable"
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
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
                {/* Submit Button */}
                <Box display="flex" justifyContent="flex-end" sx={{mt :0, ml:138}}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{
                      borderRadius: 2,
                      px: 8.3,
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
      </div>
    </>
  );
};

export default PurchaseForm;
