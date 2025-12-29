import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Paper,
  Tooltip,
  Avatar
} from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';
import {
  Inventory,
  AssignmentTurnedIn,
  AddShoppingCart,
  ShowChart,
  BarChart,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboardRoutes/stock-dashboard');
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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: { weight: '600' }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(11, 16, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: 'rgba(255, 255, 255, 0.5)' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: 'rgba(255, 255, 255, 0.5)' }
      }
    }
  };

  const categoryChartData = {
    labels: Object.keys(data.byCategory),
    datasets: [
      {
        label: 'Items by Category',
        data: Object.values(data.byCategory),
        backgroundColor: 'rgba(117, 81, 255, 0.5)',
        borderColor: '#7551ff',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const dailyChartData = {
    labels: Object.keys(data.byDate),
    datasets: [
      {
        fill: true,
        label: 'Issued',
        data: Object.values(data.byDate).map(d => d.issued),
        borderColor: '#f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        tension: 0.4,
      },
      {
        fill: true,
        label: 'Purchased',
        data: Object.values(data.byDate).map(d => d.purchased),
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const stats = [
    {
      title: "Total Items",
      value: data.totals.totalItems,
      icon: <Inventory />,
      color: "#7551ff",
      gradient: "linear-gradient(135deg, rgba(117, 81, 255, 0.2) 0%, rgba(117, 81, 255, 0.05) 100%)"
    },
    {
      title: "Total Issued",
      value: data.totals.totalIssued,
      icon: <AssignmentTurnedIn />,
      color: "#f44336",
      gradient: "linear-gradient(135deg, rgba(244, 67, 54, 0.2) 0%, rgba(244, 67, 54, 0.05) 100%)"
    },
    {
      title: "Purchased Today",
      value: data.totals.purchasedToday,
      icon: <AddShoppingCart />,
      color: "#4caf50",
      gradient: "linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(76, 175, 80, 0.05) 100%)"
    }
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#0c1227",
        p: { xs: 2, md: 4 },
        boxSizing: "border-box",
      }}
    >
      {/* Header Section */}
      <Box mb={5} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography
            variant="h4"
            fontWeight="900"
            color="white"
            sx={{ letterSpacing: "1px", mb: 0.5 }}
          >
            SuperAdmin Command Center
          </Typography>
          <Typography variant="body1" color="rgba(255,255,255,0.6)" mb={2}>
            Overview of the global inventory and system activity.
          </Typography>
          <Box display="flex" gap={2}>
            <Paper sx={{ px: 2, py: 0.5, borderRadius: '20px', bgcolor: 'rgba(117, 81, 255, 0.1)', border: '1px solid rgba(117, 81, 255, 0.2)' }}>
              <Typography variant="caption" color="#7551ff" fontWeight="bold">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </Typography>
            </Paper>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="System Status">
            <Box sx={{ p: 1, borderRadius: '12px', bgcolor: 'rgba(76, 175, 80, 0.1)', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, bgcolor: '#4caf50', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
              <Typography variant="caption" color="#4caf50" fontWeight="bold">SYSTEM LIVE</Typography>
            </Box>
          </Tooltip>
        </Box>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} mb={6}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card
              sx={{
                background: stat.gradient,
                borderRadius: "24px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                transition: "all 0.3s ease",
                "&:hover": { transform: "translateY(-5px)", borderColor: stat.color + "88" },
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="caption" color="rgba(255,255,255,0.6)" fontWeight="700" sx={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h3" fontWeight="900" color="white" mt={1}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: stat.color + "22", color: stat.color, width: 64, height: 64 }}>
                    {React.cloneElement(stat.icon, { sx: { fontSize: 32 } })}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              bgcolor: "#111c44",
              borderRadius: "32px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              height: "450px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={4}>
              <BarChart sx={{ color: "#7551ff" }} />
              <Typography variant="h6" fontWeight="800" color="white">Items by Category</Typography>
            </Box>
            <Box flexGrow={1}>
              <Bar data={categoryChartData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              bgcolor: "#111c44",
              borderRadius: "32px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              height: "450px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={4}>
              <ShowChart sx={{ color: "#2196f3" }} />
              <Typography variant="h6" fontWeight="800" color="white">Daily Activity (Last 7 Days)</Typography>
            </Box>
            <Box flexGrow={1}>
              <Line data={dailyChartData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
