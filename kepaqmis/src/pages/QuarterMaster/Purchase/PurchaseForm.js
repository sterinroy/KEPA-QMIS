import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
// import Sidebar from "../../../components/Sidebar";
// import Topbar from "./Topbar";
import "./Purchase.css";



const PurchaseForm = () => {
  // Local state for form data
  const [formData, setFormData] = useState({
    orderNo: "",
    supplyOrderNo: "",
    invoiceDate: "",
    from: "",
    to: "",
    dateOfVerification: "",
    billInvoiceNo: "",
    amount: "",
    item: "",
    category: "",
    subCategory: "",
    qty: "",
    isPerishable: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      invoiceDate: today,
      dateOfVerification: today,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userWantsToAddMore = window.confirm(
      "Do you want to add more items in the same order number?"
    );

    if (userWantsToAddMore) {

      const { orderNo } = formData;
      setFormData((prev) => ({
        orderNo, 
        supplyOrderNo: "",
        invoiceDate: prev.invoiceDate,
        from: "",
        to: "",
        dateOfVerification: prev.dateOfVerification,
        billInvoiceNo: "",
        amount: "",
        item: "",
        category: "",
        subCategory: "",
        qty: "",
        isPerishable: "",
      }));
    } else {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = () => {
    console.log("Final Form submitted:", formData);
    alert("Form submitted successfully!");
    const today = new Date().toISOString().split("T")[0];
    setFormData({
      orderNo: "",
      supplyOrderNo: "",
      invoiceDate: today,
      from: "",
      to: "",
      dateOfVerification: today,
      billInvoiceNo: "",
      amount: "",
      item: "",
      category: "",
      subCategory: "",
      qty: "",
      isPerishable: "",
    });
  };

  return (
    <>
      {/* <div className="purchase-entry-container"
        style={{
          display: "flex",
          backgroundColor: "#0C1227",
          minHeight: "100vh",
          
        }}
      > */}

          <div
            className="purchase-root"
            style={{
              // backgroundColor: "#0C1227",
              height: "calc(100vh - 64px)",

                    }}
                  >

            <Box className="purchase-box">
              <Typography
                variant="h5"
                mb={3}
                fontWeight="bold"
                textAlign="center"
                color="white"
              >
                Purchase Details Entry Form
              </Typography>
              <form onSubmit={handleSubmit} className="mui-form">
                <TextField
                  label="Order No"
                  name="orderNo"
                  value={formData.orderNo}
                  onChange={handleChange}
                  // InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    fieldset: { borderColor: "white" },
                    mb: 0.5,
                  //  width:500
                  }}
                />
                <TextField
                  label="Supply Order No"
                  name="supplyOrderNo"
                  value={formData.supplyOrderNo}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    fieldset: { borderColor: "white" },
                    mb: 0.5,
                  
                  }}
                />
                <TextField
                  label="Invoice Date"
                  type="date"
                  name="invoiceDate"
                  value={formData.invoiceDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    fieldset: { borderColor: "white" },
                    mb: 0.5,
                  }}
                />
                <TextField
                  label="Bill Invoice No"
                  name="billInvoiceNo"
                  value={formData.billInvoiceNo}
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
                <TextField
                  label="Amount"
                  name="amount"
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
                <TextField
                  label="From (Party Name)"
                  name="from"
                  value={formData.from}
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
                <TextField
                  label="To (Office/Company)"
                  name="to"
                  value={formData.to}
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
                <TextField
                  label="Date Of Verification"
                  type="date"
                  name="dateOfVerification"
                  value={formData.dateOfVerification}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                  fullWidth
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    fieldset: { borderColor: "white" },
                    mb: 0.5,
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
                    mb: 0.5,
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
                    mb: 0.5,
                  }}
                />
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
                    mb: 0.5,
                  }}
                />
                <FormControl fullWidth sx={{ mb: 1 }}>
                  <InputLabel id="perishable-label" sx={{ color: "white" }}>
                    Is Perishable? *
                  </InputLabel>
                  <Select
                    labelId="perishable-label"
                    name="isPerishable"
                    value={formData.isPerishable}
                    onChange={handleChange}
                    label="Is Perishable"
                    sx={{
                      color: "white",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    }}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>

                {/* Submit Button */}
                <Box display="flex" justifyContent="flex-end" sx={{ mt: 0.7 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{
                      borderRadius: 2,
                      px: 8.3,
                      py: 1,
                      fontWeight: "bold",
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
          </div>
        
      {/* </div> */}
    </>
  );
};

export default PurchaseForm;