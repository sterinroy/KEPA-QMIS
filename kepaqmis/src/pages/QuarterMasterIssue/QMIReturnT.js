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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const QMReturnT = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const fetchIssuedItems = async () => {
      try {
        const res = await fetch("/api/itemRequestRoutes/returns/pending-verification"); // only approved temporary items
        const data = await res.json();
        const temporaryApproved = data.filter((item) => item.temporary && item.status === "approved");
        setItems(temporaryApproved);
      } catch (err) {
        console.error("Error fetching approved items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssuedItems();
  }, []);

  const handleApproveReturn = async () => {
    try {
      const res = await fetch(`/api/itemRequestRoutes/item-requests/${selectedItem._id}/return`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Return approval failed");

      setSnackbar({ open: true, message: "Return approved and stock updated", severity: "success" });
      setItems((prev) => prev.filter((i) => i._id !== selectedItem._id));
      setOpenDialog(false);
    } catch (err) {
      console.error("Error approving return:", err);
      setSnackbar({ open: true, message: "Failed to approve return", severity: "error" });
    }
  };

  const rows = items.map((item) => ({
    id: item._id,
    itemName: item?.item?.itemName || "Unnamed",
    quantity: item?.quantity || 0,
    dateOfIssue: item?.dateOfIssue || "",
    fullItem: item,
  }));

  const columns = [
    { field: "itemName", headerName: "Item", flex: 1 },
    { field: "quantity", headerName: "Qty", width: 120 },
    {
      field: "dateOfIssue",
      headerName: "Issued On",
      width: 160,
      valueGetter: (params) =>
        params.row.dateOfIssue ? new Date(params.row.dateOfIssue).toLocaleDateString() : "",
    },
    {
      field: "action",
      headerName: "Return",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => {
            setSelectedItem(params.row.fullItem);
            setOpenDialog(true);
          }}
        >
          Approve Return
        </Button>
      ),
    },
  ];

  return (
    <Box p={3}>
      <h2>Temporary Return Approvals (QM)</h2>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box mt={2} style={{ height: 500 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10]}
            disableRowSelectionOnClick
          />
        </Box>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle>Confirm Return</DialogTitle>
        <DialogContent>Are you sure this temporary item has been returned?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleApproveReturn}>
            Approve
          </Button>
        </DialogActions>
      </Dialog>

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

export default QMReturnT;
