import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CircularProgress, Alert, List, ListItem, ListItemText, Divider } from '@mui/material';

const QMIDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch('/api/itemRequestRoutes/item-requests/pending');
        const data = await response.json();
        setPendingRequests(data.data || []);
      } catch (err) {
        setError('Failed to fetch pending item requests. Please make sure the backend is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <h1>Quarter Master Issue Dashboard</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Item Requests</Typography>
              {pendingRequests.length > 0 ? (
                <List>
                  {pendingRequests.map((request, index) => (
                    <React.Fragment key={request._id}>
                      <ListItem>
                        <ListItemText 
                          primary={request.item ? request.item.itemName : "Item name not available"} 
                          secondary={`Requested Quantity: ${request.requestedQty} - Requested By: ${request.requestedBy ? request.requestedBy.name : "N/A"}`}
                        />
                      </ListItem>
                      {index < pendingRequests.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography>No pending item requests.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Quick Stats</Typography>
              <Typography>Total Pending Requests: {pendingRequests.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default QMIDashboard;