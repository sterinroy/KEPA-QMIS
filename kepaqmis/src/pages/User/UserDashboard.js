import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import {
  Assignment,
  Schedule,
  Reply,
  PlaylistAdd,
  ShoppingCartCheckout
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./User.css"; // Uncomment if you have a specific CSS file for styling

const UserDashboard = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Submit Indent Request",
      description: "Submit permanent indent requests for items.",
      icon: <PlaylistAdd sx={{ fontSize: 48, color: "#F06292" }} />,
      buttonText: "Submit Indent",
      route: "/User/UserIndent",
    },
    {
      title: "Manage Requests",
      description: "View and track all your submitted requests.",
      icon: <Assignment sx={{ fontSize: 48, color: "#4FC3F7" }} />,
      buttonText: "Go to Requests",
      route: "/User/UserManageRequest",
    },
    {
      title: "Temporary Request",
      description: "Submit a new temporary item request.",
      icon: <Schedule sx={{ fontSize: 48, color: "#81C784" }} />,
      buttonText: "New Temp Request",
      route: "/User/UserTemp",
    },
    {
      title: "Return Issued Item",
      description: "Submit return request for issued items.",
      icon: <Reply sx={{ fontSize: 48, color: "#FFB74D" }} />,
      buttonText: "Return Item",
      route: "/User/UserReturn",
    },
    {
      title: "My Allocated Stock",
      description: "View all items allocated to you.",
      icon: <ShoppingCartCheckout sx={{ fontSize: 48, color: "#9575CD" }} />,
      buttonText: "View Stock",
      route: "/User/UserStockView",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #1A1A40, #1C2E4A)",
        p: 5,
      }}
    >
      <Typography
        variant="h4"
        color="white"
        fontWeight="bold"
        textAlign="center"
        mb={10}
        mt={10}
      >
        Welcome to User Dashboard
      </Typography>

      <Grid container spacing={6} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={6}  key={index}>
            <Card
              sx={{
                backgroundColor: "#212B55",
                color: "white",
                borderRadius: 3,
                boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
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
                  sx={{
                    fontWeight: "bold",
                    borderRadius: 2,
                    px: 4,
                    py: 1,
                  }}
                >
                  {card.buttonText}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserDashboard;