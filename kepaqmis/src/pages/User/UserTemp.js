import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffices } from "../../redux/actions/officeActions";
import { fetchStockItems } from "../../redux/actions/stockActions";
// import { Snackbar, Alert } from "@mui/material";

import "./User.css";

const UserTemp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pen = localStorage.getItem("pen") || "";
  const name = localStorage.getItem("name") || "";

  const initialFormData = {
  slNo: "",
  PENNo: pen,
  name: name,
  toWhom: "",
  dateOfrequest: new Date().toISOString().split("T")[0],
  mobile: "",
  itemId: "",
  category: "",
  subcategory: "",
  purpose: "",
  qty: 1,
};


  const [formData, setFormData] = useState(initialFormData);
  // const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success",
});

  const openSnackbar = (message, severity = "success") => {
  setSnackbar({
    open: true,
    message,
    severity,
  });
};


  const { offices } = useSelector((state) => state.office);
  const {
    stocks = [],
    loading: stockLoading,
    error: stockError,
  } = useSelector((state) => state.stock);

  useEffect(() => {
    dispatch(fetchOffices());
    dispatch(fetchStockItems());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "category") {
      setFormData((prev) => ({
        ...prev,
        subcategory: "",
        itemId: "",
      }));
    } else if (e.target.name === "subcategory") {
      setFormData((prev) => ({
        ...prev,
        itemId: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        itemId: formData.itemId,
        quantity: formData.qty,
        unit: selectedItem?.unit,
        temporary: true,
        user: {
          pen: formData.PENNo,
          name: formData.name,
        },
        extra: {
          slNo: formData.slNo,
          toWhom: formData.toWhom,
          mobile: formData.mobile,
          dateOfrequest: formData.dateOfrequest,
          purpose: formData.purpose,
        },
      };

      const res = await fetch("/api/itemRequestRoutes/item-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
        openSnackbar("Request submitted successfully", "success");
      // alert("Request submitted successfully");
      setFormData({
        ...initialFormData,
        PENNo: pen,
        name: name,
        dateOfrequest: new Date().toISOString().split("T")[0],
      });
    } catch (err) {
        openSnackbar("Error: " + err.message, "error");
      // alert("Error: " + err.message);
    }
  };

  const formFields = [
    { name: "slNo", label: "Sl No", type: "text", required: true },
    {
      name: "dateOfrequest",
      label: "Date of Request",
      type: "date",
      required: true,
    },
    { name: "mobile", label: "Mobile", type: "number", required: true },
    { name: "qty", label: "Quantity", type: "number", required: true },
    {
      name: "purpose",
      label: "Purpose",
      multiline: true,
      rows: 2,
      required: true,
    },
  ];

  const selectedItem = stocks?.find((item) => item._id === formData.itemId);

  const categories = [
    ...new Set((stocks || []).map((item) => item.itemCategory)),
  ];

  const subcategories = formData.category
    ? [
        ...new Set(
          (stocks || [])
            .filter((item) => item.itemCategory === formData.category)
            .map((item) => item.itemSubCategory)
        ),
      ]
    : [];

  const filteredItems = (stocks || []).filter(
    (item) =>
      item.itemCategory === formData.category &&
      item.itemSubCategory === formData.subcategory
  );

  return (
    <div className="temp-issue-root">
      <Box className="temp-issue-box">
        <Typography
          variant="h5"
          mb={3}
          fontWeight="bold"
          textAlign="center"
          color="white"
        >
          Temporary Request Form
        </Typography>

        <form onSubmit={handleSubmit} className="mui-form">
          {formFields.map((field) => (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              multiline={field.multiline || false}
              type={!field.multiline ? field.type || "text" : undefined}
              rows={field.rows || undefined}
              fullWidth
              sx={
                field.name === "purpose"
                  ? {
                      "& .MuiInputBase-root": {
                        minHeight: "80px",
                        alignitems: "flex-start",
                      },
                      "& textarea": {
                        padding: "6px",
                      },
                    }
                  : {}
              }
            />
          ))}

          <FormControl fullWidth required>
            <InputLabel id="office-label">Office / Company</InputLabel>
            <Select
              labelId="office-label"
              name="toWhom"
              value={formData.toWhom}
              onChange={handleChange}
              label="Office / Company"
            >
              {offices?.map((label) => (
                <MenuItem key={label} value={label}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Category"
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel id="subcategory-label">Subcategory</InputLabel>
            <Select
              labelId="subcategory-label"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              label="Subcategory"
              disabled={!formData.category}
            >
              {subcategories.map((sub) => (
                <MenuItem key={sub} value={sub}>
                  {sub}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel id="item-label">Select Item</InputLabel>
            <Select
              labelId="item-label"
              name="itemId"
              value={formData.itemId}
              onChange={handleChange}
              label="Select Item"
              disabled={!formData.subcategory}
            >
              {stockLoading ? (
                <MenuItem disabled>Loading...</MenuItem>
              ) : stockError ? (
                <MenuItem disabled>Error loading items</MenuItem>
              ) : (
                filteredItems.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.itemName} ({item.serialNumber})
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: "150px", // Set a fixed width
                height: "45px",
              }}
            >
              Submit
            </Button>
          </Box>
          {selectedItem && (
            <Typography variant="body2" color="white" mt={-6} marginLeft={4}>
              Unit: {selectedItem.unit}
            </Typography>
          )}
        </form>
      </Box>
         <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
    </div>
  );
};

export default UserTemp;
