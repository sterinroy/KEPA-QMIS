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
          /* Aggressive Scrollbar Hiding (Vertical) but Showing Horizontal */
          .outer-container ::-webkit-scrollbar,
          .qmi-manage-request-container ::-webkit-scrollbar,
          .MuiDataGrid-root ::-webkit-scrollbar,
          ::-webkit-scrollbar {
            display: block !important;
            width: 0 !important;
            height: 8px !important;
            background: transparent !important;
          }
          ::-webkit-scrollbar-track {
            background: #0a1535 !important;
          }
          ::-webkit-scrollbar-thumb {
            background: #1e90ff !important;
            border-radius: 4px !important;
          }
          * {
            scrollbar-width: auto !important; /* Allow scrollbars in Firefox */
            -ms-overflow-style: auto !important;
          }

          /* Remove White Bar/Filler in Header */
          .MuiDataGrid-columnHeader--filler,
          .MuiDataGrid-scrollbarFiller,
          .MuiDataGrid-filler,
          [class*="MuiDataGrid-columnHeader--filler"],
          [class*="MuiDataGrid-scrollbarFiller"] {
            display: none !important;
            visibility: hidden !important;
            width: 0 !important;
            min-width: 0 !important;
          }
        `}
      </style>
      <Box
        className="qmi-manage-request-container"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 2 }}>
          <Box sx={{ width: "100%", maxWidth: "1200px", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: "#ffffff",
                mt: 0.9,
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              SYSTEM ACTIVITY & SESSION LOGS
            </Typography>
            {/* Empty Box to maintain flex spacing if needed, though title is absolute */}
            <Box sx={{ height: 40 }} />
          </Box>
        </Box>

        <Box
          className="outer-container"
          sx={{
            width: "100%",
            maxWidth: "1200px !important",
            padding: "24px",
            paddingBottom: "24px",
            boxSizing: "border-box",
            height: "600px",
            overflowX: "auto",
            scrollbarWidth: "auto",
            msOverflowStyle: "auto",
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
            pageSize={8}
            rowsPerPageOptions={[8]}
            autoHeight={false}
            disableRowSelectionOnClick
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              backgroundColor: "#111c44",
              width: "100%",
              height: "100%",

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#111c44 !important",
                color: "#ffffff !important",
              },
              "& .MuiDataGrid-columnHeadersInner": {
                backgroundColor: "#111c44 !important",
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
                color: "#ffffff !important",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "visible",
                textTransform: "uppercase",
              },

              "& .MuiDataGrid-virtualScroller": {
                overflowX: "auto !important",
                "&::-webkit-scrollbar": {
                  display: "block !important",
                  height: "8px !important",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#0a1535 !important",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#1e90ff !important",
                  borderRadius: "4px !important",
                },
              },

              "& .MuiDataGrid-row": {
                backgroundColor: "#0a1535",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#050b19 !important",
              },
              "& .MuiDataGrid-cell": {
                color: "#ffffff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },

              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#111c44",
                color: "#ffffff !important",
                borderTop: "1px solid #1e2a47",
                "& .MuiTablePagination-root": {
                  color: "#ffffff !important",
                },
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                  color: "#ffffff !important",
                },
              },
              "& .MuiDataGrid-columnHeader--filler": {
                display: "none !important",
              },
              "& .MuiDataGrid-scrollbarFiller": {
                display: "none !important",
              },
              "& .MuiDataGrid-menuIcon, & .MuiDataGrid-iconButtonContainer, & .MuiDataGrid-columnHeader .MuiIconButton-root": {
                color: "white !important",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "white !important",
              },
              "& .MuiSvgIcon-root": {
                color: "white !important",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SuperAdminLogs;
