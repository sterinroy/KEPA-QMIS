import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import QMIVerificationForm from "./QMIVerificationForm";

const initialPendingItems = [
  {
    id: 1,
    orderNo: "ORD1001",
    supplyOrderNo: "SUP1001",
    invoiceDate: "2025-04-01",
    from: "ABC Supplier",
    to: "HQ Office",
    dateOfVerification: "2025-04-05",
    billInvoiceNo: "INV1001",
    amount: "₹5000",
    item: "Printer",
    make: "",
    model: "",
    modelNo: "",
    serialNo: "",
    itemCategory: "Electronics",
    subCategory: "Printers",
    qty: "2",
    unit: "Nos",
    perishable: "No",
    Qmno: "",
    dateOfPurchased: "",
    invoiveNumber: "",
    warranty: "No",
    warrantyPeriod: "",
    warrantyType: "",
    perishable: "",
  },
  {
    id: 2,
    orderNo: "ORD1002",
    supplyOrderNo: "SUP1002",
    invoiceDate: "2025-04-02",
    from: "XYZ Supplier",
    to: "Branch Office",
    dateOfVerification: "2025-04-06",
    billInvoiceNo: "INV1002",
    amount: "₹3000",
    item: "Ink",
    make: "",
    model: "",
    modelNo: "",
    serialNo: "",
    itemCategory: "Stationery",
    subCategory: "Consumables",
    qty: "10",
    unit: "Nos",
    perishable: "Yes",
    Qmno: "",
    dateOfPurchased: "",
    invoiveNumber: "",
    warranty: "Yes",
    warrantyPeriod: "",
    warrantyType: "",
    perishable: "",
  },
];

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
      prev.filter((item) => item.orderNo !== formData.orderNo)
    );
    setShowForm(false);
  };

  const columns = [
    {
      field: "orderNo",
      headerName: "Order No.",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "supplyOrderNo",
      headerName: "Supply Order No.",
      minWidth: 130,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "invoiceDate",
      headerName: "Date Of Invoice",
      minWidth: 110,
      sortable: true,
      type: "date",
      valueGetter: (params) => {
        const dateStr = params.row?.invoiceDate;
        return dateStr ? new Date(dateStr) : null;
      },
    },
    {
      field: "from",
      headername: "fromWhomPurchased",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "to",
      headername: "toWhom",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "dateOfVerification",
      headerName: "Date Of Verification",
      minWidth: 130,
      sortable: true,
      type: "date",
      valueGetter: (params) => {
        const dateStr = params.row?.dateOfVerification;
        return dateStr ? new Date(dateStr) : null;
      },
    },
    {
      field: "billInvoiceNo",
      headerName: "Bill Invoice No.",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 100,
      sortable: true,
      valueGetter: (params) => {
        const amountStr = params.row?.amount;
        return amountStr
          ? parseFloat(amountStr.replace(/[^\d.-]/g, "")) || 0
          : 0;
      },
      sortComparator: (v1, v2) => v1 - v2,
    },
    {
      field: "item",
      headername: "itemName",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "make",
      headerName: "Make/ Brand",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "model",
      headerName: "Model Name",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "modelNo",
      headerName: "Model No",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "serialNo",
      headerName: "Serial/ Product No",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "itemCategory",
      headername: "itemCategory",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "subCategory",
      headerName: "Sub Category",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "qty",
      headerName: "Qty",
      minWidth: 80,
      sortable: true,
      valueGetter: (params) => {
        const qtyStr = params.row?.qty;
        return qtyStr ? parseInt(qtyStr) || 0 : 0;
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
      field: "warranty",
      headerName: "Warranty",
      minWidth: 80,
      sortable: true,
      valueGetter: (params) => params.row?.warranty || "",
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "warrantyPeriod",
      headerName: "Warranty Period",
      minWidth: 100,
      sortable: true,
      valueGetter: (params) => params.row?.warrantyPeriod || "",
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "warrantyType",
      headerName: "Warranty Type",
      minWidth: 100,
      sortable: true,
      valueGetter: (params) => params.row?.warrantyType || "",
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "perishable",
      headerName: "Perishable?",
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
          Pending
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", padding: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom color="white">
        Verification Status
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
            getRowId={(row) => row.id} // Ensure MUI can find the ID
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
        <QMIVerificationForm
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          prefillData={{
            orderNo: currentItem.orderNo || "",
            supplyOrderNo: currentItem.supplyOrderNo || "",
            invoiceDate: currentItem.invoiceDate || "",
            from: currentItem.from || "",
            to: currentItem.to || "",
            dateOfVerification: currentItem.dateOfVerification || "",
            billInvoiceNo: currentItem.billInvoiceNo || "",
            amount: currentItem.amount || "",
            item: currentItem.item || "",
            make: currentItem.make || "",
            model: currentItem.model || "",
            modelNo: currentItem.modelNo || "",
            serialNo: currentItem.serialNo || "",
            itemCategory: currentItem.itemCategory || "",
            subCategory: currentItem.subCategory || "",
            qty: currentItem.qty || "",
            unit: currentItem.unit || "",
            perishable: currentItem.perishable || "",
            Qmno: currentItem.Qmno || "",
            dateOfPurchased: currentItem.dateOfPurchased || "",
            invoiveNumber: currentItem.invoiveNumber || "",
            warranty: currentItem.warranty || "",
            warrantyType: currentItem.warrantyType || "",
            warrantyPeriod: currentItem.warrantyPeriod || "",
          }}
        />
      )}
    </Box>
  );
};

export default QMIVerificationStatus;
