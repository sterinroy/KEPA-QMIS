import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Avatar,
  Paper,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import {
  Assignment,
  PendingActions,
  Inventory,
  TrendingUp,
  NotificationsActive,
  Person,
  Schedule,
} from "@mui/icons-material";

const QMIDashboard = () => {
  const navigate = useNavigate();
  const [pendingRequests, setPendingRequests] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Pending Requests
        const pendingResponse = await fetch(
          "/api/itemRequestRoutes/item-requests/pending"
        );
        const pendingData = await pendingResponse.json();

        // Fetch Recent Activity (Issue Entries)
        const entriesResponse = await fetch("/api/stockRoutes/purchase/entries");
        const entriesData = await entriesResponse.json();

        if (isMounted) {
          setPendingRequests(pendingData.data || []);
          setRecentActivity((entriesData.data || []).slice(0, 5));
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to connect to the server.");
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, []);

  const stats = [
    {
      title: "Total Pending",
      value: pendingRequests.length,
      icon: <PendingActions sx={{ fontSize: 32 }} />,
      color: "#ff9800",
      bgGradient: "linear-gradient(135deg, #ff9800 0%, #ed6c02 100%)",
      path: "/QuarterMasterIssue/QMIManageRequests",
    },
    {
      title: "Active Stock",
      value: "Check Stock",
      icon: <Inventory sx={{ fontSize: 32 }} />,
      color: "#4caf50",
      bgGradient: "linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)",
      path: "/QuarterMasterIssue/StockItemView",
    },
    {
      title: "Recent Issues",
      value: "View History",
      icon: <Assignment sx={{ fontSize: 32 }} />,
      color: "#2196f3",
      bgGradient: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
      path: "/QuarterMasterIssue/QMIEntries",
    },
    {
      title: "Live Alerts",
      value: "0 New",
      icon: <NotificationsActive sx={{ fontSize: 32 }} />,
      color: "#f44336",
      bgGradient: "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)",
      path: "/QuarterMasterIssue/QMIManageRequests",
    },
  ];

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#0c1227"
      >
        <CircularProgress thickness={5} size={60} sx={{ color: "#7551ff" }} />
      </Box>
    );
  }

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
      {/* Welcome & Header Section */}
      <Box mb={5} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography
            variant="h4"
            fontWeight="900"
            color="white"
            sx={{ letterSpacing: "1px", mb: 0.5 }}
          >
            Welcome Back, Quarter Master
          </Typography>
          <Typography variant="body1" color="rgba(255,255,255,0.6)" mb={2}>
            Here's what's happening in the system today.
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
          <Tooltip title="System Health">
            <Box sx={{ p: 1, borderRadius: '12px', bgcolor: 'rgba(76, 175, 80, 0.1)', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, bgcolor: '#4caf50', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
              <Typography variant="caption" color="#4caf50" fontWeight="bold">SYSTEM LIVE</Typography>
            </Box>
          </Tooltip>
        </Box>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} mb={6} alignItems="stretch">
        {stats.map((stat, index) => (
          <Grid item xs={3} key={index}>
            <Card
              onClick={() => navigate(stat.path)}
              sx={{
                background: "#111c44",
                borderRadius: "28px",
                border: "1px solid rgba(255,255,255,0.05)",
                position: "relative",
                overflow: "hidden",
                minHeight: "140px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-10px)",
                  borderColor: `${stat.color}aa`,
                  boxShadow: `0 20px 40px -15px ${stat.color}44`,
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 120,
                  height: 120,
                  background: `${stat.color}15`,
                  borderRadius: "50%",
                  filter: "blur(35px)",
                }}
              />
              <CardContent sx={{ p: { xs: 3, xl: 4 }, "&:last-child": { pb: { xs: 3, xl: 4 } } }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={2}
                >
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      variant="caption"
                      color="rgba(255,255,255,0.4)"
                      fontWeight="700"
                      sx={{
                        textTransform: "uppercase",
                        letterSpacing: "1.2px",
                        mb: 1,
                        display: "block",
                        fontSize: "0.7rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight="900"
                      color="white"
                      sx={{
                        fontSize: { xs: "1.2rem", md: "1.5rem", lg: "1.8rem" },
                        lineHeight: 1.2,
                        textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      background: stat.bgGradient,
                      width: { xs: 48, md: 56 },
                      height: { xs: 48, md: 56 },
                      boxShadow: `0 8px 24px ${stat.color}55`,
                      flexShrink: 0
                    }}
                  >
                    {React.cloneElement(stat.icon, { sx: { fontSize: { xs: 26, md: 32 } } })}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Sections */}
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Paper
            sx={{
              p: 4.5,
              background: "#111c44",
              borderRadius: "32px",
              minHeight: "550px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={5}
            >
              <Box display="flex" alignItems="center" gap={2.5}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: "18px",
                    bgcolor: "rgba(117, 81, 255, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PendingActions sx={{ color: "#7551ff", fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight="800" color="white">
                    Action Required
                  </Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.45)">
                    High-priority inventory and issue requests
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                size="medium"
                onClick={() => navigate("/QuarterMasterIssue/QMIManageRequests")}
                sx={{
                  borderRadius: "14px",
                  bgcolor: "#7551ff",
                  "&:hover": { bgcolor: "#6236ff" },
                  textTransform: "none",
                  fontWeight: "700",
                  px: 3,
                  boxShadow: "0 4px 15px rgba(117, 81, 255, 0.4)",
                }}
              >
                Manage All
              </Button>
            </Box>

            {pendingRequests.length > 0 ? (
              <Box>
                {pendingRequests.map((request, index) => (
                  <Box
                    key={request._id}
                    sx={{
                      p: 3,
                      mb: 2.5,
                      borderRadius: "24px",
                      bgcolor: "rgba(255,255,255,0.02)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "1px solid rgba(255,255,255,0.03)",
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.05)",
                        borderColor: "rgba(117, 81, 255, 0.5)",
                        transform: "scale(1.02) translateX(12px)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={3.5}>
                      <Avatar
                        sx={{
                          width: 54,
                          height: 54,
                          bgcolor: "rgba(117, 81, 255, 0.15)",
                          color: "#7551ff",
                          border: "2px solid rgba(117, 81, 255, 0.2)",
                        }}
                      >
                        <Person />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="h6"
                          fontSize="1.15rem"
                          fontWeight="800"
                          color="white"
                          gutterBottom
                        >
                          {request.item ? request.item.itemName : "N/A"}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1.2}>
                          <Box
                            sx={{
                              px: 1.2,
                              py: 0.3,
                              borderRadius: "6px",
                              bgcolor: "rgba(117, 81, 255, 0.1)",
                              color: "#7551ff",
                              fontSize: "0.75rem",
                              fontWeight: "700",
                            }}
                          >
                            REQUESTER
                          </Box>
                          <Typography
                            variant="body2"
                            color="rgba(255,255,255,0.5)"
                            fontWeight="500"
                          >
                            {request.requestedBy
                              ? request.requestedBy.name
                              : "Unknown"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box display="flex" alignItems="center" gap={4}>
                      <Box textAlign="right" sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Typography variant="caption" color="rgba(255,255,255,0.3)" fontWeight="700" sx={{ textTransform: 'uppercase' }}>
                          Status
                        </Typography>
                        <Typography variant="body2" color="#ff9800" fontWeight="700">
                          PENDING
                        </Typography>
                      </Box>
                      <Box
                        textAlign="center"
                        sx={{
                          minWidth: '100px',
                          p: 1.5,
                          borderRadius: "18px",
                          bgcolor: "rgba(255,152,0,0.08)",
                          border: "1px solid rgba(255,152,0,0.15)",
                        }}
                      >
                        <Typography variant="h5" fontWeight="900" color="#ff9800">
                          {request.requestedQty}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255,152,0,0.8)", fontWeight: "800" }}
                        >
                          UNITS
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="400px"
              >
                <Box
                  sx={{
                    p: 4,
                    borderRadius: "50%",
                    bgcolor: "rgba(255,255,255,0.02)",
                    mb: 3,
                  }}
                >
                  <PendingActions
                    sx={{ fontSize: 80, color: "rgba(255,255,255,0.08)" }}
                  />
                </Box>
                <Typography color="rgba(255,255,255,0.3)" fontWeight="600" variant="h6">
                  Perfect! All pending tasks are cleared.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper
            sx={{
              p: 4.5,
              background: "#111c44",
              borderRadius: "32px",
              minHeight: "550px",
              height: "100%",
              boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
              border: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={5}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Schedule sx={{ color: "#2196f3", fontSize: 28 }} />
                <Typography variant="h5" fontWeight="800" color="white">
                  Recent Activity
                </Typography>
              </Box>
              <Button
                variant="text"
                size="small"
                onClick={() => navigate("/QuarterMasterIssue/QMIEntries")}
                sx={{
                  color: "#2196f3",
                  fontWeight: "700",
                  textTransform: "none",
                  "&:hover": { bgcolor: "rgba(33, 150, 243, 0.1)" },
                }}
              >
                View History
              </Button>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <Box
                    key={activity._id || index}
                    sx={{
                      p: 2.5,
                      mb: 2,
                      borderRadius: "20px",
                      bgcolor: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.03)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.05)",
                        transform: "translateX(8px)",
                        borderColor: "rgba(33, 150, 243, 0.4)",
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          width: 42,
                          height: 42,
                          bgcolor: "rgba(33, 150, 243, 0.1)",
                          color: "#2196f3",
                        }}
                      >
                        <Assignment fontSize="small" />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight="700"
                          color="white"
                          noWrap
                        >
                          {activity.itemCategory}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="rgba(255,255,255,0.4)"
                          fontWeight="600"
                        >
                          Order: {activity.orderNo}
                        </Typography>
                      </Box>
                      <Box textAlign="right">
                        <Typography
                          variant="body2"
                          color={activity.status === "Approved" ? "#4caf50" : "#ff9800"}
                          fontWeight="800"
                          sx={{ fontSize: "0.75rem" }}
                        >
                          {activity.status.toUpperCase()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  height="300px"
                  sx={{ opacity: 0.3 }}
                >
                  <Schedule sx={{ fontSize: 60, mb: 2 }} />
                  <Typography fontWeight="600">No recent activity</Typography>
                </Box>
              )}
            </Box>

            <Box
              p={3}
              sx={{
                borderRadius: "24px",
                background: "rgba(117, 81, 255, 0.08)",
                border: "1px dashed rgba(117, 81, 255, 0.3)",
                mt: 4,
              }}
            >
              <Typography
                variant="caption"
                color="#7551ff"
                fontWeight="900"
                sx={{ textTransform: "uppercase", letterSpacing: "1px", mb: 1, display: "block" }}
              >
                Pro Tip
              </Typography>
              <Typography
                variant="body2"
                color="rgba(255,255,255,0.6)"
                fontWeight="500"
                fontSize="0.8rem"
              >
                Click on any activity to view full details in the history log.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QMIDashboard;
