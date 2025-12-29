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
      title: "Category Master",
      description: "Define and manage hierarchical item classifications and subcategories.",
      icon: <Category sx={{ fontSize: 56, color: "#4FC3F7" }} />,
      buttonText: "Open Category Manager",
      route: "/SuperAdmin/SACategories",
      gradient: "linear-gradient(135deg, rgba(79, 195, 247, 0.1) 0%, rgba(79, 195, 247, 0) 100%)",
    },
    {
      title: "Entity Management",
      description: "Manage authorized offices, companies, and transaction entities.",
      icon: <Business sx={{ fontSize: 56, color: "#81C784" }} />,
      buttonText: "Open Office Manager",
      route: "/SuperAdmin/SAOffices",
      gradient: "linear-gradient(135deg, rgba(129, 199, 132, 0.1) 0%, rgba(129, 199, 132, 0) 100%)",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0c1227",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 10,
        px: 4,
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <Box sx={{ maxWidth: "1200px", width: "100%" }}>
        <Typography
          variant="h3"
          color="white"
          fontWeight="900"
          textAlign="center"
          sx={{
            letterSpacing: "0.1rem",
            textTransform: "uppercase",
            mb: 1,
            textShadow: "0 0 20px rgba(255,255,255,0.1)",
          }}
        >
          System configuration
        </Typography>
        <Typography
          variant="h6"
          color="rgba(255,255,255,0.6)"
          textAlign="center"
          mb={10}
          fontWeight="500"
        >
          Administrative control panel for master data management
        </Typography>

        <Grid container spacing={6} justifyContent="center">
          {cardData.map((card, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  background: "rgba(17, 28, 68, 0.6)",
                  backdropFilter: "blur(20px)",
                  color: "white",
                  borderRadius: "24px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  overflow: "hidden",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "100%",
                    background: card.gradient,
                    zIndex: 0,
                  },
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                    borderColor: "rgba(255,255,255,0.3)",
                    "& .icon-container": {
                      transform: "scale(1.1) rotate(5deg)",
                    }
                  },
                }}
              >
                <CardContent
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 6,
                  }}
                >
                  <Box
                    className="icon-container"
                    sx={{
                      mb: 3,
                      transition: "transform 0.3s ease",
                      p: 2,
                      borderRadius: "20px",
                      bgcolor: "rgba(255,255,255,0.05)"
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography variant="h5" mb={2} fontWeight="800">
                    {card.title}
                  </Typography>
                  <Typography variant="body1" mb={4} sx={{ color: "rgba(255,255,255,0.6)", minHeight: "3em" }}>
                    {card.description}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate(card.route)}
                    sx={{
                      fontWeight: "bold",
                      borderRadius: "12px",
                      px: 6,
                      py: 1.5,
                      bgcolor: "white",
                      color: "#0c1227",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.9)",
                        transform: "scale(1.05)"
                      }
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
    </Box>
  );
};

export default SAEdit;
