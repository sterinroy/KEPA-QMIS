import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestTempIssued } from '../../redux/actions/tempActions';
import './User.css';

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
      
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      
        <Box sx={{ p: 3, overflowY: 'auto', flexGrow: 1 }}>
          <Typography variant="h5" gutterBottom>
            Review Latest Submitted Entry
          </Typography>

          {loading || !latestData ? (
            <Typography>Loading or no data available.</Typography>
          ) : (
            <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
              <Typography variant="body1"><strong>PEN No:</strong> {latestData.PENNo}</Typography>
                <Typography variant="body1"><strong>Date:</strong> {latestData.date}</Typography>
                <Typography variant="body1"><strong>Item Name:</strong> {latestData.itemName}</Typography>
                
                <Typography variant="body1"><strong>Category:</strong> {latestData.category}</Typography>
              <Typography variant="body1"><strong>Quantity:</strong> {latestData.qty}</Typography>
            </Paper>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() => navigate('/ManageRequest', { state: { formData: latestData } })}
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