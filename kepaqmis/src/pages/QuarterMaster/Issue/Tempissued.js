import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTempIssued } from '../../../redux/actions/tempActions';
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { jsPDF } from 'jspdf';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Tempissued = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { issuedList, loading, error } = useSelector((state) => state.temp);

  useEffect(() => {
    dispatch(fetchTempIssued());
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
          // { label: 'Amount', value: entry.amount },
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

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'slNo', headerName: 'Sl No', width: 90 },
    { field: 'PENNo', headerName: 'PEN No', width: 110 },
    { field: 'toWhom', headerName: 'To Whom', width: 150 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'mobile', headerName: 'Mobile', width: 130 },
    {
      field: 'dateOfissue',
      headerName: 'Date of Issue',
      width: 130,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toString() === "Invalid Date"
          ? "N/A"
          : date.toLocaleString();
      },
        
    },
    // { field: 'amount', headerName: 'Amount', width: 100 },
    { field: 'itemDescription', headerName: 'Item Description', width: 200 },
    { field: 'purpose', headerName: 'Purpose', width: 150 },
    { field: 'qty', headerName: 'Quantity', width: 100 },
  ];

  // Safely map rows and ensure each has an ID
  const rows = Array.isArray(issuedList)
    ? issuedList.map((entry, index) => ({
        id: index + 1,
        ...entry,
      }))
    : [];

  return (
    <>
      <Sidebar activeItem="transfer" />
      <Topbar />
      <Box
        component="main"
        sx={{
          marginLeft: '240px',
          marginTop: '64px',
          padding: 4,
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Review All Submitted Details
        </Typography>

        <Paper elevation={3} sx={{ height: 500, width: '100%', borderRadius: 3 }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box p={3} color="error.main">
              {error}
            </Box>
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
              disableRowSelectionOnClick
              sx={{ borderRadius: 3 }}
            />
          )}
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
          <Button variant="outlined" color="secondary" onClick={() => navigate('/tempstockdetailentry')}>
            ← Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleGeneratePDF}>
            Generate PDF
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Tempissued;
