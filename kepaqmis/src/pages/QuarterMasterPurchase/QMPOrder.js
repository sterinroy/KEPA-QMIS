import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitQMPurchase } from "../../redux/actions/qmpurchaseActions";
import { TextField, Button, Box, Typography, Grid, Alert } from "@mui/material";
import "./QMP.css";

const QMPOrder = () => {
  const [formData, setFormData] = useState({
    orderNo: "",
    supplyOrderNo: "",
    invoiceDate: "",
    itemName: "",
    itemCategory: "",
    quantity: "",
    fromWhomPurchased: "",
    toWhom: "",
    verifyDate: "",
    billInvoiceNo: "",
  });

  const dispatch = useDispatch();
  const { loading, successMessage, errorMessage } = useSelector(
    (state) => state.qmpurchase
  );

  // Set today's date on load
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      invoiceDate: today,
      verifyDate: today,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(submitQMPurchase(formData));
  };


  const formFields = [
    {
      name: "orderNo",
      label: "Order/Req Number",
      type: "text",
      required: true,
    },
    {
      name: "supplyOrderNo",
      label: "Supply-Order Number",
      type: "text",
    },
    {
      name: "invoiceDate",
      label: "Invoice Date",
      type: "date",
      required: true,
    },
    {
      name: "itemName",
      label: "Item Name",
      type: "text",
      required: true,
    },
    {
      name: "itemCategory",
      label: "Category",
      type: "text",
      required: true,
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
    },
    {
      name: "fromWhomPurchased",
      label: "From Whom?",
      type: "text",
    },
    {
      name: "toWhom",
      label: "To Whom?",
      type: "text",
    },
    {
      name: "verifyDate",
      label: "Date of Verifying",
      type: "date",
      required: true,
    },
    {
      name: "billInvoiceNo",
      label: "Bill Invoice No",
      type: "text",
      required: true,
    },
  ];

  return (
    <div className="form">
      <Box
        className="direct-issue-box"
        sx={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography
          variant="h5"
          mb={2}
          fontWeight="bold"
          textAlign="center"
          color="white"
        >
          QM-Purchase Order Form
        </Typography>

        <form className="mui-form">
          <Grid container spacing={2}>
            {formFields.map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
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
          </Grid>

          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                borderRadius: "20px",
                px: 4,
                py: 1,
                fontWeight: "bold",
                backgroundColor: "#007bff",
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
        {loading && <Alert severity="info">Submitting...</Alert>}

        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Box>
    </div>
  );
};

export default QMPOrder;
