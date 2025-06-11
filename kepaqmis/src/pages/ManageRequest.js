import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Box, Typography } from "@mui/material";
import "./User.css"; 

const SIDEBAR_WIDTH = 240;

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
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar activeItem="managerequest" />
      <div
        style={{
          marginLeft: SIDEBAR_WIDTH,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Topbar />
        <div
          style={{
            backgroundColor: "#0C1227",
            height: "calc(100vh - 64px)",
            overflow: "hidden",
            paddingTop: "5rem",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "1200px",
              backgroundColor: "#111C44",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              margin: "0 auto",
              mt: "20px",
              ml: "30px",
            }}
          >
            <Typography
              variant="h5"
              mb={3}
              fontWeight="bold"
              textAlign="center"
              color="white"
            >
              Manage Requests
            </Typography>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              disableRowSelectionOnClick
              autoHeight
              getRowId={(row) => row.id}
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            />

            {rows.length === 0 && (
              <Typography
                mt={2}
                variant="body2"
                align="center"
                color="white"
              >
                0 Records Found
              </Typography>
            )}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ManageRequest;
