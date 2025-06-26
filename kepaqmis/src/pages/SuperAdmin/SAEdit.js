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
  Category,
  Business,
  DynamicForm,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SAEdit = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Edit Categories",
      description: "Manage item categories and subcategories.",
      icon: <Category sx={{ fontSize: 48, color: "#4FC3F7" }} />,
      buttonText: "Manage Categories",
      route: "/SuperAdmin/SACategories",
    },
    {
      title: "Edit Offices",
      description: "Manage office/company information for transactions.",
      icon: <Business sx={{ fontSize: 48, color: "#81C784" }} />,
      buttonText: "Manage Offices",
      route: "/SuperAdmin/SAOffices",
    },
    // {
    //   title: "Configure Forms",
    //   description: "Create or update form structures dynamically.",
    //   icon: <DynamicForm sx={{ fontSize: 48, color: "#F06292" }} />,
    //   buttonText: "Configure Forms",
    //   route: "/SuperAdmin/SAFormEditor",
    // },
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
        Edit Panel
      </Typography>

      <Grid container spacing={6} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={6} key={index}>
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

export default SAEdit;
