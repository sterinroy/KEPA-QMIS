import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ManageUserRequests = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [approvedQty, setApprovedQty] = useState(0);

  const pen = localStorage.getItem("pen") || "";
  const name = localStorage.getItem("name") || "";

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/itemRequestRoutes/item-requests/pending");
      const data = await res.json();
      setItems(data.data || []);
    } catch (err) {
      console.error("Error fetching user requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      const res = await fetch(
        `/api/itemRequestRoutes/item-requests/${selectedItem._id}/approve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pen, name, approvedQty }),
        }
      );

      if (!res.ok) throw new Error("Approval failed");

      setSnackbar({
        open: true,
        message: "Request approved successfully",
        severity: "success",
      });
      setOpenDialog(false);
      await fetchRequests();
    } catch (err) {
      console.error("Error approving request:", err);
      setSnackbar({
        open: true,
        message: "Approval failed",
        severity: "error",
      });
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(
        `/api/itemRequestRoutes/item-requests/${id}/reject`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pen, name }),
        }
      );

      if (!res.ok) throw new Error("Rejection failed");

      setSnackbar({
        open: true,
        message: "Request rejected",
        severity: "info",
      });
      await fetchRequests();
    } catch (err) {
      console.error("Error rejecting request:", err);
      setSnackbar({
        open: true,
        message: "Rejection failed",
        severity: "error",
      });
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedItem(null);
    setApprovedQty(0);
  };

  const rows = items.map((item) => ({
    id: item._id,
    pen: item.requestedBy.pen,
    name: item.requestedBy.name,
    category: item.item?.itemCategory || "-",
    subcategory: item.item?.itemSubCategory || "-",
    itemName: item.item?.itemName || "Unnamed",
    requestedQty: item.requestedQty || 0,
    unit: item.unit || "-",
    office: item.toWhom || "-",
    purpose: item.remarks || "-",
    dateOfrequest: item.dateOfrequest,
    fullItem: item,
  }));

  const columns = [
    { field: "pen", headerName: "PEN No.", minWidth: 120 },
    { field: "name", headerName: "Name", minWidth: 180 },
    { field: "office", headerName: "Office/ Company", minWidth: 180 },
    { field: "category", headerName: "Category", minWidth: 150 },
    { field: "subcategory", headerName: "Subcategory", minWidth: 150 },
    { field: "itemName", headerName: "Item", minWidth: 150 },
    { field: "requestedQty", headerName: "Requested Qty", minWidth: 120 },
    { field: "unit", headerName: "Unit", minWidth: 80 },
    {
      field: "dateOfrequest",
      headerName: "Date Of Request",
      minWidth: 150,
      renderCell: (params) => {
        const date = new Date(params.value);
        return isNaN(date)
          ? "N/A"
          : `${date.getDate().toString().padStart(2, "0")}-${(
            date.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${date.getFullYear()}`;
      },
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 200,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setSelectedItem(params.row.fullItem);
              setApprovedQty(params.row.requestedQty);
              setOpenDialog(true);
            }}
            sx={{
              backgroundColor: "#2e7d32",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#1b5e20",
              },
            }}
          >
            Approve
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={() => handleReject(params.row.fullItem._id)}
            sx={{
              backgroundColor: "#d32f2f",
              color: "white",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#b71c1c",
              },
            }}
          >
            Reject
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 64px)",
        p: { xs: 2, md: 4, lg: 4 }, // Standard symmetric padding
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "auto",
        backgroundColor: "#0c1227",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <Box
        className="manage-user-requests-outer"
        sx={{
          width: "100%",
          maxWidth: "1600px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          color="#ffffff"
          mt={0.9}
          sx={{ textAlign: "center", width: "100%" }}
        >
          MANAGE USER REQUESTS (QM)
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <Box className="manage-user-table">
            <DataGrid
              rows={rows}
              columns={columns.map((col) => ({
                ...col,
                align: "center",
                headerAlign: "center",
              }))}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              disableRowSelectionOnClick
              autoHeight
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "#111c44",
                width: "100%",

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
                "& .MuiDataGrid-columnHeaderTitle": {
                  color: "#ffffff !important",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  overflow: "visible",
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
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "#111c44",
                  color: "white",
                  borderTop: "1px solid #1e2a47",
                },
              }}
            />
          </Box>
        )}
      </Box>

      {/* Dialog for Approve */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            backgroundColor: "#111c44",
            color: "white",
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ color: "white", fontWeight: "bold" }}>
          Approve Request
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Approved Quantity"
              type="number"
              value={approvedQty}
              onChange={(e) => setApprovedQty(parseInt(e.target.value) || 0)}
              fullWidth
              inputProps={{
                min: 1,
                max: selectedItem?.requestedQty || 1,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#8888ff" },
                  "&.Mui-focused fieldset": { borderColor: "#1e90ff" },
                },
                "& .MuiInputLabel-root": { color: "#bbbbff" },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleDialogClose} sx={{ color: "white" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleApprove}
            sx={{
              backgroundColor: "#2e7d32",
              "&:hover": { backgroundColor: "#1b5e20" },
            }}
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageUserRequests;
