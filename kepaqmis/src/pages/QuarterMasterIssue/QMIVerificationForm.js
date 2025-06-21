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

// ✅ Added 'onVerified' as a prop
const QMIVerificationForm = ({
  onClose,
  onSubmit,
  prefillData,
  onVerified, // ✅ New: Callback to notify parent
}) => {
  const fieldConfig = [
    // General Info
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
    {
      name: "fromWhomPurchased",
      label: "Supplier Name",
      type: "text",
      required: true,
    },
    {
      name: "toWhom",
      label: "To (Office/Company)",
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
    // Item Details
    { name: "itemName", label: "Item Name", type: "text", required: true },
    { name: "make", label: "Make / Brand", type: "text" },
    { name: "model", label: "Model", type: "text" },
    { name: "modelNo", label: "Model No", type: "text" },
    { name: "serialNumber", label: "Serial/Product No", type: "text" },
    { name: "itemCategory", label: "Item Category", type: "text" },
    {
      name: "itemSubCategory",
      label: "Sub Category",
      type: "select",
      options: [
        "Printers",
        "Consumables",
        "Furniture",
        "Electronics",
        "+ Add New",
      ],
    },
    { name: "quantity", label: "Quantity", type: "number" },
    {
      name: "unit",
      label: "Unit",
      type: "select",
      options: ["Nos", "Litre", "Kilogram", "Meter"],
    },
    // Warranty & Perishable
    {
      name: "warranty",
      label: "Warranty",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      name: "warrantyPeriod",
      label: "Warranty Period (months)",
      type: "number",
    },
    {
      name: "warrantyType",
      label: "Warranty Type",
      type: "select",
      options: ["On-Site", "Replacement", "Pickup & Drop"],
    },
    {
      name: "perishable",
      label: "Perishable",
      type: "select",
      options: ["Yes", "No"],
    },
    // Direct Stock Fields
    { name: "Qmno", label: "QM No.", type: "text" },
    { name: "dateOfIssue", label: "Date Of Issue", type: "date" },
    { name: "indentNo", label: "Indent No.", type: "text" },
    // Purchase Specific Fields
    {
      name: "purchaseOrderNo",
      label: "Purchase Order No.",
      type: "text",
      required: true,
    },
    { name: "typeOfFund", label: "Type Of Fund", type: "text", required: true },
  ];

  const getInitialFormData = () => {
    const today = new Date().toISOString().split("T")[0];
    const data = {};
    fieldConfig.forEach((field) => {
      if (field.name) {
        data[field.name] = prefillData?.[field.name] || "";
        if (field.type === "date" && !data[field.name]) {
          data[field.name] = today;
        }
      }
    });
    return data;
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [showConfirmSubmitButton, setShowConfirmSubmitButton] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    setSuccessMessage("");
    setTimeout(() => {
      setShowCheckModal(true);
      setStatus("succeeded");
    }, 500);
  };

  const handleCheck = () => {
    setShowCheckModal(false);
    setShowConfirmSubmitButton(true);
  };

  const handleFinalSubmit = () => {
    console.log("Form Data Submitted:", formData);
    setShowConfirmSubmitButton(false);
    setShowPdfModal(true);
  };

  const generateAndDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Stock Verification Entry`, 20, 20);
    doc.setFontSize(12);
    let y = 30;

    Object.entries(formData).forEach(([key, value]) => {
      if (value && key !== "warrantyPeriod" && key !== "warrantyType") {
        doc.text(`${formatLabel(key)}: ${value}`, 20, y);
        y += 10;
      }
    });

    if (formData.warranty === "Yes") {
      doc.text(`Warranty Period: ${formData.warrantyPeriod}`, 20, y);
      y += 10;
      doc.text(`Warranty Type: ${formData.warrantyType}`, 20, y);
    }

    doc.save("Stock_Verification.pdf");
    setShowPdfModal(false);
    setSuccessMessage("Form submitted successfully!");

    setTimeout(() => {
      setSuccessMessage("");
      resetForm();
    }, 3000);
  };

  const resetForm = () => {
    setFormData(getInitialFormData());
    setError("");
    setStatus("idle");
  };

  const formatLabel = (key) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

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
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
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
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
        );
      case "select":
        return (
          <FormControl fullWidth required={field.required} sx={{ mb: 2 }}>
            <InputLabel>{field.label}</InputLabel>
            <Select name={field.name} value={value} onChange={handleChange}>
              {field.options.map((opt) => (
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

  // Optional: Disable background scroll when modal is open
  useEffect(() => {
    if (showCheckModal || showPdfModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showCheckModal, showPdfModal]);

  return (
    <>
      <Box className="verify-issue-box">
        <Typography
          variant="h5"
          mb={2}
          fontWeight="bold"
          textAlign="center"
          color="white"
        >
          Stock Verification Form
        </Typography>

        {/* Alerts */}
        {status === "failed" && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {status === "succeeded" && successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mui-form">
          {fieldConfig.map((field) => {
            if (
              (field.name === "warrantyPeriod" ||
                field.name === "warrantyType") &&
              formData.warranty !== "Yes"
            )
              return null;
            return renderField(field);
          })}

          {/* Submit Button */}
          <Box display="flex" justifyContent="flex-start" mt={2} ml={62}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={status === "loading"}
              sx={{
                borderRadius: 2,
                px: 8.3,
                py: 0,
                fontWeight: "bold",
              }}
            >
              {status === "loading" ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </form>

        {/* Confirm Submit Button */}
        {showConfirmSubmitButton && (
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="success"
              onClick={handleFinalSubmit}
            >
              Confirm Submit
            </Button>
          </Box>
        )}
      </Box>

      {/* Check Entered Values Modal */}
      {showCheckModal && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgcolor="rgba(0,0,0,0.6)"
          zIndex={9999}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bgcolor="white"
            p={3}
            borderRadius={2}
            boxShadow={3}
            sx={{ width: "400px" }}
          >
            <Typography variant="h6" gutterBottom>
              Please check the entered values before proceeding!!
            </Typography>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button variant="contained" onClick={handleCheck}>
                Check
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* PDF Download Modal */}
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
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bgcolor="white"
            p={3}
            borderRadius={2}
            boxShadow={3}
            sx={{ width: "60%" }}
          >
            <Typography variant="h6" gutterBottom>
              Would you like to download a PDF of this entry?
            </Typography>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={() => {
                  generateAndDownloadPDF();
                  if (typeof onVerified === "function") {
                    const updatedData = {
                      ...prefillData,
                      status: "Approved",
                    };
                    onVerified(updatedData); // Pass full updated data
                  }
                }}
                sx={{ mr: 2 }}
              >
                Yes, Download PDF
              </Button>

              <Button
                variant="outlined"
                onClick={() => {
                  setShowPdfModal(false);
                  resetForm();
                  onClose();

                  if (typeof onVerified === "function") {
                    const updatedData = {
                      ...prefillData,
                      status: "Approved",
                    };
                    onVerified(updatedData); // Also update status even if skipped
                  }
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

export default QMIVerificationForm;
