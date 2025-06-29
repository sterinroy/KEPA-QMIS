import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // Returns 'YYYY-MM-DD'
};

const defaultEntry = {
  orderNo: "",
  supplyOrderNo: "",
  invoiceDate: getTodayDate(),
  billInvoiceNo: "",
  verifyDate: getTodayDate(),
  itemName: "",
  itemCategory: "",
  itemSubCategory: "",
  quantity: "",
  unit: "",
  make: "",
  model: "",
  modelNo: "",
  warranty: "",
  typeofFund: "",
  fromWhomPurchased: "",
  toWhom: "",
  amount: "",
  amountType: "Cash",
  amountDetails: { cashAmount: 0, creditStatus: "Pending" },
  serialNumber: "",
  perishable: false,
  dateOfPurchase: getTodayDate(),
  dateOfIssue: getTodayDate(),
  verifiedBy: "",
  Qmno: "",
};

const QMIPurchase = () => {
  const [formData, setFormData] = useState(defaultEntry);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("amountDetails.")) {
      const subField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        amountDetails: {
          ...prev.amountDetails,
          [subField]: type === "checkbox" ? checked : value,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/stockRoutes/stock/requested-issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Successfully added to stock!");
        setFormData({
          ...defaultEntry,
          invoiceDate: getTodayDate(),
          verifyDate: getTodayDate(),
          dateOfPurchase: getTodayDate(),
          dateOfIssue: getTodayDate(),
        });
      } else {
        alert("Error: " + result.error || result.message);
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  return (
    <Box className="requested-issue-container">
      <Typography
        variant="h5"
        gutterBottom
        color="white"
        textAlign="center"
        sx={{ width: "100%", marginBottom: 3 }}
      >
        Requested Issue - Stock Entry Form
      </Typography>

      <Grid container spacing={2}>
        {[
          { name: "orderNo", label: "Order No." },
          { name: "supplyOrderNo", label: "Supply Order No." },
          { name: "invoiceDate", label: "Invoice Date", type: "date" },
          { name: "billInvoiceNo", label: "Bill Invoice No." },
          { name: "verifyDate", label: "Verify Date", type: "date" },
          { name: "itemName", label: "Item Name" },
          { name: "itemCategory", label: "Item Category" },
          { name: "itemSubCategory", label: "Item Subcategory" },
          { name: "quantity", label: "Quantity", type: "number" },
          { name: "unit", label: "Unit" },
          { name: "make", label: "Make/ Brand" },
          { name: "model", label: "Model" },
          { name: "modelNo", label: "Model No." },
          { name: "warranty", label: "Warranty (months)" },
          { name: "typeofFund", label: "Type of Fund" },
          { name: "fromWhomPurchased", label: "Supplier" },
          { name: "toWhom", label: "To Whom (Office)" },
          { name: "amount", label: "Total Amount", type: "number" },
          { name: "dateOfPurchase", label: "Date of Purchase", type: "date" },
          { name: "dateOfIssue", label: "Date of Issue", type: "date" },
          { name: "serialNumber", label: "Serial No." },
          { name: "verifiedBy", label: "Verified By PEN No." },
          { name: "Qmno", label: "QM No.", Width: 120},
        ].map((field) => (
          <Grid item xs={12} sm={6} key={field.name}>
            <TextField
              fullWidth
              type={field.type || "text"}
              name={field.name}
              label={field.label}
              value={formData[field.name]}
              onChange={handleChange}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                fieldset: { borderColor: "#4a5b76" },
              }}
            />
          </Grid>
        ))}

        {/* Perishable Checkbox */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.perishable}
                onChange={handleChange}
                name="perishable"
                sx={{
                  color: "white",
                  "&.Mui-checked": { color: "white" },
                }}
              />
            }
            label="Perishable"
            sx={{ color: "white" }}
          />
        </Grid>

        {/* Amount Type */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: "white" }}>Amount Type</InputLabel>
            <Select
              name="amountType"
              value={formData.amountType}
              onChange={handleChange}
              label="Amount Type"
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4a5b76",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#8e9fbf",
                },
              }}
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Credit">Credit</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {formData.amountType === "Cash" && (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="amountDetails.cashAmount"
              label="Cash Amount"
              type="number"
              value={formData.amountDetails.cashAmount}
              onChange={handleChange}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                fieldset: { borderColor: "#4a5b76" },
              }}
            />
          </Grid>
        )}

        {formData.amountType === "Credit" && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: "white" }}>Credit Status</InputLabel>
              <Select
                name="amountDetails.creditStatus"
                value={formData.amountDetails.creditStatus}
                onChange={handleChange}
                label="Credit Status"
                sx={{
                  color: "white",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#4a5b76",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8e9fbf",
                  },
                }}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#007bff",
              "&:hover": { backgroundColor: "#0056b3" },
              borderRadius: 2,
              px: 4,
              py: 1,
              ml: 63,
              mt: 3,
              color: "white",
            }}
          >
            Submit to Stock
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QMIPurchase;