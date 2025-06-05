import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submitTempStock } from "../../../redux/actions/tempActions";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import { TextField, Button, Typography, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const SIDEBAR_WIDTH = 240;

const Returnform = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Destructure passed state (entry + techReportRequired)
   const { entry = {}, techReportRequired = "No" } = location.state || {};

  const [formData, setFormData] = useState({
    
   
    fromWhom: "",
    afterReport: "", 
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await dispatch(submitTempStock(formData));
      alert(message);
      navigate("/review", { state: { formData } });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar activeItem="tempissue" />
      <div
        style={{
          marginLeft: SIDEBAR_WIDTH,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Topbar />
        <div
          style={{
            backgroundColor: "#f9f9f9",
            maxHeight: "660px",
            height: "calc(100vh - 64px)",
            overflow: "auto",
            padding: "2rem",
            paddingTop: "8rem",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "1200px",
              backgroundColor: "#fff",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              margin: "0 auto",
              mt: 4,
            }}
          >
            <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center">
              Return Details
            </Typography>

            <form onSubmit={handleSubmit} className="mui-form">
              {/* Existing fields (Sl No, PEN No, etc) */}
              {/* ... your existing TextFields here, with handleChange */}

              {/* Conditionally show these fields only if tech report is required */}
              {techReportRequired === "Yes" && (
                <>
                  <TextField
                    label="From Whom"
                    name="fromWhom"
                    value={formData.fromWhom}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{ mt: 2 }}
                  />

                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="after-report-label">After the report</InputLabel>
                    <Select
                      labelId="after-report-label"
                      name="afterReport"
                      value={formData.afterReport}
                      label="After the report"
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      name="category"
                      value={formData.category}
                      label="Category"
                      onChange={handleChange}
                      required
                    >
                     <MenuItem value="Useable">Useable</MenuItem>
                     <MenuItem value="Repairable">Repairable</MenuItem>
                      <MenuItem value="Damaged">Damaged</MenuItem>
                      
                    </Select>
                  </FormControl>
                </>
              )}

              <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
  <Button
    variant="outlined"
    color="secondary"
    onClick={() => navigate(-1)}
    sx={{
      borderRadius: 2,
      px: 4,
      py: 0.8,
      fontWeight: "bold",
      textTransform: "none",
    }}
  >
    ← Back
  </Button>

  <Button
    variant="contained"
    color="primary"
    type="submit"
    sx={{
      borderRadius: 2,
      px: 5,
      py: 0.8,
      fontWeight: "bold",
    }}
  >
    Submit
  </Button>
</Box>

            </form>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Returnform;
