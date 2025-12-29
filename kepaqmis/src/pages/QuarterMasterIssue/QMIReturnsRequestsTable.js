import React, { useState } from "react";
import { Box, Typography, Button, Dialog, DialogContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// Import your form
import QMIReturnRequestForm from "./QMIReturnRequestForm";

// Sample data
const initialReturnItems = [
  {
    id: 1,
    name: "John Doe",
    pen: "PEN1001",
    itemName: "Laptop",
    itemCategory: "Electronics",
    itemSubCategory: "Computers",
    dateOfReturn: "2025-04-05",
    quantity: "1",
    whyReturn: "Defective Product",
    status: "Pending",
  },
  {
    id: 2,
    name: "Jane Smith",
    pen: "PEN1002",
    itemName: "Printer Ink",
    itemCategory: "Stationery",
    itemSubCategory: "Consumables",
    dateOfReturn: "2025-04-07",
    quantity: "5",
    whyReturn: "Ordered Wrong Item",
    status: "Pending",
  },
];

// Utility for safe access
const safeValueGetter = (params, field) => {
  return params.row && params.row[field] ? params.row[field] : null;
};

const ReturnRequestsTable = () => {
  const [returnItems, setReturnItems] = useState(initialReturnItems);
  const [showForm, setShowForm] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Handle form submission
  const handleFormSubmit = (formData) => {
    console.log("Submitted:", formData);

    if (formData.id) {
      // Edit mode - update existing row
      setReturnItems((prev) =>
        prev.map((item) =>
          item.id === formData.id
            ? { ...item, ...formData, status: "Approved" }
            : item
        )
      );
    } else {
      // Add mode - add new pending request
      const newItem = {
        ...formData,
        id: Date.now(),
        status: "Pending",
      };
      setReturnItems((prev) => [...prev, newItem]);
    }
  };

  // Open form modal
  const handleOpenModal = (item) => {
    setCurrentItem(item);
    setShowForm(true);
  };

  // Close form
  const handleCloseForm = () => {
    setShowForm(false);
    setCurrentItem(null);
  };

  // Approve an item manually
  const handleApprove = (id) => {
    setReturnItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );
  };

  // Columns for DataGrid
  const rows = returnItems.map((item, index) => ({
    ...item,
    slNo: index + 1,
    mobile: item.mobile || item.requestedBy?.phone || "-",
    office: item.office || "-",
    category: item.itemCategory || "-", // Map existing itemCategory to new category field
    subcategory: item.itemSubCategory || "-", // Map existing itemSubCategory to new subcategory field
    qty: item.quantity || "0", // Map existing quantity to new qty field
    // Ensure all master columns are present
  }));

  const columns = [
    { field: "slNo", headerName: "Sl No", minWidth: 60 },
    { field: "name", headerName: "Name", minWidth: 140 },
    { field: "pen", headerName: "PEN No.", minWidth: 110 },
    { field: "mobile", headerName: "Mobile", minWidth: 110 },
    { field: "office", headerName: "Office", minWidth: 120 },
    { field: "category", headerName: "Category", minWidth: 110 },
    { field: "subcategory", headerName: "Subcategory", minWidth: 110 },
    { field: "itemName", headerName: "Item", minWidth: 120 },
    {
      field: "qty",
      headerName: "Qty",
      minWidth: 70,
      valueGetter: (params) =>
        parseInt(safeValueGetter(params, "qty")) || 0,
      sortComparator: (v1, v2) => v1 - v2,
    },
    {
      field: "dateOfReturn",
      headerName: "Date of Return",
      minWidth: 120,
      type: "date",
      valueGetter: (params) =>
        safeValueGetter(params, "dateOfReturn")
          ? new Date(safeValueGetter(params, "dateOfReturn"))
          : null,
    },
    {
      field: "whyReturn",
      headerName: "Reason",
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      renderCell: (params) => (
        <Box
          sx={{
            fontWeight: "bold",
            color:
              params.row.status === "Approved"
                ? "green"
                : params.row.status === "Pending"
                  ? "orange"
                  : "black",
          }}
        >
          {params.row.status}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      minWidth: 120,
      sortable: false,
      renderCell: (params) =>
        params.row.status !== "Approved" ? (
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={() => handleOpenModal(params.row)}
            sx={{ fontWeight: "bold", textTransform: "none" }}
          >
            Pending
          </Button>
        ) : (
          <Typography color="green" variant="body2" sx={{ fontWeight: "bold" }}>Approved</Typography>
        ),
    },
  ];

  // Add new button handler
  const handleAddNewClick = () => {
    setCurrentItem(null);
    setShowForm(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 64px)",
        pl: { xs: 2, md: 5, lg: 5 },
        pr: { xs: 2, md: 5, lg: 5 },
        pt: { xs: 2, md: 4, lg: 4 },
        pb: { xs: 2, md: 4, lg: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        overflow: "hidden", // Disable page-level scrolling
        backgroundColor: "#0c1227",
      }}
    >
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
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "100%", maxWidth: "1200px", display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              color="#ffffff"
              mt={0.9}
              sx={{ textAlign: "center" }}
            >
              Return Verification Table
            </Typography>
          </Box>
        </Box>

        <Box className="outer-container" sx={{ width: "100%", maxWidth: "1200px !important", height: "650px", overflow: "hidden" }}>
          <DataGrid
            rows={rows}
            columns={columns.map((col) => {
              if (col.field === "actions") {
                return {
                  ...col,
                  align: "center",
                  headerAlign: "center",
                  renderCell: (params) =>
                    params.row.status !== "Approved" ? (
                      <button
                        className="approve-button"
                        onClick={() => handleOpenModal(params.row)}
                        style={{ backgroundColor: "orange" }}
                      >
                        Pending
                      </button>
                    ) : (
                      <Typography color="green" variant="body2" sx={{ fontWeight: "bold" }}>Approved</Typography>
                    ),
                };
              }
              return {
                ...col,
                align: "center",
                headerAlign: "center",
              };
            })}
            paginationModel={{ pageSize: 10, page: 0 }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
            getRowId={(row) => row.id}
            initialState={{
              sorting: [{ field: "dateOfReturn", sort: "desc" }],
            }}
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
              },
              "& .MuiDataGrid-filler": {
                backgroundColor: "#111c44 !important",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                color: "#ffffff !important",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "visible",
              },

              "& .MuiDataGrid-virtualScroller": {
                "&::-webkit-scrollbar": {
                  display: "block !important",
                  width: "8px !important",
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
                borderBottom: "1px solid #1e2a47 !important",
              },

              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#111c44",
                color: "white",
                borderTop: "1px solid #1e2a47",
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

      {/* Modal Form */}
      <Dialog open={showForm} onClose={handleCloseForm} maxWidth="md" fullWidth>
        <DialogContent>
          <QMIReturnRequestForm
            onClose={handleCloseForm}
            onSubmit={handleFormSubmit}
            prefillData={currentItem}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ReturnRequestsTable;
