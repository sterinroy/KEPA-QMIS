import React, { useEffect, useState } from "react";
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
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Issue.css";

import { useSelector, useDispatch } from "react-redux";
import {
  updateField,
  submitRequestedIssue,
  resetForm,
} from "../../../redux/slices/requestedIssueSlice";

const SIDEBAR_WIDTH = 20;

// Predefined unit options
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
  const [confirmSubmitDialog, setConfirmSubmitDialog] = useState(false);

  // Map field names to readable labels for confirmation dialog
  const labelMap = {
    qmSiNo: "QM/SL No",
    dateOfPurchased: "Date of Purchased",
    item: "Item",
    category: "Category",
    subCategory: "Sub Category",
    make: "Make / Brand",
    model: "Model",
    modelNo: "Model No",
    productNo: "Product No / Serial No",
    qty: "Quantity",
    quantityUnit: "Unit",
    purchaseOrderNo: "Purchase Order No",
    reqNo: "Request No",
    typeOfFund: "Type of Fund",
    amount: "Amount",
    perishableType: "Perishable Type",
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (!formData.dateOfPurchased) {
      dispatch(updateField({ name: "dateOfPurchased", value: today }));
    }
  }, [dispatch, formData.dateOfPurchased]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ name, value }));
  };

  const handlePerishableChange = (event, newValue) => {
    if (newValue !== null) {
      dispatch(updateField({ name: "perishableType", value: newValue }));
    }
  };

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
        alert(`Please fill in the "${labelMap[field] || field}" field.`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setConfirmSubmitDialog(true); // Open confirmation dialog
  };

  const handleConfirmSubmit = () => {
    dispatch(submitRequestedIssue(formData));
    setConfirmSubmitDialog(false);
    setDialogOpen(true); // Ask if user wants to add more
  };

  const handleCloseDialog = () => {
    setConfirmSubmitDialog(false);
  };

  const handleDialogClose = (addMore) => {
    setDialogOpen(false);
    if (addMore) {
      const qmNo = formData.qmSiNo;
      dispatch(resetForm());
      dispatch(updateField({ name: "qmSiNo", value: qmNo }));
      dispatch(updateField({
        name: "dateOfPurchased",
        value: getTodayDateISO(),
      }));
    } else {
      dispatch(resetForm());
      dispatch(updateField({
        name: "dateOfPurchased",
        value: getTodayDateISO(),
      }));
    }
  };

  const getTodayDateISO = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <>
      <div style={{ display: "flex", backgroundColor: "#0C1227", minHeight: "100vh" }}>
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

              {/* Alerts */}
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

              {/* Form */}
              <form onSubmit={handleSubmit} className="mui-form">
                {/* QM/SL No */}
                <TextField
                  label="QM/SL. NO"
                  name="qmSiNo"
                  value={formData.qmSiNo}
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

                {/* Date of Purchased */}
                <TextField
                  label="Date of Purchased"
                  name="dateOfPurchased"
                  type="date"
                  value={formData.dateOfPurchased}
                  onChange={handleChange}
                  required
                  fullWidth
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    fieldset: { borderColor: "white" },
                    mb: 0.5,
                  }}
                  InputLabelProps={{ shrink: true }}
                />

                {/* Item */}
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
                    mb: 0.5,
                  }}
                />

                {/* Category */}
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
                    mb: 0.5,
                  }}
                />

                {/* Sub Category */}
                <TextField
                  label="Sub Category"
                  name="subCategory"
                  value={formData.subCategory}
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

                {/* Make/Brand */}
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
                    mb: 0.5,
                  }}
                />

                {/* Model */}
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
                    mb: 0.5,
                  }}
                />

                {/* Model No */}
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
                    mb: 0.5,
                  }}
                />

                {/* Product No/Serial No */}
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
                    mb: 0.5,
                  }}
                />

                {/* Quantity */}
                <TextField
                  label="Quantity"
                  name="qty"
                  type="number"
                  value={formData.qty}
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

                {/* Unit */}
                <FormControl
                  fullWidth
                  required
                  sx={{
                    mb: 2,
                    label: { color: "white" },
                    svg: { color: "white" },
                    fieldset: { borderColor: "white" },
                  }}
                >
                  <InputLabel sx={{ color: "white" }}>Unit</InputLabel>
                  <Select
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

                {/* Purchase Order No */}
                <TextField
                  label="Purchase Order No"
                  name="purchaseOrderNo"
                  value={formData.purchaseOrderNo}
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

                {/* Request No */}
                <TextField
                  label="Request No"
                  name="reqNo"
                  value={formData.reqNo}
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

                {/* Type of Fund */}
                <TextField
                  label="Type of Fund"
                  name="typeOfFund"
                  value={formData.typeOfFund}
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

                {/* Amount */}
                <TextField
                  label="Amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
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

                {/* Perishable Toggle */}
                <ToggleButtonGroup
                  value={formData.perishableType}
                  exclusive
                  onChange={handlePerishableChange}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 3,
                  }}
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

                {/* Submit Button */}
                <Box display="flex" justifyContent="flex-end" sx={{ mr: "-100px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ borderRadius: 2, px: 7, fontWeight: "bold" }}
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Submitting..." : "Submit"}
                  </Button>
                </Box>
              </form>
            </Box>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmSubmitDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          Confirm Submission
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Please review your details before submitting:
          </Typography>

          {Object.entries(formData).map(([key, value]) => {
            if (
              typeof value === "function" ||
              ["status", "error", "successMessage"].includes(key) ||
              value === "" ||
              value === null
            )
              return null;

            const label = labelMap[key] || key.replace(/([A-Z])/g, " $1").trim();

            return (
              <Box key={key} display="flex" justifyContent="space-between" mb={1}>
                <Typography color="textSecondary">{label}:</Typography>
                <Typography>{value}</Typography>
              </Box>
            );
          })}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Edit
          </Button>
          <Button onClick={handleConfirmSubmit} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Another Item Dialog */}
      <Dialog open={dialogOpen} onClose={() => handleDialogClose(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          Add Another Item?
          <IconButton
            aria-label="close"
            onClick={() => handleDialogClose(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography>Do you want to add another item under the same QM/SL No?</Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => handleDialogClose(true)}
            color="primary"
            variant="contained"
          >
            Yes, Add Another
          </Button>
          <Button
            onClick={() => handleDialogClose(false)}
            color="inherit"
            variant="outlined"
          >
            No, Finish
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RequestedIssueForm;