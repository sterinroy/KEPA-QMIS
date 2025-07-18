import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import "./Issue.css";

const QMIReturnP = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const [technicalReportRequired, setTechnicalReportRequired] = useState(false);
  const [technicalWing, setTechnicalWing] = useState("");
  const [technicalReportNo, setTechnicalReportNo] = useState("");
  const [returnCategory, setReturnCategory] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const pen=localStorage.getItem("pen");
  const name=localStorage.getItem("name");
  console.log("pen", pen);
  console.log("name", name);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const res = await fetch("/api/userRoute/returns/pending-verification");
        const data = await res.json();
        setReturns(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching returns:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReturns();
  }, []);

  const handleOpenDialog = (row) => {
    setSelected(row);
    setTechnicalReportRequired(false);
    setTechnicalWing("");
    setTechnicalReportNo("");
    setReturnCategory("");
    setOpenDialog(true);
  };

  const handleSubmitVerification = async () => {
    if (!technicalReportRequired && !returnCategory) {
      return setSnackbar({
        open: true,
        message: "Select return category",
        severity: "warning",
      });
    }

    if (technicalReportRequired && (!technicalWing || !technicalReportNo)) {
      return setSnackbar({
        open: true,
        message: "Enter technical report details",
        severity: "warning",
      });
    }

    try {
      const res = await fetch(
        `/api/userRoute/qm/verify-return/${selected._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            processedBy: { pen: pen, name: name },
            technicalReportRequired,
            technicalWing: technicalReportRequired ? technicalWing : undefined,
            technicalReportNo: technicalReportRequired
              ? technicalReportNo
              : undefined,
            returnCategory: technicalReportRequired
              ? undefined
              : returnCategory,
          }),
        }
      );

      if (!res.ok) throw new Error("Verification failed");

      setSnackbar({
        open: true,
        message: "Return verified",
        severity: "success",
      });
      setOpenDialog(false);
      setReturns((prev) => prev.filter((r) => r._id !== selected._id));
    } catch (err) {
      console.error("Verification error:", err);
      setSnackbar({
        open: true,
        message: "Verification failed",
        severity: "error",
      });
    }
  };

  const columns = [
    {
      field: "itemName",
      headerName: "Item Name",
      flex: 1,
      renderCell: (params) => (
        <span>{params.row?.item?.itemName || "N/A"}</span>
      ),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      renderCell: (params) => <span>{params.row?.quantity ?? "N/A"}</span>,
    },
    {
      field: "returnedOn",
      headerName: "Returned On",
      flex: 1,
      renderCell: (params) => {
        const date = params.row?.returnDate;
        return (
          <span>{date ? new Date(date).toLocaleDateString() : "N/A"}</span>
        );
      },
    },
    {
      field: "verify",
      headerName: "Verify",
      flex: 1,
      renderCell: (params) => (
        <Button
          className="permanent-verify-button"
          variant="outlined"
          onClick={() => handleOpenDialog(params.row)}
        >
          Verify
        </Button>
      ),
    },
  ];

  return (
    <Box p={3}>
      <h2>Permanent Returns Pending Verification</h2>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <div className="permanent-return-table">
          <DataGrid
            rows={returns.map((r) => ({ ...r, id: r._id }))}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10]}
            disableRowSelectionOnClick
            autoHeight
            style={{ height: 500, width: "100%" }}
            sx={{
              "& .MuiDataGrid-cell": {
                display: "flex",
                justifyContent: "center", // Horizontal center
                alignItems: "center", // Vertical center
              },
            }}
          />
        </div>
      )}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Verify Return</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Switch
                checked={technicalReportRequired}
                onChange={(e) => setTechnicalReportRequired(e.target.checked)}
              />
            }
            label="Technical Report Required?"
          />

          {technicalReportRequired && (
            <>
              <TextField
                label="Technical Wing"
                value={technicalWing}
                onChange={(e) => setTechnicalWing(e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Technical Report Number"
                value={technicalReportNo}
                onChange={(e) => setTechnicalReportNo(e.target.value)}
                fullWidth
                margin="dense"
              />
            </>
          )}

          <FormControl fullWidth margin="dense">
            <InputLabel>Return Category</InputLabel>
            <Select
              value={returnCategory}
              onChange={(e) => setReturnCategory(e.target.value)}
              label="Return Category"
            >
              <MenuItem value="Reusable">Reusable</MenuItem>
              <MenuItem value="Repairable">Repairable</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitVerification}>
            Submit
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

export default QMIReturnP;
