import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs } from "../../redux/actions/superAdminActions";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import "./SuperAdmin.css";

const SuperAdminLogs = () => {
  const dispatch = useDispatch();
  const { logs, loading, error } = useSelector((state) => state.superAdmin);

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  const columns = [
    { field: "pen", headerName: "PEN", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "action", headerName: "Action", flex: 1 },
    { field: "resourceType", headerName: "Resource Type", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "ipAddress", headerName: "IP Address", flex: 1 },
    {
      field: "timestamp",
      headerName: "Timestamp",
      flex: 1.5,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toString() === "Invalid Date"
          ? "N/A"
          : date.toLocaleString();
      },
    },
  ];


  // Convert logs to rows with an `id` field
  const rows = logs
    .filter((log) => log && log.timestamp) // skip broken entries
    .map((log, index) => ({
      id: log._id || index,
      ...log,
    }));

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#0c1227",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        pt: 4,
        pl: { xs: 2, md: 5 },
        pr: { xs: 2, md: 4 },
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 2 }}>
        <Box sx={{ width: "100%", maxWidth: "1200px" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="white"
            textAlign="center"
          >
            SYSTEM ACTIVITY & SESSION LOGS
          </Typography>
        </Box>
      </Box>

      <Box
        className="outer-container"
        sx={{
          width: "100%",
          maxWidth: "1200px !important",
          height: "650px",
          overflow: "hidden",
          backgroundColor: "#111c44",
          borderRadius: 3,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns.map((col) => ({
            ...col,
            headerAlign: "center",
            align: "center",
          }))}
          loading={loading}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableRowSelectionOnClick
          sx={{
            border: "none",
            backgroundColor: "#111c44",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#111c44 !important",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#111c44 !important",
              position: "relative",
              "&:not(:last-child)::after": {
                content: '""',
                position: "absolute",
                right: 0,
                top: "25%",
                height: "50%",
                width: "1px",
                backgroundColor: "rgba(255,255,255,0.3)",
              },
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "white",
              fontWeight: "bold",
              fontSize: "0.95rem",
              textTransform: "uppercase",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#0a1535",
              "&::-webkit-scrollbar": {
                display: "block",
                width: "8px",
                height: "8px",
              },
              "&::-webkit-scrollbar-track": { background: "#0a1535" },
              "&::-webkit-scrollbar-thumb": {
                background: "#1e90ff",
                borderRadius: "4px",
              },
            },
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              "&:hover": { backgroundColor: "#050b19 !important" },
            },
            "& .MuiDataGrid-cell": {
              color: "rgba(255,255,255,0.8)",
              fontSize: "0.9rem",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#111c44",
              color: "white",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              "& .MuiTablePagination-root": { color: "white" },
              "& .MuiSvgIcon-root": { color: "white" },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default SuperAdminLogs;
