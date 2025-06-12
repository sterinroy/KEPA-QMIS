import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Card, CardContent, Box, Typography, Grid } from "@mui/material";
import "./User.css";

// Add Stock Widget Components
const IconSprites = () => (
  <svg width="0" height="0" display="none">
    <symbol id="up" viewBox="0 0 16 16">
      <g fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
        <polyline points="2 8,8 2,14 8" />
        <polyline points="8 2,8 14" />
      </g>
    </symbol>
    <symbol id="down" viewBox="0 0 16 16">
      <g fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
        <polyline points="8 2,8 14" />
        <polyline points="2 8,8 14,14 8" />
      </g>
    </symbol>
  </svg>
);

const StockWidget = ({ title, value, change, trend }) => {
  const isUp = trend === 'up';
  
  return (
    <Card className="stock-widget card-widget">
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1 }}>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <svg className={`icon icon--${isUp ? 'success' : 'error'}`} width="16px" height="16px">
            <use href={`#${trend}`} />
          </svg>
          <Typography
            variant="body2"
            color={isUp ? "success.main" : "error.main"}
            sx={{ ml: 1 }}
          >
            {change}% from last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const stockData = [
    { title: "Total Requests", value: "1,234", change: "12", trend: "up" },
    { title: "Pending Items", value: "85", change: "5", trend: "down" },
    { title: "Stock Value", value: "₹4.2M", change: "8", trend: "up" }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, backgroundColor: '#0C1227', minHeight: '100vh' }}>
        <Topbar />
        <Box sx={{ p: 3 }}>
          <IconSprites />
          <Grid 
            container 
            spacing={3} 
            mb={4} 
            sx={{ 
              ml: 60,  // Add negative margin to push left
              width: 'calc(100% + 40px)' // Compensate for the negative margin
            }}
          >
            {stockData.map((stock, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <StockWidget {...stock} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
