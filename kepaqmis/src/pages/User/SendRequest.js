import React, { useState, useRef } from 'react';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
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
import QMIDGenerator from './QMIDGenerator';

const SendRequest = () => {
  const formFields = [
    { name: "OfficeNo", label: "Office No", type: "text", required: true },
    { name: "date", label: "Date", type: "date", required: true, value: new Date().toISOString().split("T")[0] },
    { name: "qtyinhand", label: "Qty in Hand", type: "number", required: true },
    { name: "unitsinhand", label: "Unit in Hand", type: "text" },
  ];

  const getInitialFormData = () => {
    const data = {};
    formFields.forEach(field => {
      data[field.name] = field.value || "";
    });
    return data;
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [rows, setRows] = useState([{ item: '', subCategory: '', qty: 1, unit: '' }]);
  const [subCategories, setSubCategories] = useState({
    Electronics: ["Mobile", "Laptop", "Tablet"],
    Furniture: ["Chair", "Table", "Cabinet"],
    Stationery: ["Pen", "Notebook", "Marker"],
    Tools: ["Hammer", "Screwdriver", "Wrench"],
    Weapons: ["Pistol", "Rifle", "Shotgun"],
  });
  const [qmid, setQmid] = useState('');
  const barcodeRef = useRef(null);

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
        `Office No: ${formData.OfficeNo}`,
        `Date: ${formData.date}`,
        `Qty in Hand: ${formData.qtyinhand}`,
        `Unit in Hand: ${formData.unitsinhand}`,
      ];

      rows.forEach((row, index) => {
        details.push(`Item ${index + 1}: ${row.item} - ${row.subCategory} (${row.qty} ${row.unit})`);
      });

      details.forEach(detail => {
        pdf.text(detail, indent, y);
        y += spacing;
      });

      pdf.addImage(barcodeData, 'PNG', indent, y + spacing, 175, 40);

      pdf.save(`KEPA-Request-${formData.OfficeNo}.pdf`);
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert(`Failed to generate PDF: ${error.message}`);
    }
  };

  const openIndentBill = () => {
    const requiredFields = ["OfficeNo", "date", "qtyinhand", "unitsinhand"];
    const missingField = requiredFields.find(field => !formData[field]);

    if (missingField) {
      alert("Please fill all mandatory fields marked with *.");
      return false;
    }

    for (let row of rows) {
      if (!row.item || !row.subCategory || !row.qty || !row.unit) {
        alert("Please fill all item rows completely.");
        return false;
      }
    }

    const indentData = {
      stationNo: formData.OfficeNo,
      officeNo: formData.OfficeNo,
      storeNo: formData.OfficeNo,
      indentFor: JSON.stringify(rows.map((row, index) => `${index + 1}. ${row.item} - ${row.subCategory}`)),
      subCategory: rows.map(row => row.subCategory).join(', '),
      qty: JSON.stringify(rows.map(row => `${row.qty} ${row.unit}`)),
      date: formData.date,
      nameAndDesignation: 'Officer Name',
      qtyinhand: formData.qtyinhand,
      unitsinhand: formData.unitsinhand
    };

    const queryString = new URLSearchParams(indentData).toString();
    window.open(`/indent?${queryString}`, "_blank");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = openIndentBill();
    if (isValid) {
      const newQMID = QMIDGenerator();
      setQmid(newQMID);
      await generatePDF(newQMID);
    }
  };

  const handleDownloadIndentBill = () => {
    openIndentBill();
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ alignContent: "center" }}>
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
            <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center" color="white">
              Indent Generation
            </Typography>

            <form onSubmit={handleSubmit} className="intend-form">
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

              {rows.map((r, idx) => (
                <Box key={idx} mb={3} p={2} border="1px solid #ccc" borderRadius={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <FormControl fullWidth required>
                        <InputLabel>Category</InputLabel>
                        <Select name="item" value={r.item} onChange={(e) => handleRowChange(idx, e)}>
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
                        <Select
                          name="subCategory"
                          value={r.subCategory}
                          onChange={(e) => handleRowChange(idx, e)}
                          disabled={!r.item}
                        >
                          <MenuItem value="">Select Sub-Category</MenuItem>
                          {(subCategories[r.item] || []).map(sub => (
                            <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Button onClick={() => handleAddSubCategory(idx)} size="small">
                        + Add Sub-Category
                      </Button>
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <TextField
                        name="qty"
                        type="number"
                        label="Quantity"
                        value={r.qty}
                        onChange={(e) => handleRowChange(idx, e)}
                        required
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <TextField
                        name="unit"
                        label="Unit"
                        value={r.unit}
                        onChange={(e) => handleRowChange(idx, e)}
                        required
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs={12} md={2} alignSelf="center">
                      {idx > 0 && (
                        <Button color="error" onClick={() => removeRow(idx)}>
                          Remove
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              ))}

              <Button onClick={addRow} sx={{ mb: 2 }}>
                + Add More Items
              </Button>

              <Box textAlign="center" mt={3}>
                <Button type="submit" variant="contained" color="primary">
                  Generate Indent & PDF
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleDownloadIndentBill}
                  sx={{ ml: 2 }}
                >
                  Open Indent Bill
                </Button>
              </Box>
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default SendRequest;
