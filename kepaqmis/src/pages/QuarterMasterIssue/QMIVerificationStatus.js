import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"; // ✅ Only one DataGrid import needed
import QMIVerificationForm from "./QMIVerificationForm";
// Unified sample data combining all possible fields
const initialPendingItems = [
  {
    id: 1,
    orderNo: "ORD1001",
    supplyOrderNo: "SUP1001",
    invoiceDate: "2025-04-01",
    fromWhomPurchased: "ABC Supplier",
    toWhom: "HQ Office",
    dateOfVerification: "2025-04-05",
    billInvoiceNo: "INV1001",
    amount: "₹5000",
    itemName: "Printer",
    make: "HP",
    model: "LaserJet",
    modelNo: "1234",
    serialNumber: "SN123456789",
    itemCategory: "Electronics",
    itemSubCategory: "Printers",
    quantity: "2",
    unit: "Nos",
    warranty: "No",
    warrantyPeriod: "",
    warrantyType: "",
    perishable: "No",
    Qmno: "QM1001",
    dateOfIssue: "2025-04-02",
    indentNo: "IND1001",
    purchaseOrderNo: "",
    typeOfFund: "",
    status: "Pending", // ✅ New Field Added
  },
  {
    id: 2,
    orderNo: "ORD1002",
    supplyOrderNo: "SUP1002",
    invoiceDate: "2025-04-02",
    fromWhomPurchased: "XYZ Supplier",
    toWhom: "Branch Office",
    dateOfVerification: "2025-04-06",
    billInvoiceNo: "INV1002",
    amount: "₹3000",
    itemName: "Ink",
    make: "",
    model: "",
    modelNo: "",
    serialNumber: "",
    itemCategory: "Stationery",
    itemSubCategory: "Consumables",
    quantity: "10",
    unit: "Nos",
    warranty: "Yes",
    warrantyPeriod: "12",
    warrantyType: "On-Site",
    perishable: "Yes",
    Qmno: "QM1002",
    dateOfIssue: "",
    indentNo: "",
    purchaseOrderNo: "PO1002",
    typeOfFund: "General Fund",
    status: "Pending", // ✅ New Field Added
  },
];

const safeValueGetter = (params, field) => {
  if (!params.row) return null;
  const value = params.row[field];
  return value ? value : null;
};

const QMIVerificationStatus = () => {
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
      prev.map((item) =>
        item.orderNo === formData.orderNo
          ? { ...item, status: "Approved" }
          : item
      )
    );
    setShowForm(false);
  };

  const handleVerified = (id) => {
    setPendingItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );
  };

  const columns = [
    { field: "orderNo", headerName: "Order No.", minWidth: 120 },
    { field: "supplyOrderNo", headerName: "Supply Order No.", minWidth: 130 },
    {
      field: "invoiceDate",
      headerName: "Date Of Invoice",
      minWidth: 110,
      type: "date",
      valueGetter: (params) =>
        safeValueGetter(params, "invoiceDate")
          ? new Date(safeValueGetter(params, "invoiceDate"))
          : null,
    },
    { field: "fromWhomPurchased", headerName: "Supplier Name", minWidth: 120 },
    { field: "toWhom", headerName: "To (Office/Company)", minWidth: 120 },
    {
      field: "dateOfVerification",
      headerName: "Date Of Verification",
      minWidth: 130,
      type: "date",
      valueGetter: (params) =>
        safeValueGetter(params, "dateOfVerification")
          ? new Date(safeValueGetter(params, "dateOfVerification"))
          : null,
    },
    { field: "billInvoiceNo", headerName: "Bill Invoice No.", minWidth: 120 },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 100,
      valueGetter: (params) =>
        parseFloat(
          safeValueGetter(params, "amount")?.replace(/[^\d.-]/g, "") || 0
        ),
      sortComparator: (v1, v2) => v1 - v2,
    },
    { field: "itemName", headerName: "Item Name", minWidth: 120 },
    { field: "make", headerName: "Make / Brand", minWidth: 120 },
    { field: "model", headerName: "Model", minWidth: 120 },
    { field: "modelNo", headerName: "Model No", minWidth: 120 },
    {
      field: "serialNumber",
      headerName: "Serial/Product No",
      minWidth: 120,
    },
    { field: "itemCategory", headerName: "Item Category", minWidth: 120 },
    { field: "itemSubCategory", headerName: "Sub Category", minWidth: 120 },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 80,
      valueGetter: (params) =>
        parseInt(safeValueGetter(params, "quantity")) || 0,
      sortComparator: (v1, v2) => v1 - v2,
    },
    { field: "unit", headerName: "Unit", minWidth: 80 },
    { field: "warranty", headerName: "Warranty", minWidth: 80 },
    { field: "warrantyPeriod", headerName: "Warranty Period", minWidth: 100 },
    { field: "warrantyType", headerName: "Warranty Type", minWidth: 100 },
    { field: "perishable", headerName: "Perishable", minWidth: 100 },
    { field: "Qmno", headerName: "QM No.", minWidth: 100 },
    {
      field: "dateOfIssue",
      headerName: "Date Of Issue",
      minWidth: 110,
      type: "date",
      valueGetter: (params) =>
        safeValueGetter(params, "dateOfIssue")
          ? new Date(safeValueGetter(params, "dateOfIssue"))
          : null,
    },
    { field: "indentNo", headerName: "Indent No.", minWidth: 100 },
    {
      field: "purchaseOrderNo",
      headerName: "Purchase Order No.",
      minWidth: 120,
    },
    { field: "typeOfFund", headerName: "Type Of Fund", minWidth: 120 },
    {
      field: "status",
      headerName: "Verification Status",
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
            onClick={() => handlePendingClick(params.row)}
          >
            Pending
          </Button>
        ) : (
          <Typography color="green">Approved</Typography>
        ),
    },
  ];

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        color="white"
      >
        Verification Status
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ maxWidth: "100%" }}>
          <DataGrid
            rows={pendingItems}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            disableRowSelectionOnClick
            autoHeight
            getRowId={(row) => row.id}
            initialState={{
              sorting: [{ field: "invoiceDate", sort: "desc" }],
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
      {showForm && currentItem && (
        <QMIVerificationForm
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          prefillData={currentItem}
          onVerified={handleVerified}
        />
      )}
    </Box>
  );
};

export default QMIVerificationStatus;