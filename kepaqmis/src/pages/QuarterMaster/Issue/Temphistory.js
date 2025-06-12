import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTemphistory } from '../../../redux/actions/tempActions';
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
  Button,
} from '@mui/material';
import { jsPDF } from 'jspdf';

const Temphistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { issuedList, loading, error } = useSelector((state) => state.temp);

  useEffect(() => {
    dispatch(fetchTemphistory());
  }, [dispatch]);

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Temporary Stock Issue Details', 20, 20);

    if (Array.isArray(issuedList)) {
      let y = 30;
      issuedList.forEach((entry, index) => {
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
          { label: 'Quantity', value: entry.qty },
        ];

        fields.forEach((field) => {
          doc.text(`${field.label}: ${field.value}`, 20, y);
          y += 10;
        });

        y += 10;
      });

      doc.save('Stock_Issue_Details.pdf');
    }
  };

  return (
    <Box
      component="main"
      sx={{
        padding: 4,
        minHeight: '100vh',
        backgroundColor: '#0C1227',
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom color="white">
        Review All Submitted Details
      </Typography>

      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 520 }}>
          <Table stickyHeader aria-label="issued stock details table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '50%' }}>Details</TableCell>
                <TableCell sx={{ width: '50%' }}>Description & Purpose</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={2}>
                      <Skeleton variant="rectangular" height={100} />
                    </TableCell>
                  </TableRow>
                ))
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={2} align="center" sx={{ color: 'error.main' }}>
                    {error}
                  </TableCell>
                </TableRow>
              ) : issuedList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No data found.
                  </TableCell>
                </TableRow>
              ) : (
                issuedList.map((entry, index) => (
                  <TableRow key={index} hover>
                    <TableCell sx={{ verticalAlign: 'top', pr: 4 }}>
                      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1}>
                        <Typography><b>Sl No:</b> {entry.slNo}</Typography>
                        <Typography><b>PEN No:</b> {entry.PENNo}</Typography>
                        <Typography><b>To Whom:</b> {entry.toWhom}</Typography>
                        <Typography><b>Name:</b> {entry.name}</Typography>
                        <Typography><b>Mobile:</b> {entry.mobile}</Typography>
                        <Typography><b>Date of Issue:</b> {new Date(entry.dateOfissue).toLocaleDateString()}</Typography>
                        <Typography><b>Amount:</b> {entry.amount}</Typography>
                        <Typography><b>Quantity:</b> {entry.qty}</Typography>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ verticalAlign: 'top', pl: 4 }}>
                      <Box display="flex" gap={2}>
                        <Box flex={2}>
                          <Typography><b>Item Description:</b></Typography>
                          <Typography>{entry.itemDescription}</Typography>
                        </Box>
                        <Box flex={1}>
                          <Typography><b>Purpose:</b></Typography>
                          <Typography>{entry.purpose}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          justifyContent: 'space-between',
          maxWidth: 400,
          mx: 'auto',
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/tempissueform')}
        >
          ← Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGeneratePDF}
        >
          Generate PDF
        </Button>
      </Box>
    </Box>
  );
};

export default Temphistory;