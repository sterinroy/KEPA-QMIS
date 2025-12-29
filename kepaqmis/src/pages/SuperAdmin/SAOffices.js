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
  Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOffices,
  addOffice,
  deleteOffice,
} from "../../redux/actions/officeActions";
import "./SuperAdmin.css";
import "../QuarterMasterIssue/Issue.css";

const SAOffices = () => {
  const dispatch = useDispatch();
  const { offices, loading, error } = useSelector((state) => state.office);

  const [openDialog, setOpenDialog] = useState(false);
  const [officeName, setOfficeName] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    dispatch(fetchOffices());
  }, [dispatch]);

  const resetForm = () => {
    setOfficeName("");
  };

  const handleAddOffice = async () => {
    if (!officeName.trim()) return;
    try {
      await dispatch(addOffice(officeName.trim()));
      setSnackbar({ open: true, message: "Office added", severity: "success" });
      setOpenDialog(false);
      resetForm();
    } catch {
      setSnackbar({ open: true, message: "Add failed", severity: "error" });
    }
  };

  const handleDeleteClick = async (name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete office "${name}"?`
    );
    if (!confirmed) return;

    try {
      await dispatch(deleteOffice(name));
      setSnackbar({ open: true, message: "Office deleted", severity: "info" });
    } catch {
      setSnackbar({ open: true, message: "Delete failed", severity: "error" });
    }
  };

  const rows = offices.map((name, index) => ({
    id: index + 1,
    name,
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Office/ Comapny Name", flex: 1 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      headerAlign: "center",
      align: "center",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon sx={{ color: "#ff5252" }} />}
          label="Delete"
          onClick={() => handleDeleteClick(params.row.name)}
        />,
      ],
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#0c1227",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        pt: 4,
        pl: { xs: 2, md: 5 },
        pr: { xs: 2, md: 4 },
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 2 }}>
        <Box sx={{ width: "100%", maxWidth: "1200px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" fontWeight="bold" color="white">
            OFFICE & COMPANY DIRECTORY
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{
              bgcolor: "#ff9800",
              fontWeight: "bold",
              borderRadius: "10px",
              px: 3,
              "&:hover": { bgcolor: "#f57c00" }
            }}
          >
            Add New Entity
          </Button>
        </Box>
      </Box>

      <Box
        className="outer-container"
        sx={{
          width: "100%",
          maxWidth: "1200px !important",
          height: "650px",
          overflow: "hidden",
          backgroundColor: "#111c44",
          borderRadius: 3,
        }}
      >
        {loading ? (
          <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns.map((col) => ({
              ...col,
              headerAlign: "center",
              align: "center",
            }))}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableRowSelectionOnClick
            sx={{
              border: "none",
              backgroundColor: "#111c44",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#111c44 !important",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#111c44 !important",
                position: "relative",
                "&:not(:last-child)::after": {
                  content: '""',
                  position: "absolute",
                  right: 0,
                  top: "25%",
                  height: "50%",
                  width: "1px",
                  backgroundColor: "rgba(255,255,255,0.3)",
                },
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                color: "white",
                fontWeight: "bold",
                fontSize: "0.95rem",
                textTransform: "uppercase",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#0a1535",
                "&::-webkit-scrollbar": {
                  display: "block",
                  width: "8px",
                  height: "8px",
                },
                "&::-webkit-scrollbar-track": { background: "#0a1535" },
                "&::-webkit-scrollbar-thumb": {
                  background: "#1e90ff",
                  borderRadius: "4px",
                },
              },
              "& .MuiDataGrid-row": {
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                "&:hover": { backgroundColor: "#050b19 !important" },
              },
              "& .MuiDataGrid-cell": {
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.9rem",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#111c44",
                color: "white",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                "& .MuiTablePagination-root": { color: "white" },
                "& .MuiSvgIcon-root": { color: "white" },
              },
            }}
          />
        )}
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          resetForm();
        }}
        PaperProps={{
          sx: {
            bgcolor: "rgba(11, 16, 42, 0.95)",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            color: "white",
            minWidth: "400px",
            p: 2,
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.5rem" }}>
          New Organization Profile
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <TextField
              label="Organization/ Company Name"
              value={officeName}
              onChange={(e) => setOfficeName(e.target.value)}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "#ff9800" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)" },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => {
              setOpenDialog(false);
              resetForm();
            }}
            sx={{ color: "rgba(255,255,255,0.6)", fontWeight: "bold" }}
          >
            Discard
          </Button>
          <Button
            variant="contained"
            onClick={handleAddOffice}
            sx={{
              bgcolor: "#ff9800",
              fontWeight: "bold",
              px: 4,
              borderRadius: "10px",
              "&:hover": { bgcolor: "#f57c00" }
            }}
          >
            Authorize Entity
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SAOffices;
