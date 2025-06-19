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
import jsPDF from "jspdf";
import "./Issue.css";

const QMIDirectStock = () => {
  // === Field Configuration ===
  const fieldConfig = [
    { name: "qmNo", label: "QM No.", type: "text", required: true },
    { name: "requestNo", label: "Request No", type: "text", required: true },
    { name: "dateOfIssue", label: "Date Of Issue", type: "date", required: true },
    { name: "item", label: "Item", type: "text", required: true },
    { name: "category", label: "Category", type: "text", required: true },
    { name: "subCategory", label: "Sub Category", type: "select", required: true },
    { name: "make", label: "Make / Brand", type: "text", required: true },
    { name: "model", label: "Model", type: "text", required: true },
    { name: "modelNo", label: "Model No", type: "text", required: true },
    { name: "productNo", label: "Product No / Serial No", type: "text", required: true },
    { name: "qty", label: "Quantity", type: "number", required: true },
    { name: "unit", label: "Unit", type: "select", options: ["Nos", "Litre", "Kilogram", "Meter"], required: true },
    { name: "warranty", label: "Warranty", type: "select", options: ["Yes", "No"], required: true },
    {
      condition: (data) => data.warranty === "Yes",
      fields: [
        { name: "warrantyPeriod", label: "Warranty Period (in months)", type: "number", required: true },
        { name: "warrantyType", label: "Warranty Type", type: "select", options: ["On-Site", "Replacement", "Pickup & Drop"], required: true },
      ],
    },
    { name: "indentNo", label: "Indent No.", type: "text", required: true },
    { name: "perishableType", label: "Is Perishable", type: "select", options: ["Yes", "No"], required: true },
  ];

  // === Initial Form State & Reset Function ===
  const getInitialFormData = () => {
    const data = {};
    fieldConfig.forEach((field) => {
      if (field.name) data[field.name] = "";
      if (field.fields) field.fields.forEach((f) => (data[f.name] = ""));
    });
    data.dateOfIssue = new Date().toISOString().split("T")[0];
    return data;
  };

  const [formData, setFormData] = useState(getInitialFormData());

  // === Subcategories Logic ===
  const defaultSubCategories = ["Printers", "Inks", "Consumables", "Stationery", "Electronics"];
  const [customSubCategories, setCustomSubCategories] = useState([]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInputValue, setCustomInputValue] = useState("");

  const allSubCategories = [...defaultSubCategories, ...customSubCategories, "+ Add New"];

  // === Modal & Status States ===
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);

  const inputStyles = {
    input: { color: "white" },
    label: { color: "white" },
    fieldset: { borderColor: "white" },
  };

  // Set today's date on load
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (!formData.dateOfIssue)
      setFormData((prev) => ({ ...prev, dateOfIssue: today }));
  }, []);

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
      setCustomSubCategories((prev) => prev.filter((cat) => cat !== catToDelete));
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
      setShowConfirmModal(true);
      setStatus("idle");
    }, 500);
  };

  const handleAddMoreYes = () => {
    const today = new Date().toISOString().split("T")[0];
    setFormData({
      ...getInitialFormData(),
      dateOfIssue: today,
    });
    setShowConfirmModal(false);
    setSuccessMessage("Ready to add another item.");
    setStatus("succeeded");
  };

  const handleAddMoreNo = () => {
    setShowConfirmModal(false);
    setShowPreviewModal(true);
  };

  const handleFinalSubmit = () => {
    console.log("Form Data Submitted:", formData);
    setShowPreviewModal(false);
    setShowPdfModal(true);
  };

  const generateAndDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Direct Stock Issue`, 20, 20);
    doc.setFontSize(12);
    let y = 30;

    Object.entries(formData).forEach(([key, value]) => {
      if (value && key !== "warrantyPeriod" && key !== "warrantyType") {
        doc.text(`${key}: ${value}`, 20, y);
        y += 10;
      }
    });

    if (formData.warranty === "Yes") {
      doc.text(`Warranty Period: ${formData.warrantyPeriod}`, 20, y);
      y += 10;
      doc.text(`Warranty Type: ${formData.warrantyType}`, 20, y);
    }

    doc.save("DirectStockIssue.pdf");

    setShowPdfModal(false);
    setSuccessMessage("Form submitted successfully!");
    resetForm(); // Reset form after download
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
            <Select name={field.name} value={value} onChange={handleChange} sx={{ color: "white" }}>
              {(field.options || []).map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Box className="direct-issue-box">
        <Typography variant="h5" mb={2} fontWeight="bold" textAlign="center" color="white">
          Direct Issued Stock Entry Form
        </Typography>

        {/* Alerts */}
        {status === "failed" && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {status === "succeeded" && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

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
                      <MenuItem key={`CUSTOM_DELETE_${cat}`} value={`CUSTOM_DELETE_${cat}`}>
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
              <Button variant="outlined" size="small" onClick={handleAddNewSubCategory}>
                Add
              </Button>
            </Box>
          )}

          {/* Submit Button */}
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                borderRadius: 2,
                px: 8.3,
                py: 0,
                fontWeight: "bold",
              }}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </form>
      </Box>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgcolor="rgba(0,0,0,0.6)"
          zIndex={9999}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box bgcolor="#fff" p={4} borderRadius={2} boxShadow={3} maxWidth="400px" textAlign="center">
            <Typography variant="h6" gutterBottom>
              Do you want to add more items under the same QM/ SL No.?
            </Typography>
            <Box mt={2}>
              <Button variant="contained" color="success" onClick={handleAddMoreYes} sx={{ mr: 2 }}>
                Yes
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleAddMoreNo}>
                No
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgcolor="rgba(0,0,0,0.6)"
          zIndex={9999}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box bgcolor="#fff" p={4} borderRadius={2} boxShadow={3} maxWidth="500px" width="100%" textAlign="center">
            <Typography variant="h6" gutterBottom>
              Confirm Submission
            </Typography>
            <Box mb={2}>
              {Object.entries(formData).map(([key, value]) => {
                if (!value) return null;
                const label = key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (char) => char.toUpperCase());
                return (
                  <Box key={key} display="flex" justifyContent="space-between" mb={1}>
                    <Typography fontWeight="bold">{label}:</Typography>
                    <Typography>{value}</Typography>
                  </Box>
                );
              })}
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={() => setShowPreviewModal(false)} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleFinalSubmit}>
                Confirm Submit
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* PDF Modal */}
      {showPdfModal && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgcolor="rgba(0,0,0,0.6)"
          zIndex={9999}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box bgcolor="#fff" p={4} borderRadius={2} boxShadow={3} maxWidth="400px" textAlign="center">
            <Typography variant="h6" gutterBottom>
              Would you like to generate a PDF of this entry?
            </Typography>
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={generateAndDownloadPDF}
                sx={{ mr: 2 }}
              >
                Yes, Download PDF
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setShowPdfModal(false);
                  resetForm(); // Reset form when skipping PDF
                }}
              >
                No, Skip
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default QMIDirectStock;