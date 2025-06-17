import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import { Box, Typography } from "@mui/material";
import "./User.css";

const columns = [
  { field: "id", headerName: "PEN NO", width: 90 },
  { field: "Date", headerName: "Date", width: 130 },
  { field: "item", headerName: "Item", width: 130 },
  { field: "subcategory", headerName: "Subcategory", width: 130 },
  { field: "quantity", headerName: "Quantity", width: 100 },
];

const rows = []; // Replace with real data

const ManageRequest = () => {
  return (
      <div className="manage-box">
        {/* <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ justifyItems: "center", alignContent: "center"}}> */}
        <Box className="manage-form">
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            color="#0111C44"
          >
            Manage Requests
            </Typography>

            {/* <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              disableRowSelectionOnClick
              getRowId={(row) => row.id}
              sx={{
                backgroundColor: "#111C44",
                borderRadius: "8px",
              }} */}
            

            {rows.length === 0 && (
              <Typography mt={2} variant="body2" align="center" color="white">
                0 Records Found
              </Typography>
            )}
          </Box>
        </div>
        // </div>
        // </div>
      
    
  );
};

export default ManageRequest;