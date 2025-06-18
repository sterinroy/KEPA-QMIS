import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitQMPurchase } from "../../redux/actions/qmpurchaseActions";
import { TextField, Button, Box, Typography, Grid, Alert,Select,MenuItem,Popover,IconButton,InputLabel,FormControl } from "@mui/material";
import "./QMP.css";
import {
  fetchCategories,
  addCategory,
  addSubcategory,
} from "../../redux/actions/categoryActions";
import AddIcon from "@mui/icons-material/Add";

const QMPOrder = () => {
  const [formData, setFormData] = useState({
    orderNo: "",
    supplyOrderNo: "",
    invoiceDate: "",
    itemName: "",
    itemCategory: "",
    itemSubcategory: "",
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
  const { categories } = useSelector((state) => state.category);
  const[newCategory, setNewCategory] = useState("");
  const[newSubcategory, setNewSubcategory] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElSub, setAnchorElSub] = useState(null);

  // Set today's date on load
  useEffect(() => {
    
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      invoiceDate: today,
      verifyDate: today,
    }));
    dispatch(fetchCategories());
  }, [dispatch]);

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

  const handleAddCategory = () => {
    dispatch(addCategory(newCategory));
    setFormData((prev) => ({ ...prev, itemCategory: newCategory }));
    setNewCategory("");
    setAnchorEl(null);
  };

  const handleAddSubcategory = () => {
    dispatch(addSubcategory(formData.itemCategory, newSubcategory));
    setFormData((prev) => ({ ...prev, itemSubcategory: newSubcategory }));
    setNewSubcategory("");
    setAnchorElSub(null);
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
              <Grid item xs={12} sm={2} key={index}>
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

          <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="itemCategory"
                  value={formData.itemCategory}
                  onChange={handleChange}
                  label="Category"
                >
                  {categories.map((cat, i) => (
                    <MenuItem key={i} value={cat.name}>{cat.name}</MenuItem>
                  ))}
                  <MenuItem value="" onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <em><AddIcon fontSize="small" /> Add Category</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Subcategory Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  name="itemSubcategory"
                  value={formData.itemSubcategory}
                  onChange={handleChange}
                  label="Subcategory"
                  disabled={!formData.itemCategory}
                >
                  {(categories.find((c) => c.name === formData.itemCategory)?.subcategories || [])
                    .map((sub, i) => (
                      <MenuItem key={i} value={sub}>{sub}</MenuItem>
                    ))}
                  <MenuItem value="" onClick={(e) => setAnchorElSub(e.currentTarget)}>
                    <em><AddIcon fontSize="small" /> Add Subcategory</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
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
      <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1">Add New Category</Typography>
            <TextField
              size="small"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category Name"
              fullWidth
              sx={{ mb: 1 }}
            />
            <Button variant="contained" onClick={handleAddCategory}>Add</Button>
          </Box>
        </Popover>

        {/* Add Subcategory Popover */}
        <Popover
          open={Boolean(anchorElSub)}
          anchorEl={anchorElSub}
          onClose={() => setAnchorElSub(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1">Add New Subcategory</Typography>
            <TextField
              size="small"
              value={newSubcategory}
              onChange={(e) => setNewSubcategory(e.target.value)}
              placeholder="Subcategory Name"
              fullWidth
              sx={{ mb: 1 }}
            />
            <Button variant="contained" onClick={handleAddSubcategory}>Add</Button>
          </Box>
        </Popover>
      </Box>
    </div>
  );
};

export default QMPOrder;
