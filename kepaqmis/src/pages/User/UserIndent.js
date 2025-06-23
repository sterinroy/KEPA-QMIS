import React, { useState, useEffect } from "react";
import {
  TextField, Button, Typography, Box, FormControl,
  InputLabel, Select, MenuItem, Grid
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOffices } from "../../redux/actions/officeActions";
import { fetchStockItems } from "../../redux/actions/stockActions";
import "./User.css";

const UserIndent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pen = localStorage.getItem("pen") || "";
  const name = localStorage.getItem("name") || "";

  const { offices } = useSelector((state) => state.office);
  const { stocks = [] } = useSelector((state) => state.stock);

  const [formData, setFormData] = useState({
    PENNo: pen,
    name: name,
    toWhom: "",
    dateOfrequest: new Date().toISOString().split("T")[0],
  });

  const [items, setItems] = useState([
    { category: "", subcategory: "", itemId: "", qty: 1 }
  ]);

  useEffect(() => {
    dispatch(fetchOffices());
    dispatch(fetchStockItems());
  }, [dispatch]);

  const formFields = [
    { name: "dateOfrequest", label: "Date of Request", type: "date", required: true },
  ];

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setItems(prev =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [name]: value,
              ...(name === "category" && { subcategory: "", itemId: "" }),
              ...(name === "subcategory" && { itemId: "" })
            }
          : item
      )
    );
  };

  const addItem = () => {
    setItems(prev => [...prev, { category: "", subcategory: "", itemId: "", qty: 1 }]);
  };

  const removeItem = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    for (const item of items) {
      const selected = stocks.find(s => s._id === item.itemId);
      const payload = {
        itemId: item.itemId,
        quantity: item.qty,
        unit: selected?.unit,
        temporary: false,
        user: {
          pen: formData.PENNo,
          name: formData.name,
        },
        extra: {
          toWhom: formData.toWhom,
          dateOfrequest: formData.dateOfrequest
        },
      };

      const res = await fetch("/api/itemRequestRoutes/item-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
    }

      alert("All items submitted successfully.");
      openIndentBill();
      navigate("/User/UserIndent");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const categories = [...new Set(stocks.map((item) => item.itemCategory))];

  const getSubcategories = (category) =>
    [...new Set(stocks.filter(i => i.itemCategory === category).map(i => i.itemSubCategory))];

  const getFilteredItems = (cat, subcat) =>
    stocks.filter(i => i.itemCategory === cat && i.itemSubCategory === subcat);

  const openIndentBill = () => {
  const indentData = {
    stationNo: formData.toWhom,
    officeNo: formData.toWhom,
    storeNo: formData.toWhom,
    indentFor: JSON.stringify(items.map((row) => ` ${row.category} - ${row.subcategory}`)),
    subCategory: items.map(row => row.subcategory).join(', '),
    qty: JSON.stringify(items.map(row => `${row.qty} ${stocks.find(s => s._id === row.itemId)?.unit || ''}`)),
    date: formData.dateOfrequest,
    nameAndDesignation: formData.name,
    createdBy: {
      pen: formData.PENNo,
      name: formData.name
    }
  };

  const queryString = new URLSearchParams(indentData).toString();
  window.open(`/Indent?${queryString}`, "_blank");
};


  return (
    <div className="temp-issue-root">
      <Box className="temp-issue-box">
        <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center" color="white">
          Indent Request
        </Typography>

        <form onSubmit={handleSubmit} className="mui-form">

          <FormControl fullWidth required sx={{ mb: 2 }}>
            <InputLabel>Office / Company</InputLabel>
            <Select
              name="toWhom"
              value={formData.toWhom}
              onChange={handleFormChange}
              label="Office / Company"
            >
              {offices.map((label) => (
                <MenuItem key={label} value={label}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {formFields.map((field) => (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              value={formData[field.name]}
              onChange={handleFormChange}
              type={field.type}
              required={field.required}
              fullWidth
              InputLabelProps={field.type === "date" ? { shrink: true } : {}}
              sx={{ mb: 2 }}
            />
          ))}

          {items.map((item, index) => {
            const selected = stocks.find(i => i._id === item.itemId);
            return (
              <Box key={index} border="1px solid #ccc" borderRadius={2} p={2} mb={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth required>
                      <InputLabel>Category</InputLabel>
                      <Select
                        name="category"
                        value={item.category}
                        onChange={(e) => handleItemChange(index, e)}
                      >
                        {categories.map((cat) => (
                          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth required>
                      <InputLabel>Subcategory</InputLabel>
                      <Select
                        name="subcategory"
                        value={item.subcategory}
                        onChange={(e) => handleItemChange(index, e)}
                        disabled={!item.category}
                      >
                        {getSubcategories(item.category).map((sub) => (
                          <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth required>
                      <InputLabel>Select Item</InputLabel>
                      <Select
                        name="itemId"
                        value={item.itemId}
                        onChange={(e) => handleItemChange(index, e)}
                        disabled={!item.subcategory}
                      >
                        {getFilteredItems(item.category, item.subcategory).map((stockItem) => (
                          <MenuItem key={stockItem._id} value={stockItem._id}>
                            {stockItem.itemName} ({stockItem.serialNumber})
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <TextField
                      label="Qty"
                      name="qty"
                      type="number"
                      inputProps={{ min: 1 }}
                      value={item.qty}
                      onChange={(e) => handleItemChange(index, e)}
                      required
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={1}>
                    {items.length > 1 && (
                      <Button color="error" onClick={() => removeItem(index)}>
                        Remove
                      </Button>
                    )}
                  </Grid>
                </Grid>
                {selected && (
                  <Typography variant="body2" color="white" mt={1}>
                    Unit: {selected.unit}
                  </Typography>
                )}
              </Box>
            );
          })}

          <Button variant="outlined" onClick={addItem} sx={{ mb: 2 }}>
            + Add Another Item
          </Button>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" type="submit">
              Submit Indent Request
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default UserIndent;