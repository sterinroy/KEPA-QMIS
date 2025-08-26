// File: QMIStockEntryForm.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Alert,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import "./addstock.css";

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
  const [status, setStatus] = useState(""); // idle, loading, failed
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Simple validation
    if (!formData.Qmno || !formData.itemName || !formData.quantity || !formData.verifiedBy.pen) {
      setError("Please fill all required fields.");
      setStatus("failed");
      return;
    }

    setConfirmOpen(true);
  };

  const submitConfirmed = async () => {
    setConfirmOpen(false);
    setStatus("loading");
    try {
      const res = await fetch("/api/stockRoutes/stock/add-direct-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMessage("Stock entry successful.");
        setFormData(initialState);
      } else {
        setError(data.error || "Submission failed.");
        setStatus("failed");
      }
    } catch (err) {
      setError("Network error: " + err.message);
      setStatus("failed");
    }
    setStatus("idle");
  };

  // Render any field (primitive, nested, or boolean)
  const renderField = (key, value, parentKey = null) => {
    const name = parentKey ? `${parentKey}.${key}` : key;
    const displayValue = parentKey ? formData[parentKey][key] : formData[key];

    // Handle boolean (checkbox)
    if (typeof value === "boolean") {
      return (
        <FormControlLabel
          key={name}
          control={
            <Checkbox
              name={name}
              checked={displayValue}
              onChange={handleChange}
              sx={{
                color: "white",
                "&.Mui-checked": { color: "white" },
              }}
            />
          }
          label={formatKeyToLabel(key)}
          sx={{ color: "white", marginTop: "8px" }}
        />
      );
    }

    // Handle nested objects (enteredBy, verifiedBy, amountDetails)
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return Object.entries(value).map(([subKey, subVal]) =>
        renderField(subKey, subVal, key)
      );
    }

    // Handle primitive types
    let inputType = "text";
    if (key.includes("Date")) inputType = "date";
    else if (["quantity", "warranty", "amount", "cashAmount"].includes(key))
      inputType = "number";

    return (
      <TextField
        key={name}
        fullWidth
        name={name}
        label={formatKeyToLabel(key)}
        value={displayValue || ""}
        onChange={handleChange}
        type={inputType}
        required
        margin="normal"
        InputLabelProps={inputType === "date" ? { shrink: true } : {}}
        sx={{
          input: { color: "white" },
          label: { color: "white" },
          fieldset: { borderColor: "#4a5b76" },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#8e9fbf",
          },
        }}
      />
    );
  };

  return (
    <div className="addstock-root">
      <div className="addstock-box">
        {/* Header */}
        <Typography
          variant="h5"
          textAlign="center"
          gutterBottom
          style={{ color: "white", fontWeight: "bold" }}
        >
          Stock Entry Form
        </Typography>

        {/* Alerts */}
        {status === "failed" && <Alert severity="error">{error}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {Object.entries(initialState).map(([key, value]) => {
            // Skip top-level object containers (they’re rendered internally)
            if (typeof value === "object" && !Array.isArray(value)) return null;
            return renderField(key, value);
          })}

          <div style={{ marginTop: "16px", textAlign: "right" }}>
            <Button
              variant="contained"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting..." : "Submit"}
            </Button>
          </div>

          {/* Confirmation Dialog */}
          <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to submit this entry?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmOpen(false)}>No</Button>
              <Button onClick={submitConfirmed} variant="contained">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </div>
    </div>
  );
};

export default QMIStockEntryForm;