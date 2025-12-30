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
        width: "100%",
        height: "calc(100vh - 64px)",
        pl: { xs: 2, md: 5, lg: 5 },
        pr: { xs: 2, md: 4, lg: 4 },
        pt: { xs: 2, md: 4, lg: 4 },
        pb: { xs: 2, md: 4, lg: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        overflow: "hidden",
        backgroundColor: "#0c1227",
      }}
    >
      <style>
        {`
          /* Aggressive Scrollbar Hiding */
          .SAEdit-root ::-webkit-scrollbar,
          ::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
            background: transparent !important;
          }
          * {
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
        `}
      </style>

      <Box
        className="SAEdit-root"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          height: "100%",
          overflowY: "auto", // Allow scrolling for cards if needed in fixed viewport
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 4 }}>
          <Box sx={{ width: "100%", maxWidth: "1200px", px: 3, display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  color: "#ffffff",
                  mt: 0.9,
                  textTransform: "uppercase",
                  letterSpacing: "0.1rem",
                }}
              >
                System configuration
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  mt: 0.5,
                  fontWeight: "500"
                }}
              >
                Administrative control panel for master data management
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "100%", maxWidth: "1100px", px: 3, display: "flex", gap: 4, justifyContent: "center" }}>
            {cardData.map((card, index) => (
              <Card
                key={index}
                sx={{
                  flex: 1,
                  maxWidth: "500px",
                  background: "rgba(17, 28, 68, 0.6)",
                  backdropFilter: "blur(20px)",
                  color: "white",
                  borderRadius: "24px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  overflow: "hidden",
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
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
                    p: 4,
                    flexGrow: 1,
                  }}
                >
                  <Box
                    className="icon-container"
                    sx={{
                      mb: 2.5,
                      transition: "transform 0.3s ease",
                      p: 1.5,
                      borderRadius: "16px",
                      bgcolor: "rgba(255,255,255,0.05)"
                    }}
                  >
                    {React.cloneElement(card.icon, { sx: { fontSize: 48, color: card.icon.props.sx.color } })}
                  </Box>
                  <Typography variant="h6" mb={1.5} fontWeight="800">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" mb={3} sx={{ color: "rgba(255,255,255,0.6)", minHeight: "3em" }}>
                    {card.description}
                  </Typography>
                  <Box sx={{ mt: "auto" }}>
                    <Button
                      variant="contained"
                      onClick={() => navigate(card.route)}
                      sx={{
                        fontWeight: "bold",
                        borderRadius: "10px",
                        px: 4,
                        py: 1,
                        bgcolor: "white",
                        color: "#0c1227",
                        textTransform: "none",
                        "&:hover": {
                          bgcolor: "rgba(255,255,255,0.9)",
                          transform: "scale(1.05)"
                        }
                      }}
                    >
                      {card.buttonText}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SAEdit;
