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
  TextField
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const QMReturnT = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [returnQty, setReturnQty] = useState(0);


  useEffect(() => {
    const fetchIssuedItems = async () => {
      try {
        const res = await fetch("/api/userRoute/returns/pending-verification"); // only approved temporary items
        const data = await res.json();
        // const temporaryApproved = data.filter((item) => item.temporary && item.status === "approved");
        setItems(data);
        console.log(data);
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
        body: JSON.stringify({ returnQty }),
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

  const handleDialogClose = () => {
  setOpenDialog(false);
  setSelectedItem(null);
  setReturnQty(0);
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
    { field: "quantity", headerName: "Qty", flex:1},
    {
      field: "dateOfIssue",
      headerName: "Issued On",
      flex:1,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toString() === "Invalid Date"
          ? "N/A"
          : date.toLocaleString();
      },
    },
    {
      field: "action",
      headerName: "Return",
      flex:1,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => {
            setSelectedItem(params.row.fullItem);
            setReturnQty(params.row.quantity);
            setOpenDialog(true);
          }}
        >
          Approve Return
        </Button>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
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
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <div>
              How many items are being returned?
            </div>
            <TextField
              label="Return Quantity"
              type="number"
              value={returnQty}
              onChange={(e) => setReturnQty(parseInt(e.target.value) || 0)}
              error={returnQty <= 0 || returnQty > (selectedItem?.quantity || 0)}
              helperText={
                returnQty <= 0
                  ? "Quantity must be greater than 0"
                  : returnQty > (selectedItem?.quantity || 0)
                  ? "Cannot return more than issued"
                  : ""
              }
              inputProps={{ min: 1, max: selectedItem?.quantity || 1 }}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
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
    </div>
  );
};

export default QMReturnT;
