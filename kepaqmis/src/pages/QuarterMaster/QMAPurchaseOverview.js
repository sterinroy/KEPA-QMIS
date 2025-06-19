import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, Grid } from "@mui/material";

const QMAPurchaseOverview = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem",width:"100%",height:"80%" }}>
      <Typography variant="h4" gutterBottom>
        Quarter Master Purchase Overview
      </Typography>

      <Grid container spacing={4}>
        {/* Card 1 */}
        <Grid item xs={12} md={6}>
          <Card elevation={4} sx={{ height: "100%" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6">Purchase Entries</Typography>
              <Typography variant="body2">
                View all purchase entries in the system.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/QuarterMasterACQM/QMPEntries")}
              >
                Go to Purchase Entries
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} md={6}>
          <Card elevation={4} sx={{ height: "100%" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6">Purchase Orders</Typography>
              <Typography variant="body2">
                Manage and review purchase orders.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/QuarterMasterACQM/QMPOrder")}
              >
                Go to Purchase Orders
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default QMAPurchaseOverview;
