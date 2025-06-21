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

const QMITempIssueForm = () => {
  // === Field Configuration ===
  const fieldConfig = [
    { name: "Qmno", label: "QM No.", type: "text", required: true },
    {
      name: "dateOfIssue",
      label: "Date Of Issue",
      type: "date",
      required: true,
    },
    { name: "requestNo", label: "Request No.", type: "text", required: true },
    { name: "name", label: "Name", type: "text", required: true },
    { name: "pen", label: "PEN No.", type: "number", required: true },
    {
      name: "toWhom",
      label: "To (Office/ Company/ Person)",
      type: "selectWithAddNew",
      required: true,
    },
    { name: "itemName", label: "Item", type: "text", required: true },
    { name: "itemCategory", label: "Category", type: "text", required: true },
    {
      name: "itemSubCategory",
      label: "Sub Category",
      type: "select",
      required: true,
    },
    { name: "quantity", label: "Quantity", type: "number", required: true },
    {
      name: "unit",
      label: "Unit",
      type: "select",
      options: ["Nos", "Litre", "Kilogram", "Meter"],
      required: true,
    },
    { name: "usage", label: "Usage", type: "text", required: true },
    { name: "purpose", label: "Purpose", type: "text", required: true },
    {
      name: "perishable",
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
    });
    data.dateOfIssue = new Date().toISOString().split("T")[0];
    return data;
  };

  const [formData, setFormData] = useState(getInitialFormData());

  // === Subcategory Logic ===
  // const defaultSubCategories = ["Consumables", "Stationery", "Electronics"];
  const [customSubCategories, setCustomSubCategories] = useState([]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInputValue, setCustomInputValue] = useState("");
  const allSubCategories = [...customSubCategories, "+ Add New"];

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
  const [customToOptions, setCustomToOptions] = useState([]);
  const [showCustomToInput, setShowCustomToInput] = useState(false);
  const [customToInputValue, setCustomToInputValue] = useState("");
  const defaultToOptions = [
    "AC I Wing",
    "AC II Wing",
    "AD Admin",
    "AD MT",
    "AD Outdoor",
    "AD PS",
    "AD Training",
    "A block",
    "Armour Wing",
    "B Block",
    "Computer Lab",
    "CPC",
    "Cyber Forensics Lab",
    "Direct Bunglow",
    "Director Office",
    "DySP Admin",
    "DySP Indoor",
    "DySP PS1",
    "DySP PS2",
    "DySP TTNS",
    "Driving School",
    "Dry Canteen",
    "Drinking Water Treatment Plant (DWTP)",
    "Guest House",
    "HoD BS",
    "HoD Computer Application",
    "HoD Forensics Medicine",
    "HoD Forensics Science",
    "HoD Law",
    "IGP/ DIG Training",
    "Indoor",
    "INSPECTOR ADMIN OFFICE",
    "Inspector INDOOR OFFICE",
    "Laundry",
    "Model PS",
    "MT Office",
    "PRC",
    "QMITempIssueForm",
    "R & P Wing",
    "SDTS",
    "SO Mess",
    "Swimming Pool",
    "Telecommunication Wing",
    "TT 01",
    "TT 02",
    "TT 03",
    "TT 04",
    "TT 05",
    "TT 06",
    "TT 07",
    "TT 08",
    "TT 09",
    "TT 10",
    "Unit Hospital",
    "Vishranthi",
    "Wet Canteen",
  ];

  // Set today's date on load
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (!formData.dateOfIssue)
      setFormData((prev) => ({ ...prev, dateOfIssue: today }));
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // === Subcategory Handlers ===
  const handleSubCategoryChange = (e) => {
    const value = e.target.value;

    if (value === "+ Add New") {
      setShowCustomInput(true);
      setFormData((prev) => ({ ...prev, itemSubCategory: "" }));
    } else if (value.startsWith("CUSTOM_DELETE_")) {
      const catToDelete = value.replace("CUSTOM_DELETE_", "");
      setCustomSubCategories((prev) =>
        prev.filter((cat) => cat !== catToDelete)
      );
      setFormData((prev) => ({ ...prev, itemSubCategory: "" }));
    } else {
      setShowCustomInput(false);
      setFormData((prev) => ({ ...prev, itemSubCategory: value }));
    }
  };

  const handleAddNewSubCategory = () => {
    const trimmed = customInputValue.trim();
    if (!trimmed || customSubCategories.includes(trimmed)) return;
    setCustomSubCategories((prev) => [...prev, trimmed]);
    setFormData((prev) => ({ ...prev, itemSubCategory: trimmed }));
    setCustomInputValue("");
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
    doc.text(`Temporary Issue Entry`, 20, 20);
    doc.setFontSize(12);
    let y = 30;

    Object.entries(formData).forEach(([key, value]) => {
      if (value && key !== "warrantyPeriod" && key !== "warrantyType") {
        doc.text(`${key}: ${value}`, 20, y);
        y += 10;
      }
    });

    doc.save("Temp_Issue.pdf");
    setShowPdfModal(false);
    setSuccessMessage("Form submitted successfully!");
    resetForm(); // Reset after download
  };

  const resetForm = () => {
    setFormData(getInitialFormData());
    setCustomSubCategories([]);
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
      case "selectWithAddNew":
        const allToOptions = [
          ...defaultToOptions,
          ...customToOptions,
          "+ Add New",
        ];
        return (
          <FormControl fullWidth sx={inputStyles} key={field.name}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              name="toWhom"
              value={formData.toWhom || ""}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "+ Add New") {
                  setShowCustomToInput(true);
                  setFormData((prev) => ({ ...prev, toWhom: "" }));
                } else if (val.startsWith("CUSTOM_DELETE_")) {
                  const optToDelete = val.replace("CUSTOM_DELETE_", "");
                  setCustomToOptions((prev) =>
                    prev.filter((opt) => opt !== optToDelete)
                  );
                  setFormData((prev) => ({ ...prev, toWhom: "" }));
                } else {
                  setShowCustomToInput(false);
                  setFormData((prev) => ({ ...prev, toWhom: val }));
                }
              }}
              sx={{ color: "white" }}
            >
              {allToOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
              {customToOptions.map((option) => (
                <MenuItem
                  key={`CUSTOM_DELETE_${option}`}
                  value={`CUSTOM_DELETE_${option}`}
                >
                  {option} ❌
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
    <>
      <Box className="temp-issue-box">
        <Typography
          variant="h5"
          mb={2}
          fontWeight="bold"
          textAlign="center"
          color="white"
        >
          Temporary Issue Entry Form
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

            // Special handling for itemSubCategory
            if (field.name === "itemSubCategory") {
              return (
                <Box
                  key={field.name}
                  display="flex"
                  gap={2}
                  alignItems="center"
                  mb={2}
                >
                  {/* Subcategory dropdown */}
                  <FormControl fullWidth sx={inputStyles}>
                    <InputLabel>Sub Category</InputLabel>
                    <Select
                      name="itemSubCategory"
                      value={formData.itemSubCategory || ""}
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

                  {/* Show custom input if needed */}
                  {showCustomInput && (
                    <Box display="flex" gap={1} mt={1}>
                      <TextField
                        label="Enter New Sub Category"
                        value={customInputValue}
                        onChange={(e) => setCustomInputValue(e.target.value)}
                        size="small"
                        sx={{
                          width: "calc(100% - 140px)",
                          input: { color: "white" },
                          label: { color: "white" },
                        }}
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
                </Box>
              );
            }

            // Render normal fields
            const renderedField = renderField(field);

            // After rendering all fields, check if it's the "toWhom" field
            if (field.name === "toWhom") {
              return (
                <Box
                  display="flex"
                  gap={1}
                  alignItems="center"
                  key={field.name}
                >
                  {renderedField}
                  {showCustomToInput && (
                    <>
                      <TextField
                        label="New To"
                        value={customToInputValue}
                        onChange={(e) => setCustomToInputValue(e.target.value)}
                        size="small"
                        sx={{ width: "calc(60% - 8px)" }}
                        InputProps={{ style: { color: "white" } }}
                        InputLabelProps={{ style: { color: "white" } }}
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          const trimmed = customToInputValue.trim();
                          if (!trimmed || customToOptions.includes(trimmed))
                            return;
                          setCustomToOptions((prev) => [...prev, trimmed]);
                          setFormData((prev) => ({ ...prev, toWhom: trimmed }));
                          setCustomToInputValue("");
                          setShowCustomToInput(false);
                        }}
                      >
                        Add
                      </Button>
                    </>
                  )}
                </Box>
              );
            }

            return renderedField;
          })}

          {/* Submit Button */}
          <Box display="flex" justifyContent="flex-start" mt={2} ml={62.5}>
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
          <Box
            bgcolor="#fff"
            p={4}
            borderRadius={2}
            boxShadow={3}
            maxWidth="400px"
            textAlign="center"
          >
            <Typography variant="h6" gutterBottom>
              Do you want to add more items under the same QM/ SL No.?
            </Typography>
            <Box mt={2}>
              <Button
                variant="contained"
                color="success"
                onClick={handleAddMoreYes}
                sx={{ mr: 2 }}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleAddMoreNo}
              >
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
          <Box
            bgcolor="#fff"
            p={4}
            borderRadius={2}
            boxShadow={3}
            maxWidth="500px"
            width="100%"
            textAlign="center"
          >
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
                  <Box
                    key={key}
                    display="flex"
                    justifyContent="space-between"
                    mb={1}
                  >
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleFinalSubmit}
              >
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
          <Box
            bgcolor="#fff"
            p={4}
            borderRadius={2}
            boxShadow={3}
            maxWidth="400px"
            textAlign="center"
          >
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
                  resetForm();
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

export default QMITempIssueForm;
