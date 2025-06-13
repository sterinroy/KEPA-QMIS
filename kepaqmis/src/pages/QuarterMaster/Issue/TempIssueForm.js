import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { submitTempStock } from "../../../redux/actions/tempActions";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import './Issue.css';
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SIDEBAR_WIDTH = 240;

const TempIssueForm = () => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
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

  const officeOptions = [
    "A block", "AC I Wing", "AC II Wing", "AD Admin", "AD MT", "AD Outdoor", "AD PS", "AD Training",
    "Armour Wing", "B Block", "Computer Lab", "CPC", "Cyber Forensics Lab",
    "Direcor Bunglow", "Director Office", "DKMS", "Drinking Water Treatment Plant (DWTP)",
    "Driving School", "Dry Canteen", "Duty Office", "DySP Admin", "DySP Indoor", "DySP PS1",
    "DySP PS2", "DySP TTNS", "Guest House", "HoD Behavioral Science", "HoD Computer Application", "HoD Forensics Medicine",
    "HoD Forensics Science", "HoD Law", "IGP/ DIG Training", "Indoor",
    "Inspector Admin Office", "Inspector Indoor OFFICE", "Laundry", "Model PS",
    "MT Office", "PRC", "R & P Wing", "SDTS", "SO Mess", "Super Market", "Swimming Pool",
    "Telecommunication Wing", "TT 01", "TT 02", "TT 03", "TT 04", "TT 05", "TT 06", "TT 07", "TT 08",
    "TT 09", "TT 10", "Unit Hospital", "Vishranthi", "Wet Canteen"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      const message = await dispatch(submitTempStock(formData));
      alert(message);
      navigate("/review", { state: { formData } });
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setOpenConfirmDialog(false);
    }
  };

  return (
    <>
      <div style={{ display: "flex", backgroundColor: "#0C1227", minHeight: "100vh" }}>
        <Sidebar activeItem="tempissue" />
        <div style={{ marginLeft: SIDEBAR_WIDTH, flex: 1, paddingBottom: "4rem" }}>
          <Topbar />
          <div
            className="direct-issue-root"
            style={{
              backgroundColor: "#0C1227",
              minHeight: "100vh",
              padding: "2rem",
              paddingBottom: "5rem",
            }}
          >
            <Box className="direct-issue-box">
              <Typography
                variant="h5"
                mb={2}
                fontWeight="bold"
                textAlign="center"
                color="white"
              >
                Temporary Issue Form
              </Typography>

              <form onSubmit={handleSubmit} className="mui-form">
                {[
                  { label: "Sl No", name: "slNo" },
                  { label: "PEN No", name: "PENNo" },
                  { label: "Date of Issue", name: "dateOfissue", type: "date", shrink: true },
                  { label: "Name", name: "name" },
                  { label: "Mobile", name: "mobile", type: "number" },
                  { label: "Quantity", name: "qty", type: "number" },
                ].map(({ label, name, type = "text", shrink = false }) => (
                  <TextField
                    key={name}
                    label={label}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    InputLabelProps={shrink ? { shrink: true } : undefined}
                    sx={{
                      input: { color: "white" },
                      label: { color: "white" },
                      fieldset: { borderColor: "white" },
                    }}
                  />
                ))}

                <FormControl
                  fullWidth
                  required
                  margin="normal"
                  sx={{
                    flex: 1,
                    label: { color: "white" },
                    svg: { color: "white" },
                    fieldset: { borderColor: "white" },
                  }}
                >
                  <InputLabel sx={{ color: "white" }}>Office / Company</InputLabel>
                  <Select
                    name="toWhom"
                    value={formData.toWhom}
                    onChange={handleChange}
                    sx={{ color: "white" }}
                  >
                    {officeOptions.map((label) => (
                      <MenuItem key={label} value={label}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                label="Item Description"
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={4}
                margin="normal"
                 InputLabelProps={{ shrink: true }} 
                sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}

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
                  margin="normal"
                   InputLabelProps={{ shrink: true }} 
                  sx={{ input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}

                />

                <Box display="flex" justifyContent="flex-end" mt={2} ml={60}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ borderRadius: 2, px: 8.3, py: 0, fontWeight: "bold" }}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Confirm Submission
          <IconButton
            aria-label="close"
            onClick={() => setOpenConfirmDialog(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Please review the details before submitting:
          </Typography>
          {Object.entries(formData).map(([key, value]) => (
            <Box key={key} display="flex" justifyContent="space-between" mb={1}>
              <Typography color="textSecondary">{key}:</Typography>
              <Typography>{value}</Typography>
            </Box>
          ))}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenConfirmDialog(false)} color="inherit">
            Edit
          </Button>
          <Button onClick={handleConfirmSubmit} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
};

export default TempIssueForm;
