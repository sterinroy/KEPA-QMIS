import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import "./Issue.css";

const QMIVerificationForm = ({ onClose, onSubmit, prefillData }) => {
  // === Field Configuration ===
  const fieldConfig = [
    { name: "orderNo", label: "Order No.", type: "text", required: true },
    {
      name: "supplyOrderNo",
      label: "Supply Order No.",
      type: "text",
      required: true,
    },
    {
      name: "invoiceDate",
      label: "Date Of Invoice",
      type: "date",
      required: true,
    },
    { name: "from", label: "Supplier Name", type: "text", required: true },
    {
      name: "to",
      label: "To (Office / Company)",
      type: "text",
      required: true,
    },
    {
      name: "dateOfVerification",
      label: "Date Of Verification",
      type: "date",
      required: true,
    },
    {
      name: "billInvoiceNo",
      label: "Bill Invoice No.",
      type: "text",
      required: true,
    },
    { name: "amount", label: "Amount", type: "text", required: true },
    { name: "item", label: "Item", type: "text", required: true },
    { name: "category", label: "Category", type: "text", required: true },
    {
      name: "subCategory",
      label: "Sub Category",
      type: "select",
      required: true,
    },
    { name: "qty", label: "Quantity", type: "number", required: true },
    {
      name: "unit",
      label: "Unit",
      type: "select",
      options: ["Nos", "Litre", "Kilogram", "Meter"],
      required: true,
    },
    { name: "qmNO", label: "QM No.", type: "text", required: true },
    {
      name: "dateOfPurchased",
      label: "Date Of Purchase",
      type: "date",
      required: true,
    },
    {
      name: "invoiveNumber",
      label: "Invoice Number",
      type: "text",
      required: true,
    },
    {
      name: "warranty",
      label: "Warranty",
      type: "select",
      options: ["Yes", "No"],
      required: true,
    },
    {
      condition: (data) => data.warranty === "Yes",
      fields: [
        {
          name: "warrantyPeriod",
          label: "Warranty Period",
          type: "number",
          required: true,
        },
        {
          name: "warrantyType",
          label: "Warranty Type",
          type: "select",
          options: ["On-Site", "Replacement", "Pickup & Drop"],
          required: true,
        },
      ],
    },
    {
      name: "perishableType",
      label: "Is Perishable",
      type: "select",
      options: ["Yes", "No"],
      required: true,
    },
  ];

  // === Initial Form State & Reset Function ===
  const getInitialFormData = () => {
    const data = {};
    fieldConfig.forEach((field) => {
      if (field.name) data[field.name] = "";
      if (field.fields) field.fields.forEach((f) => (data[f.name] = ""));
    });

    const today = new Date().toISOString().split("T")[0];
    data.invoiceDate = data.invoiceDate || today;
    data.dateOfVerification = data.dateOfVerification || today;
    data.dateOfPurchased = data.dateOfPurchased || today;

    return { ...data, ...prefillData };
  };

  const [formData, setFormData] = useState(getInitialFormData());

  // === Subcategories Logic ===
  const defaultSubCategories = ["Consumables", "Stationery", "Electronics"];
  const [customSubCategories, setCustomSubCategories] = useState([]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInputValue, setCustomInputValue] = useState("");

  const allSubCategories = [
    ...defaultSubCategories,
    ...customSubCategories,
    "+ Add New",
  ];

  // === Modal & Status States ===
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const inputStyles = {
    input: { color: "white" },
    label: { color: "white" },
    fieldset: { borderColor: "white" },
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData = { ...formData, [name]: value };

    if (name === "warranty" && value === "No") {
      updatedData = {
        ...updatedData,
        warrantyPeriod: "",
        warrantyType: "",
      };
    }

    setFormData(updatedData);
  };

  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "+ Add New") {
      setShowCustomInput(true);
      setFormData((prev) => ({ ...prev, subCategory: "" }));
    } else if (value.startsWith("CUSTOM_DELETE_")) {
      const catToDelete = value.replace("CUSTOM_DELETE_", "");
      setCustomSubCategories((prev) =>
        prev.filter((cat) => cat !== catToDelete)
      );
      setFormData((prev) => ({ ...prev, subCategory: "" }));
    } else {
      setShowCustomInput(false);
      setFormData((prev) => ({ ...prev, subCategory: value }));
    }
  };

  const handleAddNewSubCategory = () => {
    const trimmed = customInputValue.trim();
    if (!trimmed || customSubCategories.includes(trimmed)) return;
    setCustomSubCategories((prev) => [...prev, trimmed]);
    setFormData((prev) => ({ ...prev, subCategory: trimmed }));
    setCustomInputValue("");
    setShowCustomInput(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setSuccessMessage("");
    setTimeout(() => {
      onSubmit(formData);
      onClose();
      setStatus("idle");
    }, 500);
  };

  // === Reset Form Function ===
  const resetForm = () => {
    setFormData(getInitialFormData());
    setCustomSubCategories([]); // Optional: reset custom subcategories
    setShowCustomInput(false);
    setCustomInputValue("");
    setStatus("idle");
  };

  // === Render Field Component ===
  const renderField = (field) => {
    const value = formData[field.name];

    switch (field.type) {
      case "text":
        return (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            type="text"
            value={value}
            onChange={handleChange}
            required={field.required}
            fullWidth
            sx={inputStyles}
          />
        );
      case "number":
        return (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            type="number"
            value={value}
            onChange={handleChange}
            required={field.required}
            fullWidth
            sx={inputStyles}
          />
        );
      case "date":
        return (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            type="date"
            value={value}
            onChange={handleChange}
            required={field.required}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={inputStyles}
          />
        );
      case "select":
        return (
          <FormControl fullWidth required sx={inputStyles}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              name={field.name}
              value={value}
              onChange={handleChange}
              sx={{ color: "white" }}
            >
              {(field.options || []).map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      default:
        return null;
    }
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

      {/* Alerts */}
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
        {/* Render All Fields Dynamically */}
        {fieldConfig.map((field, index) => {
          if (field.condition && !field.condition(formData)) return null;

          if (field.name === "subCategory") {
            return (
              <FormControl fullWidth required sx={inputStyles} key={field.name}>
                <InputLabel>Sub Category</InputLabel>
                <Select
                  name="subCategory"
                  value={formData.subCategory || ""}
                  onChange={handleSubCategoryChange}
                  sx={{ color: "white" }}
                >
                  {allSubCategories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                  {customSubCategories.map((cat) => (
                    <MenuItem
                      key={`CUSTOM_DELETE_${cat}`}
                      value={`CUSTOM_DELETE_${cat}`}
                    >
                      {cat} ❌
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }

          if (field.fields) {
            return field.fields.map((f) => renderField(f));
          }

          return renderField(field);
        })}

        {/* Custom Sub Category Input */}
        {showCustomInput && (
          <Box display="flex" gap={1} mt={1}>
            <TextField
              label="Enter New Sub Category"
              value={customInputValue}
              onChange={(e) => setCustomInputValue(e.target.value)}
              fullWidth
              size="small"
              sx={inputStyles}
            />
            <Button
              variant="outlined"
              size="small"
              onClick={handleAddNewSubCategory}
            >
              Add
            </Button>
          </Box>
        )}

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
            disabled={status === "loading"}
          >
            {status === "loading" ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default QMIVerificationForm;
