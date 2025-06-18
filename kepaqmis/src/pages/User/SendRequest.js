import React, { useState } from 'react';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QMIDGenerator from './QMIDGenerator'; // Assuming this generates unique QMID
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import "./User.css";
import { CenterFocusStrong, WidthFull, WidthNormal } from '@mui/icons-material';

const SendRequest = () => {
  const formFields = [
    {
      name: "OfficeNo",
      label: "Office No",
      type: "text",
      required: true,
      
    },
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
      value: new Date().toISOString().split("T")[0],
      
    },
    {
      name: "qtyinhand",
      label: "Qty in Hand",
      type: "number",
      required: true,
    },
    {
      name: "unitsinhand",
      label: "Unit in Hand",
      type: "text",
    },
  ];

  const getInitialFormData = () => {
    const data = {};
    formFields.forEach(field => {
      data[field.name] = field.value || "";
    });
    return data;
  };

  const [formData, setFormData] = useState(getInitialFormData());

  const [rows, setRows] = useState([
    { item: '', subCategory: '', qty: 1, unit: '' }
  ]);

  const [subCategories, setSubCategories] = useState({
    Electronics: ["Mobile", "Laptop", "Tablet"],
    Furniture: ["Chair", "Table", "Cabinet"],
    Stationery: ["Pen", "Notebook", "Marker"],
    Tools: ["Hammer", "Screwdriver", "Wrench"],
    Weapons: ["Pistol", "Rifle", "Shotgun"],
  });

  const [qmid, setQmid] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRowChange = (idx, e) => {
    const { name, value } = e.target;
    setRows(prev =>
      prev.map((r, i) =>
        i === idx
          ? { ...r, [name]: value, ...(name === 'item' && { subCategory: '' }) }
          : r
      )
    );
  };

  const addRow = () =>
    setRows(prev => [...prev, { item: '', subCategory: '', qty: 1, unit: '' }]);

  const removeRow = (idx) =>
    setRows(prev => prev.filter((_, i) => i !== idx));

  const handleAddSubCategory = (idx) => {
    const category = rows[idx].item;
    if (!category) return alert("Please select an item/category first.");
    const newSub = prompt(`Enter new sub-category for "${category}":`);
    if (newSub && !subCategories[category]?.includes(newSub)) {
      setSubCategories(prev => ({
        ...prev,
        [category]: [...(prev[category] || []), newSub]
      }));
      setRows(prev =>
        prev.map((r, i) => (i === idx ? { ...r, subCategory: newSub } : r))
      );
    }
  };

  const generatePDF = async (qmid) => {
    const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(16);
    pdf.text('KEPA QMIS - Request Details', 105, 20, { align: 'center' });
    pdf.setFontSize(12);
    let y = 40;

    pdf.text(`Office No: ${formData.OfficeNo}`, 20, y); y += 10;
    pdf.text(`Date: ${formData.date}`, 20, y); y += 10;
    pdf.text(`Qty in Hand: ${formData.qtyinhand}`, 20, y); y +=15;
    pdf.text(`Unit in Hand: ${formData.unitsinhand}`, 20, y); y += 15;

    rows.forEach((r, i) => {
      pdf.text(`Item ${i + 1}: ${r.item} / ${r.subCategory}`, 20, y); y += 7;
      pdf.text(`Qty: ${r.qty} | Unit: ${r.unit}`, 30, y); y += 10;
    });

    pdf.save(`KEPA-Request-${formData.OfficeNo}.pdf`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQMID = QMIDGenerator(); 
    setQmid(newQMID); 
    await generatePDF(newQMID);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{  alignContent: "center" }}>
        <div className="send-box">
          <Box
            className="send-form"
            sx={{
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              backgroundColor: "#111C44",
            }}
          >
            <Typography
              variant="h5"
              mb={3}
              fontWeight="bold"
              textAlign="center"
              color="white"
            >
              Indent Generation
            </Typography>

            <form onSubmit={handleSubmit} className="intend-form">

              {/* Form Fields */}
              <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
                {formFields.map((field) => (
                  <TextField
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    value={formData[field.name]}
                    onChange={handleFormChange}
                    required={field.required}
                  
                    InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                    sx={{ maxWidth: "426px" }}
                  />
                ))}
              </Box>

              {/* Dynamic Rows */}
              {rows.map((r, idx) => (
                <Box key={idx} mb={3} p={2} border="1px solid #ccc" borderRadius={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth required>
                        <InputLabel>Category</InputLabel>
                        <Select className='cat'
                          name="item"
                          value={r.item}
                          onChange={(e) => handleRowChange(idx, e)}
                        >
                          <MenuItem value="">Select Category</MenuItem>
                          {Object.keys(subCategories).map(cat => (
                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth required>
                        <InputLabel>Sub-Category</InputLabel>
                        <Select className='sub-cat'
                          name="subCategory"
                          value={r.subCategory}
                          onChange={(e) => handleRowChange(idx, e)}
                          disabled={!r.item}
                        >
                          <MenuItem value="">Select Sub-Category</MenuItem>
                          {r.item && subCategories[r.item]?.map(sub => (
                            <MenuItem key={sub} value={sub}>{sub}</MenuItem>
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
                        value={r.qty}
                        onChange={(e) => handleRowChange(idx, e)}
                        required
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <FormControl fullWidth required>
                        <InputLabel>Unit</InputLabel>
                        <Select className='unit-cat'
                          name="unit"
                          value={r.unit}
                          onChange={(e) => handleRowChange(idx, e)}
                        >
                          <MenuItem value="">Select Unit</MenuItem>
                          {["Number", "Liter", "Kilogram", "Meter"].map(unit => (
                            <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={1}>
                      {rows.length > 1 && (
                        <Button color="error" onClick={() => removeRow(idx)}>Remove</Button>
                      )}
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <Button variant="outlined" onClick={() => handleAddSubCategory(idx)}>
                        + Add Sub-Category
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              ))}

              <Button variant="outlined" onClick={addRow}>+ Add Another Item</Button>
              <Box mt={3}>
                <Button className="submit-button" variant="contained" type="submit">
                  Submit & Print
                </Button>
              </Box>

              {/* Optional Barcode */}
              {qmid && (
                <Box sx={{ visibility: 'hidden', position: 'fixed' }}>
                  <Barcode value={qmid} format="CODE128" />
                </Box>
              )}

            </form>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default SendRequest;