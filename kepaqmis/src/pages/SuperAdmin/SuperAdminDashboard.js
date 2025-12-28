import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboardRoutes/stock-dashboard' );
        const data = await response.json();
        setData(data.data || []);
      } catch (err) {
        setError('Failed to fetch dashboard data. Please make sure the backend is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const categoryChartData = {
    labels: Object.keys(data.byCategory),
    datasets: [
      {
        label: 'Items by Category',
        data: Object.values(data.byCategory),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const dailyChartData = {
    labels: Object.keys(data.byDate),
    datasets: [
      {
        label: 'Issued',
        data: Object.values(data.byDate).map(d => d.issued),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Purchased',
        data: Object.values(data.byDate).map(d => d.purchased),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
    ],
  };

  return (
    <div>
      <h1>SuperAdmin Dashboard</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Total Items</Typography>
              <Typography variant="h5">{data.totals.totalItems}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Total Issued</Typography>
              <Typography variant="h5">{data.totals.totalIssued}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Purchased Today</Typography>
              <Typography variant="h5">{data.totals.purchasedToday}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Items by Category</Typography>
              <Bar data={categoryChartData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Daily Activity (Last 7 Days)</Typography>
              <Line data={dailyChartData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
