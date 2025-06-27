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
  Snackbar,
  Alert,
} from "@mui/material";
import {useNavigate } from "react-router-dom";

const formFields = [
  {
    name: "dateOfReturn",
    label: "Date of Return",
    type: "date",
    required: true,
  },
  {
    name: "quantity",
    label: "Quantity",
    type: "number",
    required: true,
  },
  {
    name: "reason",
    label: "Why Return",
    multiline: true,
    rows: 2,
    required: true,
  },
];

const pen = localStorage.getItem("pen") || "";
const name = localStorage.getItem("name") || "";

const UserReturn = () => {
  const [formData, setFormData] = useState({
    itemId: "",
    dateOfReturn: new Date().toISOString().split("T")[0],
    quantity: "",
    reason: "",
  });

  const [issuedItems, setIssuedItems] = useState([]);
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const openSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };
  useEffect(() => {
    if (pen) {
      fetchIssuedItems(pen);
    }
  }, []);

  const fetchIssuedItems = async (pen) => {
  try {
    const res = await fetch(`/api/userRoute/my-issued-items/${pen}`);
    const data = await res.json();
    if (Array.isArray(data)) {
      const approvedItems = data.filter(item => item.status === "approved");
      // console.log("Approved Items:", approvedItems);
      setIssuedItems(approvedItems);
    } else {
      console.error("Unexpected response:", data);
       openSnackbar("Failed to fetch issued items", "error");
      // alert("Failed to fetch issued items.");
    }
  } catch (error) {
    console.error("Error fetching issued items:", error);
     openSnackbar("Something went wrong while fetching items", "error");
    // alert("Something went wrong while fetching issued items.");
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.itemId) {
      // return alert("Please select an item");
      openSnackbar("Please select an item", "warning");
      return;
    }
    try {
      const res = await fetch(`/api/userRoute/my-issued-items/${formData.itemId}/permanent-return`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          penNo: pen,
          name: name,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        openSnackbar("Return request submitted successfully!", "success");
                setTimeout(() => {
          navigate('/lars-print', {
            state: {
              item: issuedItems.find(item => item._id === formData.itemId)?.item?.itemName || "Unknown Item",
              quantity: formData.quantity,
              reason: formData.reason,
              date: formData.dateOfReturn
            }
          });
        }, 1500);
        // alert("Return request submitted successfully!");
        // navigate('/lars-print', {state : {
        //   item : issuedItems.find(item => item._id === formData.itemId)?.item?.itemName || "Unknown Item",
        //   quantity: formData.quantity,
        //   reason: formData.reason,
        //   date: formData.dateOfReturn
        // }});

        setFormData({
          itemId: "",
          quantity: "",
          dateOfReturn: new Date().toISOString().split("T")[0],
        });
      } else {
        openSnackbar(result.error || "Error submitting return", "error");
        // alert(result.error || "Error submitting return");
      }
    } catch (error) {
      console.error("Error submitting return:", error);
      openSnackbar("Failed to submit return", "error");
      // alert("Failed to submit return");
    }
  };

  return (
    <div className="mui-form" style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <Box
        className="return-form"
        sx={{
          backgroundColor: "#111C44",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
          width: "400px",
        }}
      >
        <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center" color="white">
          Return Request Form
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="item-label" sx={{ color: "white" }}>
              Select Issued Item
            </InputLabel>
            <Select
              labelId="item-label"
              name="itemId"
              value={formData.itemId}
              onChange={handleChange}
              required
            >
              {issuedItems.map((req) => (
                <MenuItem key={req._id} value={req._id}>
                  {req.item?.itemName || "Unnamed"} - {req.item?.itemCategory || "N/A"} / {req.item?.itemSubCategory || "N/A"}
                </MenuItem>

              ))}
            </Select>
          </FormControl>
          {formFields.map((field) => (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              multiline={field.multiline || false}
              type={!field.multiline ? (field.type || "text"): undefined}
              rows={field.rows || undefined}
              fullWidth
              sx={field.name === "reason" ? {
                "& .MuiInputBase-root": { 
                  minHeight: "80px",
                  alignitems: "flex-start",
                },
                "& textarea": { 
                  padding: "6px" 
                }
                } : {mb: 2}}
            />
          ))}

          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ borderRadius: 2, px: 8, py: 1, fontWeight: "bold" }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
            {/* Snackbar component */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default UserReturn;