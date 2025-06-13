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
    category: "Electronics",
    subCategory: "Printers",
    qty: "2",
    isPerishable: "No",
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
    category: "Stationery",
    subCategory: "Consumables",
    qty: "10",
    isPerishable: "Yes",
  },
];

const VerificationStatus = () => {
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
    { field: "orderNo", headerName: "Order No.", minWidth: 120 },
    { field: "supplyOrderNo", headerName: "Supply Order No.", minWidth: 130 },
    { field: "invoiceDate", headerName: "Date Of Invoice", minWidth: 110 },
    { field: "from", headerName: "From", minWidth: 120 },
    { field: "to", headerName: "To", minWidth: 120 },
    {
      field: "dateOfVerification",
      headerName: "Date Of Verification",
      minWidth: 130,
    },
    { field: "billInvoiceNo", headerName: "Bill Invoice No.", minWidth: 120 },
    { field: "amount", headerName: "Amount", minWidth: 100 },
    { field: "item", headerName: "Item", minWidth: 120 },
    { field: "category", headerName: "Category", minWidth: 120 },
    { field: "subCategory", headerName: "Sub Category", minWidth: 120 },
    { field: "qty", headerName: "Qty", minWidth: 80 },
    { field: "isPerishable", headerName: "Is Perishable", minWidth: 100 },
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
        <Box
          sx={{
            maxWidth: "100%",
          }}
        >
          <DataGrid
            rows={pendingItems}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            disableRowSelectionOnClick
            autoHeight
            getRowHeight={() => "auto"}
            columnResizeMode="on"
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
            orderNo: currentItem.orderNo,
            supplyOrderNo: currentItem.supplyOrderNo,
            invoiceDate: currentItem.invoiceDate,
            from: currentItem.from,
            to: currentItem.to,
            dateOfVerification: currentItem.dateOfVerification,
            billInvoiceNo: currentItem.billInvoiceNo,
            amount: currentItem.amount,
            item: currentItem.item,
            make: "",
            model: "",
            modelNo: "",
            productNo: "",
            category: currentItem.category,
            subCategory: currentItem.subCategory,
            qty: currentItem.qty,
            isPerishable: currentItem.isPerishable,
            qmNO: "",
            dateOfPurchased: "",
            invoiveNumber: "",
          }}
        />
      )}
    </Box>
  );
};

export default VerificationStatus;