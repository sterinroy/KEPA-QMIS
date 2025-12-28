import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { AssignmentReturn, AssignmentTurnedIn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const QMIReturn = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Temporary Return",
      description: "View and approve temporary item returns.",
      icon: <AssignmentReturn sx={{ fontSize: 48, color: "#4FC3F7" }} />,
      buttonText: "Handle Temporary Returns",
      route: "/QuarterMasterIssue/QMIReturnT",
    },
    {
      title: "Permanent Return",
      description: "Verify and categorize permanent item returns.",
      icon: <AssignmentTurnedIn sx={{ fontSize: 48, color: "#81C784" }} />,
      buttonText: "Handle Permanent Returns",
      route: "/QuarterMasterIssue/QMIReturnP",
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
          RETURN MANAGEMENT PANEL
        </Typography>
        <Grid container spacing={6} justifyContent="center">
          {cardData.map((card, index) => (
            <Grid item key={index}>
              <Card
                sx={{
                  width: 320,
                  height: 280,
                  backgroundColor: "#111c44",
                  color: "white",
                  borderRadius: 3,
                  boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
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
                  <Typography variant="body2" mb={3} color="rgba(255,255,255,0.7)">
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

export default QMIReturn;
