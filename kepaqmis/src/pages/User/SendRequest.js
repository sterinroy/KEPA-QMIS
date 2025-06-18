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

const SendRequest = () => {
  
  
  const [formData, setFormData] = useState({
    OfficeNo: "",
    date: new Date().toISOString().split("T")[0], 
    qtyinhand: "",
    unitsinhand: "",
  });

  
  const [rows, setRows] = useState([
    { item: '', subCategory: '', qty: 1, unit: '' }
  ]);

  // Predefined category-subcategory map
  const [subCategories, setSubCategories] = useState({
    Electronics: ["Mobile", "Laptop", "Tablet"],
    Furniture: ["Chair", "Table", "Cabinet"],
    Stationery: ["Pen", "Notebook", "Marker"],
    Tools: ["Hammer", "Screwdriver", "Wrench"],
    Weapons: ["Pistol", "Rifle", "Shotgun"],
  });

  // Generated QMID
  const [qmid, setQmid] = useState('');

  // Handle changes in OfficeNo, date, qtyinhand, unitsinhand
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle changes in each row’s item, subCategory, qty, unit
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

  // Add a new item row
  const addRow = () =>
    setRows(prev => [...prev, { item: '', subCategory: '', qty: 1, unit: '' }]);

  // Remove a row by index
  const removeRow = (idx) =>
    setRows(prev => prev.filter((_, i) => i !== idx));

  
  const handleAddSubCategory = (idx) => {
    const category = rows[idx].item;
    if (!category) return alert("Please select an item/category first.");
    const newSub = prompt(`Enter new sub-category for "${category}":`);
    if (newSub && !subCategories[category]?.includes(newSub)) {
      // Update subCategories list
      setSubCategories(prev => ({
        ...prev,
        [category]: [...(prev[category] || []), newSub]
      }));
      // Auto-select the newly added sub-category
      setRows(prev =>
        prev.map((r, i) => (i === idx ? { ...r, subCategory: newSub } : r))
      );
    }
  };

  // Generate and download PDF with all form and row data
  const generatePDF = async (qmid) => {
    const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(16);
    pdf.text('KEPA QMIS - Request Details', 105, 20, { align: 'center' });
    pdf.setFontSize(12);
    let y = 40;

    // General form info
    pdf.text(`Office No: ${formData.OfficeNo}`, 20, y); y += 10;
    pdf.text(`Date: ${formData.date}`, 20, y); y += 10;
    pdf.text(`Qty in Hand: ${formData.qtyinhand}`, 20, y); y += 10;
    pdf.text(`Unit in Hand: ${formData.unitsinhand}`, 20, y); y += 15;

    // Loop through item rows and add them to PDF
    rows.forEach((r, i) => {
      pdf.text(`Item ${i + 1}: ${r.item} / ${r.subCategory}`, 20, y); y += 7;
      pdf.text(`Qty: ${r.qty} | Unit: ${r.unit}`, 30, y); y += 10;
    });

    // Save PDF file
    pdf.save(`KEPA-Request-${formData.OfficeNo}.pdf`);
  };

  // Handle final form submission and trigger PDF generation
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQMID = QMIDGenerator(); // Generate QMID
    setQmid(newQMID); // Update state (can be used for barcode)
    await generatePDF(newQMID); // Generate PDF with current form
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ justifyItems: "center", alignContent: "center"}}>
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
        
        <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
          <TextField
            label="Office No"
            name="OfficeNo"
            value={formData.OfficeNo}
            onChange={handleFormChange}
            required
            
          />
          <TextField
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleFormChange}
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Qty in Hand"
            name="qtyinhand"
            value={formData.qtyinhand}
            onChange={handleFormChange}
            required
          />
          <TextField
            label="Unit in Hand"
            name="unitsinhand"
            value={formData.unitsinhand}
            onChange={handleFormChange}
          />
        </Box>

       
        {rows.map((r, idx) => (
          <Box>
            <Grid  container spacing={2} >
              {/* Category */}
              <Grid className="cat" >
                <FormControl>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="item"
                    value={r.item}
                    onChange={(e) => handleRowChange(idx, e)}
                    required
                  
                    
                  >
                    {Object.keys(subCategories).map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Sub-Category with Add Option */}
              <Grid item >
                <Box display="flex" gap={2}>
                  <FormControl >
                    <InputLabel>Sub-Category</InputLabel>
                    <Select className="sub-cat"
                      name="subCategory"
                      value={r.subCategory}
                      onChange={(e) => handleRowChange(idx, e)}
                      required
                    >
                      {(subCategories[r.item] || []).map((sub) => (
                        <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button onClick={() => handleAddSubCategory(idx)}>+</Button>
                </Box>
              </Grid>

              {/* Quantity */}
              <Grid className="cat">
                <TextField
                  label="Qty"
                  name="qty"
                  type="number"
                  inputProps={{ min: 1 }}
                  value={r.qty}
                  onChange={(e) => handleRowChange(idx, e)}
                  required
                  
                />
              </Grid>

              {/* Unit */}
              <Grid item xs={12} md={2}>
                <FormControl>
                  <InputLabel>Unit</InputLabel>
                  <Select className="unit-cat"
                    name="unit"
                    value={r.unit}
                    onChange={(e) => handleRowChange(idx, e)}
                    required
                    >
                    {["Number", "Liter", "Kilogram", "Meter"].map((unit) => (
                      <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Remove Button */}
              <Grid item xs={12} md={1}>
                {rows.length > 1 && (
                  <Button color="error" onClick={() => removeRow(idx)}>Remove</Button>
                )}
              </Grid>
            </Grid>
          </Box>
        ))}

        {/* Add Another Item Row */}
        <Button variant="outlined" onClick={addRow}>+ Add Another Item</Button>

        {/* Submit */}
        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Submit & Print
          </Button>
        </Box>
      </form>

      {/* Barcode (Optional Hidden or Use Later) */}
      {qmid && (
        <Box sx={{ visibility: 'hidden', position: 'fixed' }}>
          <Barcode value={qmid} format="CODE128" />
        </Box>
      )}
    </Box>
    </div>
    </div>
    </div>
  );
};

export default SendRequest;
