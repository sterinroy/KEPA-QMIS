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
  Typography,
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

  const pen = localStorage.getItem("pen");
  const name = localStorage.getItem("name");
  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const res = await fetch("/api/userRoute/returns/pending-verification");
        const data = await res.json();
        setReturns(data.data);
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

  const rows = returns.map((item, index) => ({
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
    { field: "requestedQty", headerName: "Qty", minWidth: 100 },
    {
      field: "returnedOn",
      headerName: "Returned On",
      minWidth: 120,
      renderCell: (params) => {
        const date = params.row?.fullItem?.returnDate;
        return (
          <span>{date ? new Date(date).toLocaleDateString() : "N/A"}</span>
        );
      },
    },
    {
      field: "verify",
      headerName: "Verify",
      minWidth: 100,
      renderCell: (params) => (
        <Button
          className="permanent-verify-button"
          variant="outlined"
          onClick={() => handleOpenDialog(params.row.fullItem)}
        >
          Verify
        </Button>
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
              PERMANENT RETURN APPROVALS (QM)
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
                if (col.field === "verify") {
                  return {
                    ...col,
                    align: "center",
                    headerAlign: "center",
                    renderCell: (params) => (
                      <button
                        className="approve-button"
                        onClick={() => handleOpenDialog(params.row.fullItem)}
                      >
                        Verify
                      </button>
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
