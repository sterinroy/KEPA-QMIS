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
  Grid as MuiGrid
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOffices } from "../../redux/actions/officeActions";
import { fetchStockItems } from "../../redux/actions/stockActions";
import "../../StandardForm.css";

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

      alert("Request submitted successfully");
      setFormData({
        ...initialFormData,
        PENNo: pen,
        name: name,
        dateOfrequest: new Date().toISOString().split("T")[0],
      });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

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
    <div className="standard-form-root">
      <Box className="standard-form-box" sx={{ pt: 6, pb: 6, px: { xs: 2, sm: 8 } }}>
        <Typography
          variant="h4"
          color="white"
          fontWeight="bold"
          textAlign="center"
          mb={3}
          sx={{ textTransform: "uppercase", letterSpacing: "2px" }}
        >
          Temporary Request Form
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, // Forces 2 columns on screens > 600px
              gap: 2.5, // Reduced from 4
              width: "100%",
              margin: 0
            }}
          >
            {/* ROW 1 */}
            <Box>
              <TextField
                fullWidth
                label="Sl No"
                name="slNo"
                value={formData.slNo}
                onChange={handleChange}
                required
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Date of Request"
                name="dateOfrequest"
                type="date"
                value={formData.dateOfrequest}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Box>

            {/* ROW 2 */}
            <Box>
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                type="number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Quantity"
                name="qty"
                type="number"
                value={formData.qty}
                onChange={handleChange}
                required
              />
            </Box>

            {/* ROW 3 */}
            <Box>
              <TextField
                fullWidth
                label="Purpose"
                name="purpose"
                multiline
                rows={2}
                value={formData.purpose}
                onChange={handleChange}
                required
              />
            </Box>
            <Box>
              <FormControl fullWidth required>
                <InputLabel>Office / Company</InputLabel>
                <Select
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
            </Box>

            {/* ROW 4 */}
            <Box>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
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
            </Box>
            <Box>
              <FormControl fullWidth required>
                <InputLabel>Subcategory</InputLabel>
                <Select
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
            </Box>

            {/* ROW 5 */}
            <Box>
              <FormControl fullWidth required>
                <InputLabel>Select Item</InputLabel>
                <Select
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
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {selectedItem && (
                <Typography variant="body1" color="white" fontWeight="500" ml={2}>
                  Unit: {selectedItem.unit}
                </Typography>
              )}
            </Box>

            {/* SUBMIT */}
            <Box sx={{ gridColumn: { sm: "1 / -1" }, display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: { xs: "100%", sm: "240px" },
                  height: "55px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: "12px",
                  background: "linear-gradient(90deg, #007bff 0%, #0056b3 100%)",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.4)"
                  },
                  transition: "all 0.3s ease"
                }}
              >
                Submit Request
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default UserTemp;
