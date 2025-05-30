import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Skeleton,
  Button
} from '@mui/material';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import Temp from './Temp'; // Make sure the path is correct

const Tempissued = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/tempstock');
        setFormData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Temporary Stock Issue Details', 20, 20);

    if (Array.isArray(formData)) {
      let y = 30;
      formData.forEach((entry, index) => {
        doc.text(`Record ${index + 1}`, 20, y);
        y += 10;

        const fields = [
          { label: 'Sl No', value: entry.slNo },
          { label: 'PEN No', value: entry.PENNo },
          { label: 'To Whom', value: entry.toWhom },
          { label: 'Name', value: entry.name },
          { label: 'Mobile', value: entry.mobile },
          { label: 'Date of Issue', value: entry.dateOfissue },
          { label: 'Amount', value: entry.amount },
          { label: 'Item Description', value: entry.itemDescription },
          { label: 'Purpose', value: entry.purpose },
          { label: 'Quantity', value: entry.qty }
        ];

        fields.forEach(field => {
          doc.text(`${field.label}: ${field.value}`, 20, y);
          y += 10;
        });

        y += 10;
      });

      doc.save('Stock_Issue_Details.pdf');
    }
  };

  return (
    <Temp>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Review All Submitted Details
        </Typography>

        <Paper elevation={3} sx={{ borderRadius: 2 }}>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Sl No</TableCell>
                  <TableCell>PEN No</TableCell>
                  <TableCell>To Whom</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Date of Issue</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Item Description</TableCell>
                  <TableCell>Purpose</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      {[...Array(10)].map((__, j) => (
                        <TableCell key={j}><Skeleton /></TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center" sx={{ color: 'error.main' }}>
                      {error}
                    </TableCell>
                  </TableRow>
                ) : formData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      No data found.
                    </TableCell>
                  </TableRow>
                ) : (
                  formData.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.slNo}</TableCell>
                      <TableCell>{entry.PENNo}</TableCell>
                      <TableCell>{entry.toWhom}</TableCell>
                      <TableCell>{entry.name}</TableCell>
                      <TableCell>{entry.mobile}</TableCell>
                      <TableCell>{new Date(entry.dateOfissue).toLocaleDateString()}</TableCell>
                      <TableCell>{entry.amount}</TableCell>
                      <TableCell>{entry.itemDescription}</TableCell>
                      <TableCell>{entry.purpose}</TableCell>
                      <TableCell>{entry.qty}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/tempstockdetailentry')}>
            ← Back
          </Button>

          <Button variant="contained" color="primary" onClick={handleGeneratePDF}>
            Generate PDF
          </Button>
        </Box>
      </Box>
    </Temp>
  );
};

export default Tempissued;
