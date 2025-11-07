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
    { field: "pen", headerName: "PEN No.", flex: 1 },
    { field: "name", headerName: "Name", flex: 1.2 },
    { field: "office", headerName: "Office/ Company", flex: 1.2 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "subcategory", headerName: "Subcategory", flex: 1 },
    { field: "itemName", headerName: "Item", flex: 1 },
    { field: "requestedQty", headerName: "Requested Qty", flex: 1 },
    { field: "unit", headerName: "Unit", flex: 0.8 },
    {
      field: "dateOfrequest",
      headerName: "Date Of Request",
      flex: 1,
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
      flex: 1.5,
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
              backgroundColor: "green",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#00e200ff",
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
              backgroundColor: "red",
              color: "white",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#b30000",
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
    <Box>
      <Typography
        variant="h5"
        sx={{ ml: -2, mb: -3, mt: 23.5, fontWeight: "bold" }}
        component="h2"
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
            sx={{
              "& .MuiDataGrid-cell": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1976d2",
                color: "black",
              },
            }}
          />
        </Box>
      )}

      {/* Dialog for Approve */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Approve Request</DialogTitle>
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
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleApprove}>
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
