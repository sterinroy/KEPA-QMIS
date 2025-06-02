import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestTempIssued } from '../../../redux/actions/tempActions';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Review = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { issuedList, loading } = useSelector((state) => state.temp);
  const latestData = issuedList[0]; // We store latest as [latestEntry]

  useEffect(() => {
    dispatch(fetchLatestTempIssued());
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <Box sx={{ p: 3, overflowY: 'auto', flexGrow: 1 }}>
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Review;
