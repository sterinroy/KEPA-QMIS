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
          approvedDate: entry.approvedDate ? new Date(entry.approvedDate).toLocaleDateString() : "N/A",
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
    { field: "slNo", headerName: "SL No", width: 80 },
    { field: "itemName", headerName: "Item Name", width: 200 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "qty", headerName: "Quantity", width: 100 },
    { field: "unit", headerName: "Unit", width: 100 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "approvedDate", headerName: "Approved Date", width: 140 },
    { field: "remarks", headerName: "Remarks", width: 200 },
  ];

  return (
    <Box m={2}>
      <Typography variant="h6" gutterBottom>
        My Allocated Stock
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box height={500}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
          />
        </Box>
      )}
    </Box>
  );
};

export default UserStockView;
