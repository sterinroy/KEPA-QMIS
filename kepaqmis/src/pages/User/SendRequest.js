import React, { useState, useRef } from 'react';
import Barcode from 'react-barcode';
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import QMIDGenerator from './QMIDGenerator';
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
    PENNo: "",
    date: new Date().toISOString().split("T")[0],
    item: "",
    subCategory: "",
    qty: 1,
  });

  const [qmid, setQmid] = useState('');
  const barcodeRef = useRef();

  const [subCategories, setSubCategories] = useState({
    Electronics: ["Mobile", "Laptop", "Tablet"],
    Furniture: ["Chair", "Table", "Cabinet"],
    Stationery: ["Pen", "Notebook", "Marker"],
    Tools: ["Hammer", "Screwdriver", "Wrench"],
    Weapons: ["Pistol", "Rifle", "Shotgun"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData((prev) => ({
      ...prev,
      item: selectedCategory,
      subCategory: "",
    }));
  };

  const handleAddSubCategory = () => {
    const category = formData.item;
    if (!category) {
      alert("Please select an Item first.");
      return;
    }
    const newSubCategory = prompt(`Add new Sub-Category under "${category}":`);
    if (newSubCategory) {
      if (!subCategories[category].includes(newSubCategory)) {
        setSubCategories((prev) => ({
          ...prev,
          [category]: [...prev[category], newSubCategory],
        }));
        setFormData((prev) => ({
          ...prev,
          subCategory: newSubCategory,
        }));
      } else {
        alert("This Sub-Category already exists.");
      }
    }
  };

  const generatePDF = async (qmid) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      const pdf = new jsPDF({ unit: 'mm', format: 'a4' });

      const barcodeElement = barcodeRef.current;
      const canvas = await html2canvas(barcodeElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#111C44'
      });

      const barcodeData = canvas.toDataURL('image/png');

      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(16);
      pdf.text('KEPA QMIS - Request Details', 105, 20, { align: 'center' });

      pdf.setFontSize(12);
      let y = 40;
      const spacing = 10;
      const indent = 20;

      const details = [
        `QMID: ${qmid}`,
        `PEN No: ${formData.PENNo}`,
        `Date: ${formData.date}`,
        `Item: ${formData.item}`,
        `Sub Category: ${formData.subCategory}`,
        `Quantity: ${formData.qty}`
      ];

      details.forEach(detail => {
        pdf.text(detail, indent, y);
        y += spacing;
      });

      pdf.addImage(barcodeData, 'PNG', indent, y + spacing, 175, 40);

      try {
        pdf.save(`KEPA-Request-${formData.PENNo}.pdf`);
      } catch (saveError) {
        throw new Error(`Failed to save PDF: ${saveError.message}`);
      }
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert(`Failed to generate PDF: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQMID = QMIDGenerator(); // Generate QMID
    setQmid(newQMID);
    await generatePDF(newQMID);
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
            <form onSubmit={handleSubmit} className="mui-form">
              <TextField
                label="PEN No"
                name="PENNo"
                value={formData.PENNo}
                onChange={handleChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                fullWidth
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
              />
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required sx={{ mb: 2 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="item"
                    value={formData.item}
                    onChange={handleCategoryChange}
                    required
                    fullWidth
                    label="Item"
                    sx={{ mb: 2 }}
                  >
                    {Object.keys(subCategories).map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={10} md={5}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <FormControl required sx={{ flex: 1 }}>
                    <InputLabel>Sub-Category</InputLabel>
                    <Select
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleChange}
                      label="Sub-Category"
                      fullWidth
                    >
                      {subCategories[formData.item]?.map((subCat, idx) => (
                        <MenuItem key={idx} value={subCat}>{subCat}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    className="plus purchase-form"
                    variant="outlined"
                    onClick={handleAddSubCategory}
                    sx={{
                      minWidth: '40px',
                      height: '56px',
                      p: 0,
                      '&:hover': {
                        backgroundColor: '#7551FF !important',
                        color: 'white !important',
                        borderColor: '#7551FF !important'
                      }
                    }}
                  >
                    +
                  </Button>
                </Box>
              </Grid>
              <TextField
                label="Quantity"
                type="number"
                name="qty"
                inputProps={{ min: 1 }}
                value={formData.qty}
                onChange={handleChange}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <Box display="flex" justifyContent="flex-end" mt={0.7}>
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
                  Submit and Download PDF
                </Button>
              </Box>

              {/* Hidden Barcode */}
              <div style={{ position: 'fixed', left: '-9999px', top: '-9999px', overflow: 'hidden' }}>
                <div ref={barcodeRef}>
                  {qmid && (
                    <Barcode
                      value={qmid}
                      width={2}
                      height={80}
                      fontSize={16}
                      margin={10}
                      format="CODE128"
                    />
                  )}
                </div>
              </div>
            </form>
          </Box>
        </div>
      </div>
      </div>

  );
};

export default SendRequest;
