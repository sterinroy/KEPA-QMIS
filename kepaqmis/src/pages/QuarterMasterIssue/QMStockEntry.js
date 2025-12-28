import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { LocalShipping, Inventory, AddBox } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./StockEntry.css";

const QMStockEntries = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Direct Issue Entry",
      description: "Add items directly issued by the government.",
      icon: <LocalShipping sx={{ fontSize: 48, color: "#FFD54F" }} />,
      buttonText: "Go to Direct Issue",
      route: "/QuarterMasterIssue/QMIDirectForm",
    },
    {
      title: "Purchase Entry",
      description: "Purchased items into stock.",
      icon: <Inventory sx={{ fontSize: 48, color: "#4DB6AC" }} />,
      buttonText: "Go to Purchase Entry",
      route: "/QuarterMasterIssue/QMIPurchase",
    },
    {
      title: "Stock Entry View",
      description: "Add stock items.",
      icon: <AddBox sx={{ fontSize: 48, color: "#BA68C8" }} />,
      buttonText: "View Stock Entries",
      route: "/QuarterMasterIssue/QMIStockEntryForm",
    },
  ];

  return (
    <div className="stock-entry-panel">
      <Box sx={{ minHeight: "100vh", background: "#ffffffff" }}>
        <Typography
          variant="h4"
          color="#0c1227"
          fontWeight="bold"
          textAlign="center"
          mb={10}
          mt={10}
        >
          STOCK ENTRY MANAGEMENT PANEL
        </Typography>
        <Grid container spacing={6} justifyContent="center">
          {cardData.map((card, index) => (
            <Grid item key={index}>
              <Card
                sx={{
                  width: 320, // 🔹 fixed equal width for all
                  backgroundColor: "#263859",
                  color: "white",
                  borderRadius: 3,
                  boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s ease",
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
                  <Typography
                    variant="h6"
                    mt={2}
                    gutterBottom
                    fontWeight="bold"
                  >
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

export default QMStockEntries;
