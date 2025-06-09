import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchases } from "../../../redux/actions/purchaseActions";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import "./PurchaseTransfer.css";
import { Box, Paper, Typography, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { jsPDF } from "jspdf";

const PurchaseTransfer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [pen, setPen] = useState("");
  const [role, setRole] = useState(false);

  const { purchases, loading } = useSelector((state) => state.purchase);

  useEffect(() => {
    dispatch(fetchPurchases());

    const passedPen = location.state?.pen;
    const passedRole = location.state?.role;

    if (passedPen) {
      setPen(passedPen);
      localStorage.setItem("pen", passedPen); // optional
    } else {
      const storedPen = localStorage.getItem("pen") || "NA";
      setPen(storedPen);
    }

    if (passedRole) {
      setRole(passedRole);
      localStorage.setItem("role", passedRole); // optional
    } else {
      const storedRole = localStorage.getItem("role") || "NA";
      setRole(storedRole);
    }
  }, [dispatch, location.state]);
  const columns = [
    { field: "order_no", headerName: "Order No", width: 100 },
    { field: "supply_order_no", headerName: "Supply Order No", width: 120 },
    {
      field: "invoice_date",
      headerName: "Invoice Date",
      width: 120,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toString() === "Invalid Date"
          ? "N/A"
          : date.toLocaleString();
      },
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "",
    },
    { field: "from_whom", headerName: "From Whom", width: 120 },
    { field: "to_whom", headerName: "To Whom", width: 120 },
    { field: "bill_invoice_no", headerName: "Bill/Invoice No", width: 120 },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
      type: "number",
    },
    { field: "item", headerName: "Item", width: 120 },
    { field: "sub_category", headerName: "Sub-Category", width: 120 },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
      type: "number",
    },
    {
      field: "status",
      headerName: "Acceptance Status",
      width: 140,
      renderCell: (params) => {
        const status = params.value || "Pending"; // Default to 'Pending' if undefined
        const displayLabel = status === "Pending" ? "Pending" : status;

        let color;
        if (status === "Pending") color = "warning";
        else if (status === "Completed" || status === "Approved")
          color = "success";
        else color = "default";

        return (
          <Chip
            label={displayLabel}
            color={color}
            size="small"
            clickable={false}
            sx={{
              minWidth: 100,
              fontWeight: "bold",
              color: "white !important",
            }}
          />
        );
      },
    },
    {
      field: "PDF",
      headerName: "PDF",
      width: 140,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const handleDownloadPdf = () => {
          const doc = new jsPDF();

          // Access purchase row data
          const data = params.row;

          // Customize PDF content
          doc.setFontSize(16);
          doc.text("Purchase Details", 10, 10);

          doc.setFontSize(12);
          doc.text(`Order No: ${data.order_no}`, 10, 20);
          doc.text(`Supply Order No: ${data.supply_order_no}`, 10, 30);
          doc.text(
            `Invoice Date: ${
              data.invoice_date
                ? new Date(data.invoice_date).toLocaleDateString()
                : "N/A"
            }`,
            10,
            40
          );
          doc.text(`From Whom: ${data.from_whom}`, 10, 50);
          doc.text(`To Whom: ${data.to_whom}`, 10, 60);
          doc.text(`Bill/Invoice No: ${data.bill_invoice_no}`, 10, 70);
          doc.text(`Amount: ${data.amount}`, 10, 80);
          doc.text(`Item: ${data.item}`, 10, 90);
          doc.text(`Sub-Category: ${data.sub_category}`, 10, 100);
          doc.text(`Quantity: ${data.quantity}`, 10, 110);

          // Save the PDF
          doc.save(`purchase_${data.order_no}.pdf`);
        };

        return (
          <button onClick={handleDownloadPdf} style={{ cursor: "pointer" }}>
            Generate PDF
          </button>
        );
      },
    },
  ];

  const rows = purchases.map((purchase, index) => ({
    id: index,
    ...purchase,
  }));

  return (
    <div className="container">
      <Sidebar />

      <main className="main">
        <Topbar pen={pen} role={role} />

        <Box
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column", mt: 2 }}
        >
          <Paper
            sx={{
              borderRadius: 2,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#111C44",
              p: 2,
            }}
          >
            <Box sx={{ px: 2, py: 2, borderBottom: 1, borderColor: "#2C2F57" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "white" }}
              >
                Recent Transfers
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, overflowX: "auto", mt: 1 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
                autoHeight={false}
                sx={{
                  minWidth: "100%",
                  backgroundColor: "#111C44",
                  color: "white",
                  border: "none",
                  ".MuiDataGrid-cell": {
                    color: "white",
                  },
                  ".MuiDataGrid-columnHeaders": {
                    backgroundColor: "#111C44",
                    color: "white",
                  },
                  ".MuiDataGrid-columnHeaderTitle": {
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    color: "white",
                  },
                  ".MuiDataGrid-columnHeader": {
                    backgroundColor: "#111C44",
                  },
                  ".MuiDataGrid-virtualScrollerRenderZone": {
                    backgroundColor: "#111C44",
                  },
                  ".MuiDataGrid-virtualScroller": {
                    backgroundColor: "#111C44",
                  },
                  ".MuiDataGrid-footerContainer": {
                    backgroundColor: "#1A2251",
                    color: "white",
                  },
                  ".MuiDataGrid-row:hover": {
                    backgroundColor: "#2C2F57",
                  },

                  // 🔥 Column menu (3 dots) + filters
                  ".MuiDataGrid-menu": {
                    backgroundColor: "#1A2251",
                    color: "white",
                  },
                  ".MuiDataGrid-iconButtonContainer .MuiSvgIcon-root": {
                    color: "white",
                  },
                  ".MuiPaper-root.MuiMenu-paper": {
                    backgroundColor: "#1A2251 !important",
                    color: "white",
                  },
                  ".MuiMenuItem-root": {
                    color: "white",
                  },
                  ".MuiMenuItem-root:hover": {
                    backgroundColor: "#2C2F57",
                  },

                  // 🔥 Tooltips
                  ".MuiTooltip-tooltip": {
                    backgroundColor: "#1A2251",
                    color: "white",
                  },

                  // 🔥 Pagination (rows per page, page buttons, etc.)
                  ".MuiTablePagination-root": {
                    color: "white",
                  },
                  ".MuiTablePagination-selectLabel": {
                    color: "white",
                  },
                  ".MuiSelect-icon": {
                    color: "white",
                  },
                  ".MuiTablePagination-select": {
                    color: "white",
                  },
                  ".MuiInputBase-root": {
                    color: "white",
                  },
                  ".MuiSvgIcon-root": {
                    color: "white",
                  },
                  ".Mui-disabled": {
                    color: "#888", // Optional: faded color for disabled buttons
                  },
                }}
              />
            </Box>
          </Paper>
        </Box>
      </main>
    </div>
  );
};

export default PurchaseTransfer;
