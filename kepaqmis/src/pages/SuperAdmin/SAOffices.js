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
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [officeToDelete, setOfficeToDelete] = useState(null);
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

  const handleDeleteClick = (name) => {
    setOfficeToDelete(name);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!officeToDelete) return;

    try {
      await dispatch(deleteOffice(officeToDelete));
      setSnackbar({ open: true, message: "Office deleted", severity: "info" });
    } catch {
      setSnackbar({ open: true, message: "Delete failed", severity: "error" });
    } finally {
      setDeleteConfirmOpen(false);
      setOfficeToDelete(null);
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
        height: "calc(100vh - 64px)",
        pl: { xs: 2, md: 5, lg: 5 },
        pr: { xs: 2, md: 4, lg: 4 },
        pt: { xs: 2, md: 4, lg: 4 },
        pb: { xs: 2, md: 4, lg: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        overflow: "hidden",
        backgroundColor: "#0c1227",
      }}
    >
      <style>
        {`
          /* Aggressive Scrollbar Hiding (Vertical) but Showing Horizontal */
          .outer-container ::-webkit-scrollbar,
          .MuiDataGrid-root ::-webkit-scrollbar,
          ::-webkit-scrollbar {
            display: block !important;
            width: 0 !important;
            height: 8px !important;
            background: transparent !important;
          }
          ::-webkit-scrollbar-track {
            background: #0a1535 !important;
          }
          ::-webkit-scrollbar-thumb {
            background: #1e90ff !important;
            border-radius: 4px !important;
          }
          * {
            scrollbar-width: auto !important; /* Allow scrollbars in Firefox */
            -ms-overflow-style: auto !important;
          }

          /* Remove White Bar/Filler in Header */
          .MuiDataGrid-columnHeader--filler,
          .MuiDataGrid-scrollbarFiller,
          .MuiDataGrid-filler {
            display: none !important;
            visibility: hidden !important;
            width: 0 !important;
            min-width: 0 !important;
          }
        `}
      </style>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 2 }}>
        <Box sx={{ width: "100%", maxWidth: "1200px", px: 3, display: "flex", justifyContent: "flex-end", alignItems: "center", position: "relative" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{
              color: "#ffffff",
              mt: 0.9,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            OFFICE & COMPANY DIRECTORY
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{
              bgcolor: "#7551ff",
              fontWeight: "bold",
              borderRadius: "10px",
              px: 3,
              mr: 7.8,
              "&:hover": { bgcolor: "#5d3fd3" }
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
          padding: "24px",
          paddingBottom: "24px",
          boxSizing: "border-box",
          height: "600px",
          overflowX: "auto",
          scrollbarWidth: "auto",
          msOverflowStyle: "auto",
        }}
      >
        {loading ? (
          <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress sx={{ color: "#7551ff" }} />
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns.map((col) => ({
              ...col,
              headerAlign: "center",
              align: "center",
            }))}
            pageSize={8}
            rowsPerPageOptions={[8]}
            autoHeight={false}
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
                color: "#ffffff !important",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "visible",
                textTransform: "uppercase",
              },

              "& .MuiDataGrid-virtualScroller": {
                overflowX: "auto !important",
                "&::-webkit-scrollbar": {
                  display: "block !important",
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
              },

              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#111c44",
                color: "#ffffff !important",
                borderTop: "1px solid #1e2a47",
                "& .MuiTablePagination-root": {
                  color: "#ffffff !important",
                },
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                  color: "#ffffff !important",
                },
              },
              "& .MuiDataGrid-columnHeader--filler": {
                display: "none !important",
              },
              "& .MuiDataGrid-scrollbarFiller": {
                display: "none !important",
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
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.5rem", color: "white" }}>
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

      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "rgba(11, 16, 42, 0.95)",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            color: "white",
            minWidth: "350px",
            p: 2,
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography textAlign="center" sx={{ color: "rgba(255,255,255,0.7)" }}>
            Are you sure you want to delete office <strong>"{officeToDelete}"</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, justifyContent: "center", gap: 2 }}>
          <Button
            onClick={() => setDeleteConfirmOpen(false)}
            sx={{
              color: "white",
              fontWeight: "bold",
              px: 3,
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.2)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={confirmDelete}
            sx={{
              bgcolor: "#ff5252",
              fontWeight: "bold",
              px: 3,
              borderRadius: "10px",
              "&:hover": { bgcolor: "#d32f2f" }
            }}
          >
            Delete
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
