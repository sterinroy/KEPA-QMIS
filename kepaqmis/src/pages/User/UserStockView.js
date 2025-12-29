import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./User.css";

const UserStockView = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const pen = localStorage.getItem("pen");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/userRoute/my-allocated-stock/${pen}`);
        const data = await res.json();

        const formattedRows = data.map((entry, index) => ({
          id: entry._id,
          slNo: index + 1,
          itemName: entry.item?.itemName || "N/A",
          category: entry.item?.itemCategory || "N/A",
          qty: entry.requestedQty,
          unit: entry.unit || entry.item?.unit || "N/A",
          status: entry.status,
          approvedDate: entry.approvedDate
            ? new Date(entry.approvedDate).toLocaleDateString()
            : "N/A",
          remarks: entry.remarks || "-",
        }));

        setRows(formattedRows);
      } catch (error) {
        console.error("Error fetching stock:", error);
      } finally {
        setLoading(false);
      }
    };

    if (pen) {
      fetchData();
    }
  }, [pen]);

  const columns = [
    { field: "slNo", headerName: "SL No", width: 80, headerAlign: "center", align: "center" },
    { field: "itemName", headerName: "Item Name", width: 200, headerAlign: "center", align: "center" },
    { field: "category", headerName: "Category", width: 150, headerAlign: "center", align: "center" },
    { field: "qty", headerName: "Quantity", width: 100, headerAlign: "center", align: "center" },
    { field: "unit", headerName: "Unit", width: 100, headerAlign: "center", align: "center" },
    { field: "status", headerName: "Status", width: 130, headerAlign: "center", align: "center" },
    { field: "approvedDate", headerName: "Approved Date", width: 140, headerAlign: "center", align: "center" },
    { field: "remarks", headerName: "Remarks", width: 200, headerAlign: "center", align: "center" },
  ];


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
            ITEM ALLOCATIONS & ASSIGNMENTS
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
        {loading ? (
          <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns.map((col) => ({
              ...col,
              headerAlign: "center",
              align: "center",
            }))}
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
        )}
      </Box>
    </Box>
  );
};

export default UserStockView;
