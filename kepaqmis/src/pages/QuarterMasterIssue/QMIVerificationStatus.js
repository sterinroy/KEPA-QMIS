import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VerificationForm from "./VerificationForm";

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
    productNo: "",
    category: "Electronics",
    subCategory: "Printers",
    qty: "2",
    isPerishable: "No",
    qmNO: "",
    dateOfPurchased: "",
    invoiveNumber: "",
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
    productNo: "",
    category: "Stationery",
    subCategory: "Consumables",
    qty: "10",
    isPerishable: "Yes",
    qmNO: "",
    dateOfPurchased: "",
    invoiveNumber: "",
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
      headerName: "From",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "to",
      headerName: "To",
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
      headerName: "Item",
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
      field: "productNo",
      headerName: "Serial/ Product No",
      minWidth: 120,
      sortable: true,
      sortComparator: (v1, v2) => (v1 || "").localeCompare(v2 || ""),
    },
    {
      field: "category",
      headerName: "Category",
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
      field: "isPerishable",
      headerName: "Is Perishable",
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
      <Typography variant="h5" fontWeight="bold" gutterBottom>
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
        <VerificationForm
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
            productNo: currentItem.productNo || "",
            category: currentItem.category || "",
            subCategory: currentItem.subCategory || "",
            qty: currentItem.qty || "",
            isPerishable: currentItem.isPerishable || "",
            qmNO: currentItem.qmNO || "",
            dateOfPurchased: currentItem.dateOfPurchased || "",
            invoiveNumber: currentItem.invoiveNumber || "",
          }}
        />
      )}
    </Box>
  );
};

export default QMIVerificationStatus;
