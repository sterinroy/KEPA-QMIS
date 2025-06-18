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
  const [formData, setFormData] = useState({
    qmNo: "",
    requestNo: "",
    dateOfIssue: "",
    item: "",
    category: "",
    subCategory: "",
    make: "",
    model: "",
    modelNo: "",
    productNo: "",
    qty: "",
    unit: "",
    warranty: "",
    warrantyPeriod: "",
    warrantyType: "",
    indentNo: "",
    perishableType: "",
  });

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);

  // Sub Category State
  const defaultSubCategories = ["Printers", "Inks", "Consumables", "Stationery", "Electronics"];
  const [customSubCategories, setCustomSubCategories] = useState([]);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInputValue, setCustomInputValue] = useState("");

  const allSubCategories = [...defaultSubCategories, ...customSubCategories, "+ Add New"];

  // Set today's date on load
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      dateOfIssue: prev.dateOfIssue || today,
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
    if (!customInputValue.trim()) return;

    if (!customSubCategories.includes(customInputValue)) {
      setCustomSubCategories((prev) => [...prev, customInputValue]);
    }

    setFormData((prev) => ({ ...prev, subCategory: customInputValue }));
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
    setFormData((prev) => ({
      ...prev,
      qmNo: "",
      requestNo: "",
      dateOfIssue: today,
      item: "",
      category: "",
      subCategory: "",
      make: "",
      model: "",
      modelNo: "",
      productNo: "",
      qty: "",
      unit: "",
      warranty: "",
      warrantyPeriod: "",
      warrantyType: "",
      indentNo: "",
      perishableType: "",
    }));
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
    setStatus("succeeded");
  };

  const labelMap = {
    qmNo: "QM No.",
    requestNo: "Request No",
    dateOfIssue: "Date Of Issue",
    item: "Item",
    category: "Category",
    subCategory: "Sub Category",
    make: "Make / Brand",
    model: "Model",
    modelNo: "Model No",
    productNo: "Product No / Serial No",
    qty: "Quantity",
    unit: "Unit",
    warranty: "Warranty",
    warrantyPeriod: "Warranty Period",
    warrantyType: "Warranty Type",
    indentNo: "Indent No.",
    perishableType: "Is Perishable",
  };

  return (
    <>
      <Box className="direct-issue-box">
        <Typography
          variant="h5"
          mb={2}
          fontWeight="bold"
          textAlign="center"
          color="white"
        >
          Direct Issued Stock Entry Form
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
          <TextField
            label="QM No."
            name="qmNo"
            value={formData.qmNo}
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
            label="Request No"
            name="requestNo"
            value={formData.requestNo}
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
            label="Date Of Issue"
            type="date"
            name="dateOfIssue"
            value={formData.dateOfIssue}
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

          {/* 🔁 Custom Sub Category Dropdown with Remove Option */}
          <FormControl
            fullWidth
            required
            sx={{
              label: { color: "white" },
              svg: { color: "white" },
              fieldset: { borderColor: "white" },
            }}
          >
            <InputLabel sx={{ color: "white" }}>Sub Category</InputLabel>
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

          {showCustomInput && (
            <Box display="flex" gap={1} mt={1}>
              <TextField
                label="Enter New Sub Category"
                value={customInputValue}
                onChange={(e) => setCustomInputValue(e.target.value)}
                fullWidth
                size="small"
                sx={{
                  input: { color: "white" },
                  label: { color: "white" },
                  fieldset: { borderColor: "white" },
                }}
              />
              <Button variant="outlined" size="small" onClick={handleAddNewSubCategory}>
                Add
              </Button>
            </Box>
          )}

          {/* Other fields remain unchanged */}
          <TextField
            label="Make / Brand"
            name="make"
            value={formData.make}
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
            label="Model"
            name="model"
            value={formData.model}
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
            label="Model No"
            name="modelNo"
            value={formData.modelNo}
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
            label="Product No / Serial No"
            name="productNo"
            value={formData.productNo}
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

          <TextField
            label="Indent No."
            name="indentNo"
            value={formData.indentNo}
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
                const label = labelMap[key] || key;
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
                onClick={() => setShowPdfModal(false)}
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