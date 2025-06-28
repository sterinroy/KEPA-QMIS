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

const defaultEntry = {
  orderNo: "",
  supplyOrderNo: "",
  invoiceDate: "",
  billInvoiceNo: "",
  verifyDate: "",
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
  dateOfPurchase: "",
  dateOfIssue: "",
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
        setFormData(defaultEntry);
      } else {
        alert("Error: " + result.error || result.message);
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#1e1e1e", color: "white" }}>
      <Typography variant="h5" gutterBottom>
        Requested Issue - Stock Entry Form
      </Typography>
      <Grid container spacing={2}>
        {[
          { name: "orderNo", label: "Order No" },
          { name: "supplyOrderNo", label: "Supply Order No" },
          { name: "invoiceDate", label: "Invoice Date", type: "date" },
          { name: "billInvoiceNo", label: "Bill Invoice No" },
          { name: "verifyDate", label: "Verify Date", type: "date" },
          { name: "itemName", label: "Item Name" },
          { name: "itemCategory", label: "Item Category" },
          { name: "itemSubCategory", label: "Item Subcategory" },
          { name: "quantity", label: "Quantity", type: "number" },
          { name: "unit", label: "Unit" },
          { name: "make", label: "Make" },
          { name: "model", label: "Model" },
          { name: "modelNo", label: "Model No" },
          { name: "warranty", label: "Warranty (months)" },
          { name: "typeofFund", label: "Type of Fund" },
          { name: "fromWhomPurchased", label: "Supplier" },
          { name: "toWhom", label: "To Whom (Office)" },
          { name: "amount", label: "Total Amount", type: "number" },
          { name: "dateOfPurchase", label: "Date of Purchase", type: "date" },
          { name: "dateOfIssue", label: "Date of Issue", type: "date" },
          { name: "serialNumber", label: "Serial Number" },
          { name: "verifiedBy", label: "Verified By PEN" },
          { name: "Qmno", label: "QM Number" },
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
                fieldset: { borderColor: "#ccc" },
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
              />
            }
            label="Is Perishable"
          />
        </Grid>

        {/* Amount Type */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Amount Type</InputLabel>
            <Select
              name="amountType"
              value={formData.amountType}
              onChange={handleChange}
              label="Amount Type"
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
              sx={{ input: { color: "white" }, label: { color: "white" } }}
            />
          </Grid>
        )}

        {formData.amountType === "Credit" && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Credit Status</InputLabel>
              <Select
                name="amountDetails.creditStatus"
                value={formData.amountDetails.creditStatus}
                onChange={handleChange}
                label="Credit Status"
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
