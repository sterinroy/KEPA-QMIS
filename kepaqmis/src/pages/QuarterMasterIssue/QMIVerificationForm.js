// src/pages/QuarterMasterIssue/QMIVerificationForm.js
import React, { useState, useEffect } from "react";
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
} from "@mui/material";

const QMIVerificationForm = ({ onClose, onSubmit, prefillData }) => {
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
    unit: "",
    qmNO: "",
    dateOfPurchased: "",
    invoiveNumber: "",
    warranty: "",
    warrantyPeriod: "",
    warrantyType: "",
    perishableType: "",
    ...prefillData,
  });

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Set initial date values
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      dateOfVerification: prev.dateOfVerification || today,
      dateOfPurchased: prev.dateOfPurchased || today,
      invoiceDate: prev.invoiceDate || today,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData = {
      ...formData,
      [name]: value,
    };

    if (name === "warranty" && value === "No") {
      updatedData = {
        ...updatedData,
        warrantyPeriod: "",
        warrantyType: "",
      };
    }

    setFormData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const labelMap = {
    orderNo: "Order No.",
    supplyOrderNo: "Supply Order No.",
    invoiceDate: "Date Of Invoice",
    from: "Supplier Name",
    to: "To (Office/Company)",
    dateOfVerification: "Date Of Verification",
    billInvoiceNo: "Bill Invoice No.",
    amount: "Amount",
    item: "Item",
    category: "Category",
    subCategory: "Sub Category",
    qty: "Quantity",
    unit: "Unit",
    qmNO: "QM No.",
    dateOfPurchased: "Date Of Purchase",
    invoiveNumber: "Invoice Number",
    warranty: "Warranty",
    warrantyPeriod: "Warranty Period",
    warrantyType: "Warranty Type",
    perishableType: "Is Perishable",
  };

  return (
    <Box className="verify-issue-box">
      <Typography
        variant="h5"
        mb={2}
        fontWeight="bold"
        textAlign="center"
        color="white"
      >
        Verification Form
      </Typography>

      {/* Show alerts */}
      {status === "failed" && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {status === "succeeded" && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="mui-form">
        <TextField
          label="Order No."
          name="orderNo"
          value={formData.orderNo}
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
          label="Supply Order No."
          name="supplyOrderNo"
          value={formData.supplyOrderNo}
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
          label="Bill Invoice No."
          name="billInvoiceNo"
          value={formData.billInvoiceNo}
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
          label="Date Of Invoice"
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
          }}
        />
        <TextField
          label="Invoice Number"
          name="invoiveNumber"
          value={formData.invoiveNumber}
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
          label="Supplier Name"
          name="from"
          value={formData.from}
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
          label="To (Office/ Company)"
          name="to"
          value={formData.to}
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
          value={formData.category}
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
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            sx={{ color: "white" }}
          >
            <MenuItem value="Nos">Nos</MenuItem>
            <MenuItem value="Litre">Litre</MenuItem>
            <MenuItem value="Kilogram">Kilogram</MenuItem>
            <MenuItem value="Meter">Meter</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="QM No."
          name="qmNO"
          value={formData.qmNO}
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
          label="Date Of Purchase"
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

        <FormControl
          fullWidth
          required
          sx={{
            label: { color: "white" },
            svg: { color: "white" },
            fieldset: { borderColor: "white" },
          }}
        >
          <InputLabel sx={{ color: "white" }}>Warranty</InputLabel>
          <Select
            name="warranty"
            value={formData.warranty}
            onChange={handleChange}
            sx={{ color: "white" }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>

        {formData.warranty === "Yes" && (
          <>
            <TextField
              label="Warranty Period (in months)"
              type="number"
              name="warrantyPeriod"
              value={formData.warrantyPeriod}
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
              <InputLabel sx={{ color: "white" }}>Warranty Type</InputLabel>
              <Select
                name="warrantyType"
                value={formData.warrantyType}
                onChange={handleChange}
                sx={{ color: "white" }}
              >
                <MenuItem value="On-Site">On-Site</MenuItem>
                <MenuItem value="Replacement">Replacement</MenuItem>
                <MenuItem value="Pickup & Drop">Pickup & Drop</MenuItem>
              </Select>
            </FormControl>
          </>
        )}

        <FormControl
          fullWidth
          required
          sx={{
            label: { color: "white" },
            svg: { color: "white" },
            fieldset: { borderColor: "white" },
          }}
        >
          <InputLabel sx={{ color: "white" }}>Is Perishable</InputLabel>
          <Select
            name="perishableType"
            value={formData.perishableType}
            onChange={handleChange}
            sx={{ color: "white" }}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>

        {/* Submit Button */}
        <Box display="flex" justifyContent="flex-start" mt={2} ml={62}>
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
            {status === "loading" ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default QMIVerificationForm;
