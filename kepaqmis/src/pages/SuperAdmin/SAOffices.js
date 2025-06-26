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
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOffices,
  addOffice,
  deleteOffice,
} from "../../redux/actions/officeActions";
import "./SuperAdmin.css"

const SAOffices = () => {
  const dispatch = useDispatch();
  const { offices, loading, error } = useSelector((state) => state.office);

  const [openDialog, setOpenDialog] = useState(false);
  const [officeName, setOfficeName] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

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
    const confirmed = window.confirm(`Are you sure you want to delete office "${name}"?`);
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
    { field: "name", headerName: "Office Name", flex: 1 },
    {
      field: "actions",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteClick(params.row.name)}
        />,
      ],
    },
  ];

  return (
    <Box className="p-4" sx={{ width: "100%", zIndex: 1 }}>
      <div className="flex justify-between items-center mb-4">
        <h2 >Offices/Companies</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add Office
        </Button>
      </div>

      <div style={{ height: 600, width: "100%" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSize={10}
            rowsPerPageOptions={[5, 10]}
            disableRowSelectionOnClick
            showToolbar
          />
        )}
      </div>

      <Dialog open={openDialog} onClose={() => { setOpenDialog(false); resetForm(); }} fullWidth maxWidth="sm">
        <DialogTitle>Add New Office</DialogTitle>
        <DialogContent>
          <TextField
            label="Office Name"
            value={officeName}
            onChange={(e) => setOfficeName(e.target.value)}
            fullWidth
            required
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenDialog(false); resetForm(); }}>Cancel</Button>
          <Button variant="contained" onClick={handleAddOffice}>
            Add
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
