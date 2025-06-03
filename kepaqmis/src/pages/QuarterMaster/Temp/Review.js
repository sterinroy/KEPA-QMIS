import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';
// import { jsPDF } from 'jspdf';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestTempIssued } from '../../../redux/actions/tempActions';
import Temp from './Temp';

const Review = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { issuedList, loading } = useSelector((state) => state.temp);
  const latestData = issuedList[0]; // We store latest as [latestEntry]

  useEffect(() => {
    dispatch(fetchLatestTempIssued());
  }, [dispatch]);

  // const handleGeneratePDF = () => {
  //   if (!latestData) return;

  //   const doc = new jsPDF();
  //   doc.setFontSize(14);
  //   doc.text('Temporary Stock Issue - Latest Entry', 20, 20);

  //   const fields = [
  //     { label: 'Sl No', value: latestData.slNo },
  //     { label: 'PEN No', value: latestData.PENNo },
  //     { label: 'To Whom', value: latestData.toWhom },
  //     { label: 'Name', value: latestData.name },
  //     { label: 'Mobile', value: latestData.mobile },
  //     { label: 'Date of Issue', value: latestData.dateOfissue },
  //     { label: 'Amount', value: latestData.amount },
  //     { label: 'Item Description', value: latestData.itemDescription },
  //     { label: 'Purpose', value: latestData.purpose },
  //     { label: 'Quantity', value: latestData.qty },
  //   ];

  //   let y = 30;
  //   fields.forEach(field => {
  //     doc.text(`${field.label}: ${field.value}`, 20, y);
  //     y += 10;
  //   });

  //   doc.save('Latest_Stock_Issue.pdf');
  // };

  return (
    <Temp>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Review Latest Submitted Entry
        </Typography>

        {loading || !latestData ? (
          <Typography>Loading or no data available.</Typography>
        ) : (
          <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
            <Typography variant="body1"><strong>Sl No:</strong> {latestData.slNo}</Typography>
            <Typography variant="body1"><strong>PEN No:</strong> {latestData.PENNo}</Typography>
            <Typography variant="body1"><strong>To Whom:</strong> {latestData.toWhom}</Typography>
            <Typography variant="body1"><strong>Name:</strong> {latestData.name}</Typography>
            <Typography variant="body1"><strong>Mobile:</strong> {latestData.mobile}</Typography>
            <Typography variant="body1"><strong>Date of Issue:</strong> {latestData.dateOfissue}</Typography>
            <Typography variant="body1"><strong>Amount:</strong> {latestData.amount}</Typography>
            <Typography variant="body1"><strong>Item Description:</strong> {latestData.itemDescription}</Typography>
            <Typography variant="body1"><strong>Purpose:</strong> {latestData.purpose}</Typography>
            <Typography variant="body1"><strong>Quantity:</strong> {latestData.qty}</Typography>
          </Paper>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => navigate('/tempstockdetailentry', { state: { formData: latestData } })}
            variant="outlined"
          >
            ← Back
          </Button>
          {/* <Button onClick={handleGeneratePDF} variant="contained" color="primary">
            Generate PDF
          </Button> */}
        </Box>
      </Box>
    </Temp>
  );
};

export default Review;
