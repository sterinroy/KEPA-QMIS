import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submitTempStock } from "../../src/redux/actions/tempActions";
import Sidebar from "./Sidebar";

import Topbar from "./Topbar";
import "./User.css"

import { TextField, Button, Typography, Box } from "@mui/material";

const SIDEBAR_WIDTH = 240;

const Temp = () => {
  const [formData, setFormData] = useState({
    slNo: "",
    PENNo: "",
    toWhom: "",
    dateOfissue: new Date().toISOString().split("T")[0],
    name: "",
    mobile: "",
    itemDescription: "",
    purpose: "",
    qty: 1,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          className="temp-issue-root"
          style={{
            backgroundColor: "#0C1227",
            maxHeight: "660px",
            height: "calc(100vh - 64px)",
            overflow: "hidden",
            paddingTop: "8rem",
          }}
        >
          <Box
            className="temp-issue-box"
            sx={{
              width: "100%",
              maxWidth: "1200px",
              backgroundColor: "#111C44",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              margin: "0 auto",
              mt: "20px",
              ml:"30px",
            }}
          >
            <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center" color="white">
              Temporary Issue Form
            </Typography>

            <form onSubmit={handleSubmit} className="mui-form">
              <TextField
                label="Sl No"
                name="slNo"
                value={formData.slNo}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="PEN No"
                name="PENNo"
                value={formData.PENNo}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Date of Issue"
                type="date"
                name="dateOfissue"
                value={formData.dateOfissue}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="To Whom"
                name="toWhom"
                value={formData.toWhom}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Mobile"
                name="mobile"
                type="number"
                value={formData.mobile}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                label="Quantity"
                type="number"
                name="qty"
                inputProps={{ min: 1 }}
                value={formData.qty}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                className="hello"
                label="Item Description"
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={4}
                sx={{
                  "& .MuiInputBase-root": {
                    height: "auto",
                    padding: "1px",
                  },
                }}
              />
              <TextField
                label="Purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={4}
                sx={{
                  mt: -4,
                  "& .MuiInputBase-root": {
                    height: "auto",
                    padding: "1px",
                  },
                }}
              />
              <Box display="flex" justifyContent="flex-end" mt={.7} mr={-.05}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    borderRadius: 2,
                    px: 5,
                    py: 0,
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

export default Temp;