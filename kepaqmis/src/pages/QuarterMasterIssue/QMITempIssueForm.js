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
import "./Issue.css";

const QMITempIssueForm = () => {
  // List of offices/companies
  const officeOptions = [
    "A block",
    "AC I Wing",
    "AC II Wing",
    "AD Admin",
    "AD MT",
    "AD Outdoor",
    "AD PS",
    "AD Training",
    "Armour Wing",
    "B Block",
    "Computer Lab",
    "CPC",
    "Cyber Forensics Lab",
    "Direcor Bunglow",
    "Director Office",
    "DKMS",
    "Drinking Water Treatment Plant (DWTP)",
    "Driving School",
    "Dry Canteen",
    "Duty Office",
    "DySP Admin",
    "DySP Indoor",
    "DySP PS1",
    "DySP PS2",
    "DySP TTNS",
    "Guest House",
    "HoD Behavioral Science",
    "HoD Computer Application",
    "HoD Forensics Medicine",
    "HoD Forensics Science",
    "HoD Law",
    "IGP/ DIG Training",
    "Indoor",
    "Inspector Admin Office",
    "Inspector Indoor OFFICE",
    "Laundry",
    "Model PS",
    "MT Office",
    "PRC",
    "R & P Wing",
    "SDTS",
    "SO Mess",
    "Super Market",
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
    "Wet Canteen"
  ];

  const [formData, setFormData] = useState({
    dateOfIssue: "",
    slNo: "",
    penNo: "",
    to: "",
    name: "",
    mobile: "",
    item: "",
    itemDescription: "",
    pupose: "",
    qty: "",
  });

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Set today's date on load
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      dateOfIssue: today,
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
    setSuccessMessage("");

    setTimeout(() => {
      setShowConfirmModal(true);
      setStatus("idle");
    }, 500);
  };

  const handleAddMoreYes = () => {
    const today = new Date().toISOString().split("T")[0];
    const currentIndentNo = formData.indentNo;

    setFormData({
      slNo: "",
      penNo: "",
      to: "",
      dateOfIssue: today,
      name: "",
      mobile: "",
      item: "",
      itemDescription: "",
      pupose: "",
      qty: "", // ✅ Resetting same key
    });

    setShowConfirmModal(false);
    setSuccessMessage("Ready to add another item with the same indent.");
    setStatus("succeeded");
  };

  const handleAddMoreNo = () => {
    setShowConfirmModal(false);
    setShowPreviewModal(true);
  };

  const handleFinalSubmit = () => {
    console.log("Form Data Submitted:", formData);
    const today = new Date().toISOString().split("T")[0];
    setFormData({
      slNo: "",
      penNo: "",
      to: "",
      dateOfIssue: today,
      name: "",
      mobile: "",
      item: "",
      itemDescription: "",
      pupose: "",
      qty: "",
    });
    setShowPreviewModal(false);
    setSuccessMessage("Form submitted successfully!");
    setStatus("succeeded");
  };

  const labelMap = {
    dateOfIssue: "Date Of Issue",
    slNo: "Sl No.",
    penNo: "PEN No.",
    to: "To (Office / Company)",
    name: "Name",
    mobile: "Mobile No.",
    item: "Item",
    itemDescription: "Item Description",
    pupose: "Purpose",
    qty: "Quantity",
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
          Temporary Issue Form
        </Typography>

        {/* Show success or error alerts */}
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
            label="Sl No."
            name="slNo"
            value={formData.slNo}
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
            label="Date of Issue"
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
            label="PEN No."
            name="penNo"
            value={formData.penNo}
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
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              input: { color: "white" },
              label: { color: "white" },
              fieldset: { borderColor: "white" },
            }}
          />

          {/* ✅ Dropdown for To (Office / Company) */}
          <FormControl
            fullWidth
            required
            sx={{
              label: { color: "white" },
              svg: { color: "white" },
              fieldset: { borderColor: "white" },
            }}
          >
            <InputLabel sx={{ color: "white" }}>To (Office / Company)</InputLabel>
            <Select
              name="to"
              value={formData.to}
              onChange={handleChange}
              sx={{ color: "white" }}
            >
              {officeOptions.map((office) => (
                <MenuItem key={office} value={office}>
                  {office}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          
          <TextField
            label="Mobile No."
            name="mobile"
            value={formData.mobile}
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
          <TextField
            label="Item Description"
            name="itemDescription"
            value={formData.itemDescription}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={1}
            sx={{
              input: { color: "white" },
              label: { color: "white" },
              fieldset: { borderColor: "white" },
            }}
          />
          <TextField
            label="Purpose"
            name="pupose"
            value={formData.pupose}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={1}
            sx={{
              input: { color: "white" },
              label: { color: "white" },
              fieldset: { borderColor: "white" },
            }}
          />
          

          <Box display="flex" justifyContent="flex-end" mt={2} ml={50}>
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

      {/* 🧨 Modal: Confirm Add More Items */}
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
              Do you want to add more items under the same Sl No.?
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

      {/* 🧾 Modal: Preview Before Submit */}
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
          >
            <Typography variant="h6" gutterBottom textAlign="center">
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
    </>
  );
};

export default QMITempIssueForm;