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
import jsPDF from "jspdf";

const QMIDirectForm = () => {
  const [formData, setFormData] = useState({
    dateOfIssue: "",
    dateOfPurchased: "",
    fromChiefDistrictOrOther: "",
    item: "",
    category: "",
    subCategory: "",
    make: "",
    model: "",
    modelNo: "",
    productNo: "",
    qty: "",
    unit: "",
    indentNo: "",
    perishableType: "",
  });

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);

  const [submittedItems, setSubmittedItems] = useState([]);

  const [labelMap] = useState({
    dateOfIssue: "Date of Issue",
    dateOfPurchased: "Date of Purchased",
    fromChiefDistrictOrOther: "Issued From",
    item: "Item",
    category: "Category",
    subCategory: "Sub Category",
    make: "Make / Brand",
    model: "Model",
    modelNo: "Model No",
    productNo: "Product No / Serial No",
    qty: "Quantity",
    unit: "Unit",
    perishableType: "Is Perishable",
    indentNo: "Indent No",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      dateOfIssue: today,
      dateOfPurchased: today,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    setTimeout(() => {
      setSubmittedItems((prev) => [...prev, formData]);
      setShowConfirmModal(true);
      setStatus("idle");
    }, 500);
  };

  const handleAddMoreYes = () => {
    const today = new Date().toISOString().split("T")[0];
    setFormData({
      dateOfIssue: today,
      dateOfPurchased: today,
      fromChiefDistrictOrOther: "",
      item: "",
      category: "",
      subCategory: "",
      make: "",
      model: "",
      modelNo: "",
      productNo: "",
      qty: "",
      unit: "",
      indentNo: "",
      perishableType: "",
    });

    setShowConfirmModal(false);
    setSuccessMessage("Ready to add another item with the same indent.");
    setStatus("succeeded");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddMoreNo = () => {
    setShowConfirmModal(false);
    setShowPreviewModal(true);
  };

  const handleFinalSubmit = () => {
    setShowPreviewModal(false);
    setShowPdfModal(true);
  };

  const generateAndDownloadPDF = () => {
    const doc = new jsPDF();

    const indentNumber = formData.indentNo || "N/A";
    doc.setFontSize(16);
    doc.text(`Indent Number: ${indentNumber}`, 20, 20);
    doc.setFontSize(14);
    doc.text("Submitted Items", 20, 30);
    doc.setFontSize(10);

    let y = 40;

    submittedItems.forEach((item, index) => {
      doc.text(`Item #${index + 1}:`, 20, y);
      y += 5;
      Object.entries(item).forEach(([key, value]) => {
        if (value && key !== "dateOfIssue" && key !== "dateOfPurchased") {
          doc.text(`${labelMap[key] || key}: ${value}`, 25, y);
          y += 5;
        }
      });
      y += 10;
    });

    doc.save(`form_entry_indent_${indentNumber}.pdf`);
    resetFormAndState();
  };

  const resetFormAndState = () => {
    const today = new Date().toISOString().split("T")[0];
    setFormData({
      dateOfIssue: today,
      dateOfPurchased: today,
      fromChiefDistrictOrOther: "",
      item: "",
      category: "",
      subCategory: "",
      make: "",
      model: "",
      modelNo: "",
      productNo: "",
      qty: "",
      unit: "",
      indentNo: "",
      perishableType: "",
    });

    setSubmittedItems([]);
    setSuccessMessage("Form submitted successfully!");
    setStatus("succeeded");
    setShowPdfModal(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderFormFields = () => {
    const fields = [
      {
        name: "dateOfIssue",
        type: "date",
        label: "Date of Issue",
      },
      {
        name: "dateOfPurchased",
        type: "date",
        label: "Date of Purchased",
      },
      {
        name: "fromChiefDistrictOrOther",
        type: "select",
        label: "Issued From",
        options: ["Chief", "District", "Other"],
      },
      {
        name: "item",
        type: "text",
        label: "Item",
      },
      {
        name: "category",
        type: "text",
        label: "Category",
      },
      {
        name: "subCategory",
        type: "text",
        label: "Sub Category",
      },
      {
        name: "make",
        type: "text",
        label: "Make / Brand",
      },
      {
        name: "model",
        type: "text",
        label: "Model",
      },
      {
        name: "modelNo",
        type: "text",
        label: "Model No",
      },
      {
        name: "productNo",
        type: "text",
        label: "Product No / Serial No",
      },
      {
        name: "qty",
        type: "number",
        label: "Quantity",
      },
      {
        name: "unit",
        type: "select",
        label: "Unit",
        options: ["kg", "litre", "nos", "meter"],
      },
      {
        name: "indentNo",
        type: "text",
        label: "Indent No",
      },
      {
        name: "perishableType",
        type: "select",
        label: "Is Perishable",
        options: ["Yes", "No"],
      },
    ];

    return fields.map((field) => {
      if (field.type === "select") {
        return (
          <FormControl fullWidth required key={field.name} sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "white" }}>{field.label}</InputLabel>
            <Select
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              sx={{ color: "white" }}
            >
              {field.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }

      return (
        <TextField
          key={field.name}
          label={field.label}
          type={field.type}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          required
          fullWidth
          sx={{
            input: { color: "white" },
            label: { color: "white" },
            fieldset: { borderColor: "white" },
          }}
        />
      );
    });
  };

  return (
    <Box className="direct-issue-box" mt={20}>
      <Typography
        variant="h5"
        mb={2}
        fontWeight="bold"
        textAlign="center"
        color="white"
      >
        Direct Issue Form
      </Typography>

      {status === "failed" && <Alert severity="error">{error}</Alert>}
      {status === "succeeded" && (
        <Alert severity="success">{successMessage}</Alert>
      )}

      <form onSubmit={handleSubmit} className="mui-form">
        {renderFormFields()}

        <Box display="flex" justifyContent="flex-end" mt={2} ml={77}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ borderRadius: 2, px: 8.3, py: 0, fontWeight: "bold" }}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default QMIDirectForm;
