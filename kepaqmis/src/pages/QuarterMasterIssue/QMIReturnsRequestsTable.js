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
  const columns = [
    { field: "name", headerName: "Name", minWidth: 130, flex: 1 },
    { field: "pen", headerName: "PEN No.", minWidth: 120, flex: 1 },
    { field: "itemName", headerName: "Item Name", minWidth: 150, flex: 1 },
    { field: "itemCategory", headerName: "Category", minWidth: 140, flex: 1 },
    {
      field: "itemSubCategory",
      headerName: "Sub Category",
      minWidth: 140,
      flex: 1,
    },
    {
      field: "dateOfReturn",
      headerName: "Date Of Return",
      minWidth: 140,
      type: "date",
      valueGetter: (params) =>
        safeValueGetter(params, "dateOfReturn")
          ? new Date(safeValueGetter(params, "dateOfReturn"))
          : null,
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 100,
      valueGetter: (params) =>
        parseInt(safeValueGetter(params, "quantity")) || 0,
      sortComparator: (v1, v2) => v1 - v2,
      flex: 1,
    },
    {
      field: "whyReturn",
      headerName: "Reason Of Return",
      minWidth: 200,
      flex: 2,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
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
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Action",
      width: 90,
      sortable: false,
      renderCell: (params) =>
        params.row.status !== "Approved" ? (
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={() => handleOpenModal(params.row)}
          >
            Pending
          </Button>
        ) : (
          <Typography color="green">Approved</Typography>
        ),
    },
  ];

  // Add new button handler
  const handleAddNewClick = () => {
    setCurrentItem(null);
    setShowForm(true);
  };

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom color="white">
        Return Verification Table
      </Typography>

      {/* Floating + Add Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          position: "fixed",
          right: 24,
          bottom: 24,
          zIndex: 1000,
          borderRadius: "50%",
          minWidth: "56px",
          minHeight: "56px",
          boxShadow: 3,
        }}
        onClick={handleAddNewClick}
      >
        +
      </Button>

      {/* DataGrid Table */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ maxWidth: "100%" }}>
          <DataGrid
            rows={returnItems}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            disableRowSelectionOnClick
            autoHeight
            getRowId={(row) => row.id}
            initialState={{
              sorting: [{ field: "dateOfReturn", sort: "desc" }],
            }}
            sx={{
              "& .MuiDataGrid-cell": {
                whiteSpace: "normal",
                wordWrap: "break-word",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                whiteSpace: "normal",
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
