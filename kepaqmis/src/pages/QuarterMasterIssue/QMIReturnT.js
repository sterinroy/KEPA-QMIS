import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

const QMIReturnT = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reason, setReason] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const { user } = useSelector((state) => state.auth); // assumes redux has pen and name

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`/api/userRoute/my-issued-items/${user.pen}`);
        const data = await res.json();
        const temporaryItems = data.filter((item) => item.temporary && item.status === "approved");
        setItems(temporaryItems);
      } catch (err) {
        console.error("Error fetching issued items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [user.pen]);

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setReason("");
    setOpenDialog(true);
  };

  const handleReturnSubmit = async () => {
    try {
      const res = await fetch(`/api/itemRequestRoutes/item-requests/${selectedItem._id}/return`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Return failed");

      setSnackbar({ open: true, message: "Temporary item returned", severity: "success" });
      setOpenDialog(false);
      setItems((prev) => prev.filter((i) => i._id !== selectedItem._id));
    } catch (error) {
      console.error("Return failed:", error);
      setSnackbar({ open: true, message: "Return failed", severity: "error" });
    }
  };

  const columns = [
    { field: "itemName", headerName: "Item", flex: 1, valueGetter: (params) => params.row.item?.itemName },
    { field: "quantity", headerName: "Qty Issued", width: 130, valueGetter: (params) => params.row.quantity },
    { field: "dateOfIssue", headerName: "Issued On", width: 180, valueGetter: (params) => new Date(params.row.dateOfIssue).toLocaleDateString() },
    {
      field: "action",
      headerName: "Return",
      width: 130,
      renderCell: (params) => (
        <Button variant="outlined" onClick={() => handleOpenDialog(params.row)}>Return</Button>
      ),
    },
  ];

  return (
    <Box p={3}>
      <h2>Temporary Issued Items</h2>

      {loading ? (
        <Box display="flex" justifyContent="center"><CircularProgress /></Box>
      ) : (
        <Box mt={2} style={{ height: 500 }}>
          <DataGrid
            rows={items.map((item) => ({ ...item, id: item._id }))}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10]}
            disableRowSelectionOnClick
          />
        </Box>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirm Temporary Return</DialogTitle>
        <DialogContent>
          <TextField
            label="Reason for Return (optional)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
            multiline
            rows={3}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleReturnSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default QMIReturnT;
