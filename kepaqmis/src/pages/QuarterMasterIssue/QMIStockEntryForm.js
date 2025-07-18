// File: QMIStockEntryForm.js
import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const initialState = {
  sourceType: "direct-issue",
  orderNo: "",
  supplyOrderNo: "",
  invoiceDate: "",
  billInvoiceNo: "",
  verifyDate: "",
  Qmno: "",
  itemName: "",
  itemCategory: "",
  itemSubCategory: "",
  quantity: "",
  unit: "",
  make: "",
  model: "",
  modelNo: "",
  fromWhomPurchased: "",
  toWhom: "",
  warranty: "",
  typeofFund: "",
  amount: "",
  amountType: "Cash",
  amountDetails: { cashAmount: "", creditStatus: "Pending" },
  enteredBy: { pen: "", name: "" },
  serialNumber: "",
  dateOfVerification: "",
  verifiedBy: { pen: "" },
  perishable: false,
  dateOfPurchase: "",
  dateOfIssue: "",
  issuedfrom: "",
  indentNo: "",
};

// Map raw keys to user-friendly labels
const labelMap = {
  sourceType: "Source Type",
  orderNo: "Order No.",
  supplyOrderNo: "Supply Order No.",
  invoiceDate: "Invoice Date",
  billInvoiceNo: "Bill Invoice No.",
  verifyDate: "Verify Date",
  Qmno: "QM No.",
  itemName: "Item Name",
  itemCategory: "Item Category",
  itemSubCategory: "Item Subcategory",
  quantity: "Quantity",
  unit: "Unit",
  make: "Make / Brand",
  model: "Model",
  modelNo: "Model No.",
  fromWhomPurchased: "Supplier Name",
  toWhom: "To (Office/ Company)",
  warranty: "Warranty (In Months)",
  typeofFund: "Type of Fund",
  amount: "Total Amount",
  amountType: "Amount Type",
  cashAmount: "Cash Amount",
  creditStatus: "Credit Status",
  pen: "PEN No.",
  name: "Name",
  serialNumber: "Serial No.",
  dateOfVerification: "Date of Verification",
  verifiedByPen: "Verified By (PEN No.)",
  perishable: "Perishable",
  dateOfPurchase: "Date of Purchase",
  dateOfIssue: "Date of Issue",
  issuedfrom: "Issued From",
  indentNo: "Indent No.",
};

const formatKeyToLabel = (key) => {
  return labelMap[key] || key;
};

const QMIStockEntryForm = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes("amountDetails.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        amountDetails: { ...prev.amountDetails, [field]: value },
      }));
    } else if (name.includes("enteredBy.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        enteredBy: { ...prev.enteredBy, [field]: value },
      }));
    } else if (name.includes("verifiedBy.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        verifiedBy: { ...prev.verifiedBy, [field]: value },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/stockRoutes/stock/add-direct-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Stock entry successful");
        setFormData(initialState);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  return (
    <Box className="direct-stock-entry-form" p={4}>
      <Typography variant="h5">Direct Stock Entry Form</Typography>
      <Grid container spacing={2} mt={2}>
        {Object.entries(initialState).map(([key, value]) => {
          if (typeof value === "boolean") {
            return (
              <Grid item xs={12} sm={6} key={key}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={key}
                      checked={formData[key]}
                      onChange={handleChange}
                    />
                  }
                  label={formatKeyToLabel(key)}
                />
              </Grid>
            );
          } else if (typeof value === "object" && !Array.isArray(value)) {
            return Object.entries(value).map(([subKey, subVal]) => (
              <Grid item xs={12} sm={6} key={`${key}.${subKey}`}>
                <TextField
                  fullWidth
                  name={`${key}.${subKey}`}
                  label={formatKeyToLabel(subKey)}
                  value={formData[key][subKey] || ""}
                  onChange={handleChange}
                  type={
                    subKey.includes("Date")
                      ? "date"
                      : ["cashAmount", "quantity", "warranty", "amount"].includes(
                          subKey
                        )
                      ? "number"
                      : "text"
                  }
                  InputLabelProps={subKey.includes("Date") ? { shrink: true } : {}}
                />
              </Grid>
            ));
          } else {
            return (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  fullWidth
                  name={key}
                  label={formatKeyToLabel(key)}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  type={
                    key.includes("Date")
                      ? "date"
                      : ["quantity", "warranty", "amount"].includes(key)
                      ? "number"
                      : "text"
                  }
                  InputLabelProps={key.includes("Date") ? { shrink: true } : {}}
                />
              </Grid>
            );
          }
        })}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QMIStockEntryForm;