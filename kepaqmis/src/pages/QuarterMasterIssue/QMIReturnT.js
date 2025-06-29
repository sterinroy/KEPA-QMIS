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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./TempIssue.css";

const QMReturnT = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [returnQty, setReturnQty] = useState(0);

  useEffect(() => {
  fetchIssuedItems();
}, []);

const fetchIssuedItems = async () => {
  try {
    const res = await fetch("/api/userRoute/returns/pending-verification"); 
    const data = await res.json();
    setItems(data);
  } catch (err) {
    console.error("Error fetching approved items:", err);
  } finally {
    setLoading(false);
  }
};

const handleDeleteReturn = async (id) => {
  try {
    const res = await fetch(`/api/itemRequestRoutes/item-requests/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete");
    setSnackbar({ open: true, message: "Return deleted", severity: "info" });
    await fetchIssuedItems();
  } catch (err) {
    setSnackbar({ open: true, message: "Error deleting", severity: "error" });
  }
};



  const handleApproveReturn = async () => {
    try {
      const res = await fetch(
        `/api/itemRequestRoutes/item-requests/${selectedItem._id}/return`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ returnQty }),
        }
      );

      if (!res.ok) throw new Error("Return approval failed");

      setSnackbar({ open: true, message: "Return approved and stock updated", severity: "success" });
      await fetchIssuedItems();
      setOpenDialog(false);
    } catch (err) {
      console.error("Error approving return:", err);
      setSnackbar({
        open: true,
        message: "Failed to approve return",
        severity: "error",
      });
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedItem(null);
    setReturnQty(0);
  };

  const rows = items.map((item) => ({
  id: item._id,
  slNo: item.slNo || "-",
  mobile: item.mobile || "-",
  purpose: item.remarks || "-",
  office: item.toWhom || "-",
  category: item.item?.itemCategory || "-",
  subcategory: item.item?.itemSubCategory || "-",
  itemName: item.item?.itemName || "Unnamed",
  requestedQty: item.requestedQty || 0,
  dateOfrequest: item.dateOfrequest || "",
  fullItem: item,
}));

  const columns = [
  { field: "slNo", headerName: "Sl No", flex: 1 },
  { field: "mobile", headerName: "Mobile", flex: 1 },
  { field: "purpose", headerName: "Purpose", flex: 1 },
  { field: "office", headerName: "Office", flex: 1 },
  { field: "category", headerName: "Category", flex: 1 },
  { field: "subcategory", headerName: "Subcategory", flex: 1 },
  { field: "itemName", headerName: "Item", flex: 1 },
  { field: "requestedQty", headerName: "Approved Qty", flex: 1 },
  {
    field: "dateOfrequest",
    headerName: "Date of request",
    flex: 1,
    renderCell: (params) => {
      const date = new Date(params.value);
      return isNaN(date) ? "N/A" : `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`;
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
            setReturnQty(params.row.requestedQty);
            setOpenDialog(true);
          }}
        >
          Approve
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDeleteReturn(params.row.fullItem._id)}
        >
          Delete
        </Button>
      </Box>
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
          <Box mt={2}>
            <div className="temp-return-table">
              <DataGrid
                columnResizeMode="on"
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
            </div>
          </Box>
        )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle>Approve Return</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <div>Return quantity to approve:</div>
            <TextField
              label="Return Quantity"
              type="number"
              value={returnQty}
              onChange={(e) => setReturnQty(parseInt(e.target.value) || 0)}
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
