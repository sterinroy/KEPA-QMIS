import React, { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Alert,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import "./purchase.css";

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
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
  const [status, setStatus] = useState(""); // idle, loading, failed
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    // Simple required check (minimal validation)
    if (!formData.itemName || !formData.Qmno || !formData.quantity || !formData.verifiedBy) {
      setError("Please fill all required fields.");
      setStatus("failed");
      return;
    }
    setConfirmOpen(true); // Show confirmation dialog
  };

  const submitConfirmed = async () => {
    setConfirmOpen(false);
    setStatus("loading");
    try {
      const res = await fetch("/api/stockRoutes/stock/requested-issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to submit");

      setSuccessMessage("Stock entry successfully added.");
      setFormData({
        ...defaultEntry,
        invoiceDate: getTodayDate(),
        verifyDate: getTodayDate(),
        dateOfPurchase: getTodayDate(),
        dateOfIssue: getTodayDate(),
      });
      setStatus("idle");
    } catch (err) {
      setError(err.message);
      setStatus("failed");
    }
  };

  const fieldConfig = [
    { name: "Qmno", label: "QM No.", type: "text", required: true },
    { name: "orderNo", label: "Order No.", type: "text", required: true },
    { name: "supplyOrderNo", label: "Supply Order No.", type: "text", required: true },
    { name: "invoiceDate", label: "Invoice Date", type: "date", required: true },
    { name: "billInvoiceNo", label: "Bill Invoice No.", type: "text", required: true },
    { name: "verifyDate", label: "Verify Date", type: "date", required: true },
    { name: "itemName", label: "Item Name", type: "text", required: true },
    { name: "itemCategory", label: "Item Category", type: "text", required: true },
    { name: "itemSubCategory", label: "Item Subcategory", type: "text", required: true },
    { name: "quantity", label: "Quantity", type: "number", required: true },
    { name: "unit", label: "Unit", type: "text", required: true },
    { name: "make", label: "Make / Brand", type: "text", required: true },
    { name: "model", label: "Model", type: "text", required: true },
    { name: "modelNo", label: "Model No.", type: "text", required: true },
    { name: "serialNumber", label: "Serial No.", type: "text", required: true },
    { name: "warranty", label: "Warranty (In Months)", type: "text", required: false },
    { name: "typeofFund", label: "Type of Fund", type: "text", required: true },
    { name: "fromWhomPurchased", label: "Supplier", type: "text", required: true },
    { name: "toWhom", label: "To Whom (Office)", type: "text", required: true },
    { name: "amount", label: "Total Amount", type: "number", required: true },
    { name: "dateOfPurchase", label: "Date of Purchase", type: "date", required: true },
    { name: "dateOfIssue", label: "Date of Issue", type: "date", required: true },
    { name: "verifiedBy", label: "Verified By PEN No.", type: "text", required: true },
    {
      name: "amountType",
      label: "Amount Type",
      type: "select",
      options: ["Cash", "Credit"],
      required: true,
    },
    {
      label: "Amount Details",
      condition: (data) => data.amountType === "Cash",
      fields: [
        {
          name: "amountDetails.cashAmount",
          label: "Cash Amount",
          type: "number",
          required: true,
        },
      ],
    },
    {
      label: "Credit Status",
      condition: (data) => data.amountType === "Credit",
      fields: [
        {
          name: "amountDetails.creditStatus",
          label: "Credit Status",
          type: "select",
          options: ["Pending", "Approved"],
          required: true,
        },
      ],
    },
    {
      name: "perishable",
      label: "Perishable",
      type: "select",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      required: true,
    },
  ];

  const renderField = (field) => {
    const value = formData[field.name];
    if (!field.name) return null;

    if (["text", "number", "date"].includes(field.type)) {
      return (
        <TextField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          value={value}
          onChange={handleChange}
          required={field.required}
          fullWidth
          margin="normal"
          InputLabelProps={field.type === "date" ? { shrink: true } : {}}
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
    }

    if (field.type === "select") {
      return (
        <FormControl fullWidth margin="normal" key={field.name}>
          <InputLabel sx={{ color: "white" }}>{field.label}</InputLabel>
          <Select
            name={field.name}
            value={value ?? ""}
            onChange={handleChange}
            label={field.label}
            sx={{
              color: "white",
              ".MuiOutlinedInput-notchedOutline": { borderColor: "#4a5b76" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#8e9fbf" },
            }}
          >
            {(field.options || []).map((opt) =>
              typeof opt === "object" ? (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ) : (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      );
    }
  };

  return (
    <div className="purchase-root">
      <div className="purchase-box">
        <Typography
          variant="h5"
          textAlign="center"
          gutterBottom
          style={{ color: "white", fontWeight: "bold" }}
        >
          PURCHASE ENTRY FORM
        </Typography>

        {status === "failed" && <Alert severity="error">{error}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        <form onSubmit={handleSubmit}>
          {fieldConfig.map((field) => {
            if (field.condition && !field.condition(formData)) return null;
            if (field.fields) {
              return (
                <div key={field.label}>
                  <Typography variant="subtitle1" style={{ color: "white", marginTop: 16 }}>
                    {field.label}
                  </Typography>
                  {field.fields.map((f) => renderField(f))}
                </div>
              );
            }
            return renderField(field);
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
              <Typography>Are you sure you want to add this item to stock?</Typography>
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

export default QMIPurchase;