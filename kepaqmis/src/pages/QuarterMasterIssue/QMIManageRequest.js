import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { Height, Inventory, People } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import "../../StandardForm.css";

const QMIManageRequests = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Manage Purchase Requests",
      description: "Verify and manage purchase entries submitted by QMs.",
      icon: <Inventory sx={{ fontSize: 48, color: "#4DB6AC" }} />,
      buttonText: "Go to Purchase Requests",
      route: "/QuarterMasterIssue/QMIManageApproval",
    },
    {
      title: "Manage User Requests",
      description: "Review and take action on user indent requests.",
      icon: <People sx={{ fontSize: 48, color: "#FFD54F" }} />,
      buttonText: "Go to User Requests",
      route: "/QuarterMasterIssue/QMIManageUsers",
    },
  ];

  return (
    <div className="standard-form-root">
      <Box sx={{ width: "100%", maxWidth: "1200px" }}>
        <Typography
          variant="h4"
          color="white"
          fontWeight="bold"
          textAlign="center"
          mb={6}
          mt={2}
        >
          REQUEST MANAGEMENT PANEL
        </Typography>
        <Grid container spacing={6} justifyContent="center">
          {cardData.map((card, index) => (
            <Grid item key={index}>
              <Card
                sx={{
                  width: 400,
                  height: 280,
                  backgroundColor: "#111c44",
                  color: "white",
                  borderRadius: 3,
                  boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 4,
                  }}
                >
                  {card.icon}
                  <Typography variant="h6" mt={2} gutterBottom fontWeight="bold">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" mb={3}>
                    {card.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(card.route)}
                    sx={{ fontWeight: "bold", borderRadius: 2, px: 4, py: 1 }}
                  >
                    {card.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default QMIManageRequests;
