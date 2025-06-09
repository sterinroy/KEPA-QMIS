import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateField,
  submitRequestedIssue,
  resetForm,
} from "../../../redux/slices/requestedIssueSlice";

import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Issue.css";

const SIDEBAR_WIDTH = 20;

const unitOptions = [
  { value: "kg", label: "Kilogram" },
  { value: "litre", label: "Litre" },
  { value: "nos", label: "Nos" },
  { value: "meter", label: "Meter" },
];

const RequestedIssueForm = () => {
  const dispatch = useDispatch();
  const { formData, status, error, successMessage } = useSelector(
    (state) => state.requestedIssue
  );

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    dispatch(updateField({ name: "dateOfPurchased", value: today }));
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ name, value }));
  };

  const handlePerishableChange = (event, newValue) => {
    if (newValue !== null) {
      dispatch(updateField({ name: "perishableType", value: newValue }));
    }
  };

  // Validation helper
  const validateForm = () => {
    const requiredFields = [
      "qmSiNo",
      "dateOfPurchased",
      "item",
      "category",
      "subCategory",
      "make",
      "model",
      "modelNo",
      "productNo",
      "qty",
      "quantityUnit",
      "purchaseOrderNo",
      "reqNo",
      "typeOfFund",
      "amount",
      "perishableType",
    ];

    for (const field of requiredFields) {
      const value = formData[field];
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      ) {
        alert(`Please fill in the "${field}" field.`);
        return false;
      }
    }
    return true;
  };

  // Actual submit function
  const submitData = async () => {
    await dispatch(submitRequestedIssue(formData));
  };

  // On initial submit button click, open dialog after validation
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Open the dialog asking user if more items under same QM/Sl No
    setDialogOpen(true);
  };

  // Handle user choice from dialog
  const handleDialogClose = async (addMore) => {
    setDialogOpen(false);

    // Submit current item first
    await submitData();

    if (addMore) {
      // Reset all fields except qmSiNo
      const qmNo = formData.qmSiNo;
      dispatch(resetForm());
      dispatch(updateField({ name: "qmSiNo", value: qmNo }));

      // Also reset dateOfPurchased to today (optional)
      const today = new Date().toISOString().split("T")[0];
      dispatch(updateField({ name: "dateOfPurchased", value: today }));
    } else {
      // Reset entire form including qmSiNo
      dispatch(resetForm());
    }
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#0C1227",
        minHeight: "100vh",
      }}
    >
      <Sidebar activeItem="issue" />
      <div style={{ marginLeft: SIDEBAR_WIDTH, flex: 1 }}>
        <Topbar />
        <div
          className="request-issue-root"
          style={{
            backgroundColor: "#0C1227",
            height: "calc(100vh - 64px)",
            padding: "2rem",
            overflowY: "auto",
          }}
        >
          <Box className="request-issue-box">
            <Typography
              variant="h5"
              mb={3}
              fontWeight="bold"
              textAlign="center"
              color="white"
            >
              Requested Issue Form
            </Typography>

            {status === "loading" && (
              <Box display="flex" justifyContent="center" mb={2}>
                <CircularProgress sx={{ color: "white" }} />
              </Box>
            )}

            {status === "succeeded" && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}

            {status === "failed" && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error || "Submission failed. Please try again."}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="mui-form">
              {[
                ["qmSiNo", "QM/SL. NO"],
                ["dateOfPurchased", "Date of Purchased", "date"],
                ["item", "Item"],
                ["category", "Category"],
                ["subCategory", "Sub Category"],
                ["make", "Make/ Brand"],
                ["model", "Model"],
                ["modelNo", "Model No"],
                ["productNo", "Product No/ Serial No"],
                ["qty", "Quantity", "number"],
              ].map(([name, label, type = "text"]) => (
                <TextField
                  key={name}
                  label={label}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  fullWidth
                  InputLabelProps={type === "date" ? { shrink: true } : {}}
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    fieldset: { borderColor: "white" },
                    mb: 0.3,
                  }}
                  disabled={name === "qmSiNo" && status === "loading"}
                />
              ))}

              <FormControl
                fullWidth
                required
                sx={{
                  label: { color: "white" },
                  svg: { color: "white" },
                  fieldset: { borderColor: "white" },
                  mb: 2,
                }}
              >
                <InputLabel sx={{ color: "white" }}>Unit</InputLabel>
                <Select
                  label="Unit"
                  name="quantityUnit"
                  value={formData.quantityUnit}
                  onChange={handleChange}
                  sx={{ color: "white" }}
                >
                  {unitOptions.map((unit) => (
                    <MenuItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {[
                ["purchaseOrderNo", "Purchase Order No"],
                ["reqNo", "Request No"],
                ["typeOfFund", "Type of Fund"],
                ["amount", "Amount", "number"],
              ].map(([name, label, type = "text"]) => (
                <TextField
                  key={name}
                  label={label}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    fieldset: { borderColor: "white" },
                    mb: 0.5,
                  }}
                />
              ))}

              <ToggleButtonGroup
                value={formData.perishableType}
                exclusive
                onChange={handlePerishableChange}
                sx={{ display: "flex", justifyContent: "center", mb: 3 }}
              >
                <ToggleButton
                  value="perishable"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    "&.Mui-selected": {
                      backgroundColor: "#1976d2",
                      color: "white",
                    },
                  }}
                >
                  Perishable
                </ToggleButton>
                <ToggleButton
                  value="non-perishable"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    "&.Mui-selected": {
                      backgroundColor: "#1976d2",
                      color: "white",
                    },
                  }}
                >
                  Non-Perishable
                </ToggleButton>
              </ToggleButtonGroup>

              <Box display="flex" justifyContent="flex-end" sx={{ mb: 1, mr: "-580px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ borderRadius: 2, px: 7, fontWeight: "bold" }}
                  disabled={status === "loading"}
                >
                  Submit
                </Button>
              </Box>
            </form>

            {/* Confirmation Dialog */}
            <Dialog open={dialogOpen} onClose={() => handleDialogClose(false)}>
              <DialogTitle>More items?</DialogTitle>
              <DialogContent>
                Do you have more items to add under the same QM/Sl No?
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleDialogClose(false)} color="primary">
                  No
                </Button>
                <Button onClick={() => handleDialogClose(true)} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default RequestedIssueForm;
