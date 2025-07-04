import React from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../QMP.css";

const QMPFormEntry = ({
  entry,
  index,
  categories,
  handleChange,
  handleRemoveEntry,
  setAnchorEl,
  setAnchorElSub,
  offices,
}) => {
  const formFields = [
    { name: "supplyOrderNo", label: "Supply - Order No.", type: "text" },
    { name: "invoiceDate", label: "Invoice Date", type: "date" },
    { name: "itemName", label: "Item Name", type: "text" },
    { name: "quantity", label: "Quantity", type: "number" },
    { name: "fromWhomPurchased", label: "Supplier Name", type: "text" },
    { name: "verifyDate", label: "Date of Verifying", type: "date" },
    { name: "billInvoiceNo", label: "Bill Invoice No", type: "text" },
  ];

  return (
    <Box className="qmp-form-entry-container">
      {/* Render static text fields */}
      {formFields.map((field, idx) => (
        <Grid item xs={12} sm={4} key={idx}>
          <TextField
            label={field.label}
            name={field.name}
            type={field.type}
            value={entry[field.name]}
            onChange={(e) => handleChange(e, index)}
            fullWidth
            sx={{
              input: { color: "white" },
              label: { color: "white" },
              fieldset: { borderColor: "#ccc" },
              mb: 2,
            }}
          />
        </Grid>
      ))}

      <Grid item xs={12} sm={4}>
      <FormControl fullWidth>
        <InputLabel>To (Company/Office)</InputLabel>
        <Select
          name="toWhom"
          value={entry.toWhom}
          onChange={(e) => handleChange(e, index)}
          label="To (Company/Office)"
        >
          {offices.map((office, i) => (
            <MenuItem key={i} value={office}>
              {office}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

      {/* Category Select */}
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="itemCategory"
            value={entry.itemCategory}
            onChange={(e) => handleChange(e, index)}
            label="Category"
          >
            {categories.map((cat, i) => (
              <MenuItem key={i} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
            {/* <MenuItem value="" onClick={(e) => setAnchorEl(e.currentTarget)}>
              <em>
                <AddIcon fontSize="small" /> Add Category
              </em>
            </MenuItem> */}
          </Select>
        </FormControl>
      </Grid>

      {/* Subcategory Select */}
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Subcategory</InputLabel>
          <Select
            name="itemSubCategory"
            value={entry.itemSubCategory}
            onChange={(e) => handleChange(e, index)}
            label="SubCategory"
            disabled={!entry.itemCategory}
          >
            {(
              categories.find((c) => c.name === entry.itemCategory)
                ?.subcategories || []
            ).map((sub, i) => (
              <MenuItem key={i} value={sub}>
                {sub}
              </MenuItem>
            ))}
            <MenuItem value="" onClick={(e) => setAnchorElSub(e.currentTarget)}>
              <em>
                <AddIcon fontSize="small" /> Add Subcategory
              </em>
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Amount Type Select */}
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Amount Type</InputLabel>
          <Select
            name="amountType"
            value={entry.amountType}
            onChange={(e) => handleChange(e, index)}
            label="Amount Type"
          >
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Credit">Credit</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Conditional Cash Amount Field */}
      {entry.amountType === "Cash" && (
        <Grid item xs={12} sm={4}>
          <TextField
            label="Cash Amount"
            name="amountDetails.cashAmount"
            type="number"
            value={entry.amountDetails.cashAmount}
            onChange={(e) => handleChange(e, index)}
            fullWidth
            sx={{
              input: { color: "white" },
              label: { color: "white" },
              fieldset: { borderColor: "#ccc" },
              mb: 2,
            }}
          />
        </Grid>
      )}

      {/* Conditional Credit Status Field */}
      {entry.amountType === "Credit" && (
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Credit Status</InputLabel>
            <Select
              name="amountDetails.creditStatus"
              value={entry.amountDetails.creditStatus}
              onChange={(e) => handleChange(e, index)}
              label="Credit Status"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      )}

      {/* Remove Entry Button */}
      <Grid item xs={12} sm={4}>
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleRemoveEntry(index)}
          sx={{
            borderRadius: "20px",
            px: 2,
            py: 1,
            fontWeight: "bold",
            backgroundColor: "#ffcccc",
            "&:hover": { backgroundColor: "#ff9999" },
          }}
        >
          Remove Entry
        </Button>
      </Grid>
    </Box>
  );
};

export default QMPFormEntry;