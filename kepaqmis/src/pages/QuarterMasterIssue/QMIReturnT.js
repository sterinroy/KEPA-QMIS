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
      setItems(data.data);
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

      setSnackbar({
        open: true,
        message: "Return approved and stock updated",
        severity: "success",
      });
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

  const rows = items.map((item, index) => ({
    id: item._id,
    slNo: index + 1,
    mobile: item.mobile || item.requestedBy?.phone || "-",
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
    { field: "slNo", headerName: "Sl No", minWidth: 60 },
    { field: "mobile", headerName: "Mobile", minWidth: 110 },
    { field: "purpose", headerName: "Purpose", minWidth: 120 },
    { field: "office", headerName: "Office", minWidth: 120 },
    { field: "category", headerName: "Category", minWidth: 110 },
    { field: "subcategory", headerName: "Subcategory", minWidth: 110 },
    { field: "itemName", headerName: "Item", minWidth: 120 },
    { field: "requestedQty", headerName: "Approved Qty", minWidth: 100 },
    {
      field: "dateOfrequest",
      headerName: "Date of request",
      minWidth: 120,
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
      minWidth: 180,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "green",
              "&:hover": { backgroundColor: "darkgreen" },
              fontWeight: "bold",
              textTransform: "none",
            }}
            onClick={() => {
              setSelectedItem(params.row.fullItem);
              setReturnQty(params.row.requestedQty);
              setOpenDialog(true);
            }}
          >
            Approve
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "red",
              "&:hover": { backgroundColor: "darkred" },
              fontWeight: "bold",
              textTransform: "none",
            }}
            onClick={() => handleDeleteReturn(params.row.fullItem._id)}
          >
            Delete
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
        pl: { xs: 2, md: 5, lg: 5 },
        pr: { xs: 2, md: 5, lg: 5 },
        pt: { xs: 2, md: 4, lg: 4 },
        pb: { xs: 2, md: 4, lg: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        overflow: "hidden", // Disable page-level scrolling
        backgroundColor: "#0c1227",
      }}
    >
      <Box
        className="qmi-manage-request-container"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "100%", maxWidth: "1200px", display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              color="#ffffff"
              mt={0.9}
              sx={{ textAlign: "center" }}
            >
              TEMPORARY RETURN APPROVALS (QM)
            </Typography>
          </Box>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" width="100%" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Box className="outer-container" sx={{ width: "100%", maxWidth: "1200px !important", height: "650px", overflow: "hidden" }}>
            <DataGrid
              rows={rows}
              columns={columns.map((col) => {
                if (col.field === "action") {
                  return {
                    ...col,
                    align: "center",
                    headerAlign: "center",
                    renderCell: (params) => (
                      <Box display="flex" gap={1}>
                        <button
                          className="approve-button"
                          onClick={() => {
                            setSelectedItem(params.row.fullItem);
                            setReturnQty(params.row.requestedQty);
                            setOpenDialog(true);
                          }}
                        >
                          Approve
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteReturn(params.row.fullItem._id)}
                        >
                          Delete
                        </button>
                      </Box>
                    ),
                  };
                }
                return {
                  ...col,
                  align: "center",
                  headerAlign: "center",
                };
              })}
              paginationModel={{ pageSize: 10, page: 0 }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "#111c44",
                width: "100%",
                height: "100%",

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
                "& .MuiDataGrid-filler": {
                  backgroundColor: "#111c44 !important",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  color: "#ffffff !important",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  overflow: "visible",
                },

                "& .MuiDataGrid-virtualScroller": {
                  "&::-webkit-scrollbar": {
                    display: "block !important",
                    width: "8px !important",
                    height: "8px !important",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#0a1535 !important",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#1e90ff !important",
                    borderRadius: "4px !important",
                  },
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
                  borderBottom: "1px solid #1e2a47 !important",
                },

                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "#111c44",
                  color: "white",
                  borderTop: "1px solid #1e2a47",
                },
                "& .MuiDataGrid-menuIcon, & .MuiDataGrid-iconButtonContainer, & .MuiDataGrid-columnHeader .MuiIconButton-root": {
                  color: "white !important",
                },
                "& .MuiDataGrid-sortIcon": {
                  color: "white !important",
                },
                "& .MuiSvgIcon-root": {
                  color: "white !important",
                },
              }}
            />
          </Box>
        )}
      </Box>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="xs"
      >
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
  );
};

export default QMReturnT;
