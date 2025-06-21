import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import QMIManageRequestForm from "./QMIManageRequestForm";

const initialPendingItems = [
  {
    id: 1,
    Qmno: 1,
    dateOfRequest: "",
    requestedBy: "",
    toWhom: "",
    mobile: "",
    quantity: "",
    unit: "",
    temporary: "",
    remarks: "",
  },
  {
    id: 2,
    Qmno: 2,
    dateOfRequest: "",
    requestedBy: "",
    toWhom: "",
    mobile: "",
    quantity: "",
    unit: "",
    temporary: "",
    remarks: "",
  },
];

const QMIManageRequest = () => {
  const [pendingItems, setPendingItems] = useState(initialPendingItems);
  const [showForm, setShowForm] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handlePendingClick = (item) => {
    setCurrentItem(item);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setCurrentItem(null);
  };

  const handleFormSubmit = (formData) => {
    console.log("Submitted:", formData);
    setPendingItems((prev) =>
      prev.filter((item) => item.orderNo !== formData.orderNo)
    );
    setShowForm(false);
  };

  const columns = [
    {
      field: "Qmno",
      headerName: "QM No.",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "dateOfRequest",
      headerName: "Date Of Request",
      minWidth: 110,
      sortable: true,
      type: "date",
      valueGetter: (params) => {
        const dateStr = params.row?.invoiceDate;
        return dateStr ? new Date(dateStr) : null;
      },
    },
    {
      field: "requestedBy",
      headerName: "Requested By.",
      minWidth: 130,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },

    {
      field: "toWhom",
      headerName: "To (Office/ Company)",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "mobile",
      headerName: "Mobile",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 80,
      sortable: true,
      valueGetter: (params) => {
        const quantityStr = params.row?.quantity;
        return quantityStr ? parseInt(quantityStr) || 0 : 0;
      },
      sortComparator: (v1, v2) => v1 - v2,
    },
    {
      field: "unit",
      headerName: "Unit",
      minWidth: 80,
      sortable: true,
      valueGetter: (params) => params.row?.unit || "",
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },

    {
      field: "itemName",
      headerName: "Item Name",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "itemCategory",
      headerName: "Item Category",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "itemSubCategory",
      headerName: "Sub Category",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "temporary",
      headerName: "Temporary",
      minWidth: 100,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "perishable",
      headerName: "Perishable",
      minWidth: 100,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "actions",
      headerName: "Action",
      width: 90,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={() => handlePendingClick(params.row)}
        >
          Approve
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom color="white">
        Manage Requests
      </Typography>

      {/* Scrollable Table Container */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ maxWidth: "100%" }}>
          <DataGrid
            rows={pendingItems}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            disableRowSelectionOnClick
            autoHeight
            getRowId={(row) => row.Qmno} // Ensure MUI can find the ID
            getRowHeight={() => "auto"}
            columnResizeMode="on"
            sortingMode="client"
            initialState={{
              sorting: {
                sortModel: [{ field: "invoiceDate", sort: "desc" }],
              },
            }}
            sx={{
              "& .MuiDataGrid-cell": {
                whiteSpace: "normal",
                wordWrap: "break-word",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                whiteSpace: "normal",
                lineHeight: "1.2rem",
              },
            }}
          />
        </Box>
      </Box>

      {/* Modal Form */}
      {showForm && currentItem && (
        <QMIManageRequestForm
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          prefillData={{
            orderNo: currentItem.orderNo || "",
            Qmno: currentItem.Qmno || "",
            requestedBy: currentItem.requestedBy || "",
            toWhom: currentItem.toWhom || "",
            mobile: currentItem.mobile || "",
            quantity: currentItem.quantity || "",
            unit: currentItem.unit || "",
            temporary: currentItem.temporary || "",
            remarks: currentItem.remarks || "",
          }}
        />
      )}
    </Box>
  );
};

export default QMIManageRequest;
