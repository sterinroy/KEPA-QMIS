// File: ApproveDialog.js
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchQMIssueEntries } from "../../../redux/actions/qmissueActions";

const ApproveDialog = ({ open, onClose, entry, formData, setFormData }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleAmountDetailsChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      amountDetails:
        formData.amountType === "Cash"
          ? { cashAmount: value }
          : { creditStatus: value },
    }));
  };

  const handleApproveSubmit = async () => {
    if (!entry?._id) return;
    try {
      const response = await fetch(
        `/api/stockRoutes/purchase/approve/${entry._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            quantity: Number(formData.quantity),
            invoiceDate: new Date(formData.invoiceDate),
            verifyDate: new Date(formData.verifyDate),
            verifiedBy: { pen: formData.verifiedBy || "" },
          }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert("Approved successfully!");
        setConfirmOpen(false);
        dispatch(fetchQMIssueEntries());
        onClose();
        dispatch({ type: "FETCH_QM_ENTRIES" });
      } else alert(result.message || "Server error");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (!entry) return null;

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>Approve Request</DialogTitle>
        <DialogContent>
          <Box
            className="approve-request"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Order No"
              name="orderNo"
              value={formData.orderNo}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Supply Order No"
              name="supplyOrderNo"
              value={formData.supplyOrderNo}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Invoice Date"
              name="invoiceDate"
              value={formData.invoiceDate}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Bill Invoice No"
              name="billInvoiceNo"
              value={formData.billInvoiceNo}
              onChange={handleInputChange}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Item Category</InputLabel>
              <Select
                name="itemCategory"
                value={formData.itemCategory}
                onChange={handleInputChange}
                label="Item Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Sub Category</InputLabel>
              <Select
                name="itemSubCategory"
                value={formData.itemSubCategory}
                onChange={handleInputChange}
                label="Sub Category"
              >
                {categories
                  .find((c) => c.name === formData.itemCategory)
                  ?.subcategories.map((sub) => (
                    <MenuItem key={sub} value={sub}>
                      {sub}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <TextField
              label="Verify Date"
              name="verifyDate"
              value={formData.verifyDate}
              onChange={handleInputChange}
              fullWidth
            />
            <FormControl>
              <RadioGroup
                row
                name="amountType"
                value={formData.amountType}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="Cash"
                  control={<Radio />}
                  label="Cash"
                  disabled={formData.amountType === "Credit"}
                  sx={{
                    "& .MuiFormControlLabel-label.Mui-disabled": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#bbbbff !important",
                    },
                  }}
                />
                <FormControlLabel
                  value="Credit"
                  control={<Radio />}
                  label="Credit"
                  disabled={formData.amountType === "Cash"}
                  sx={{
                    "& .MuiFormControlLabel-label.Mui-disabled": {
                      color: "white",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>

            {formData.amountType === "Cash" ? (
              <TextField
                label="Cash Amount"
                value={formData.amountDetails?.cashAmount || ""}
                onChange={handleAmountDetailsChange}
                fullWidth
              />
            ) : (
              <TextField
                select
                label="Credit Status"
                value={formData.amountDetails?.creditStatus || ""}
                onChange={handleAmountDetailsChange}
                fullWidth
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved">Approved</MenuItem>
              </TextField>
            )}

            <TextField
              label="Supplier Name"
              name="fromWhomPurchased"
              value={formData.fromWhomPurchased}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="To (Office/ Company)"
              name="toWhom"
              value={formData.toWhom}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Item Name"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Make/ Brand"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Model No."
              name="modelNo"
              value={formData.modelNo}
              onChange={handleInputChange}
              fullWidth
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.perishable}
                  onChange={handleInputChange}
                  name="perishable"
                />
              }
              label="Perishable"
            />

            <TextField
              label="Serial No."
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleInputChange}
              fullWidth
            />
            <FormControl fullWidth>
            <InputLabel>Unit</InputLabel>
            <Select
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              label="Unit"
            >
              <MenuItem value="kg">kg</MenuItem>
              <MenuItem value="m">m</MenuItem>
              <MenuItem value="nos">nos</MenuItem>
              <MenuItem value="l">l</MenuItem>
            </Select>
          </FormControl>
            <TextField
              label="Warranty (In Months)"
              name="warranty"
              value={formData.warranty}
              onChange={handleInputChange}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Type of Fund</InputLabel>
              <Select
                name="typeofFund"
                value={formData.typeofFund}
                onChange={handleInputChange}
                label="Type of Fund"
              >
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="QM No."
              name="Qmno"
              value={formData.Qmno}
              disabled
              fullWidth
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  color: "#bbbbff !important",
                  WebkitTextFillColor: "white !important",
                  opacity: 1,
                },
                "& .MuiInputLabel-root.Mui-disabled": {
                  color: "#bbbbff !important",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#bbbbff !important",
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => setConfirmOpen(true)}>Approve</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Approval</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to approve this request?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>No</Button>
          <Button onClick={handleApproveSubmit} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApproveDialog;
