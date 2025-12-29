import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../redux/actions/categoryActions";
import "./SuperAdmin.css";
import "../QuarterMasterIssue/Issue.css";

const SACategories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const resetForm = () => {
    setCategoryName("");
    setSubcategory("");
    setEditMode(false);
    setSelectedCategory(null);
  };

  const handleAddOrUpdate = async () => {
    if (!categoryName.trim()) return;
    try {
      if (editMode && selectedCategory) {
        await dispatch(
          updateCategory(
            selectedCategory.name,
            categoryName.trim(),
            subcategory.trim()
          )
        );
        setSnackbar({
          open: true,
          message: "Updated successfully",
          severity: "success",
        });
      } else {
        await dispatch(addCategory(categoryName.trim(), subcategory.trim()));
        setSnackbar({
          open: true,
          message: "Category added",
          severity: "success",
        });
      }
    } catch {
      setSnackbar({
        open: true,
        message: "Operation failed",
        severity: "error",
      });
    } finally {
      resetForm();
      setOpenDialog(false);
    }
  };

  const handleEditClick = (row) => {
    setEditMode(true);
    setSelectedCategory(row);
    setCategoryName(row.name);
    setSubcategory(""); // Optional: user can add new subcategory
    setOpenDialog(true);
  };

  const handleDeleteClick = async (row) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete category "${row.name}"?`
    );
    if (!confirmed) return;

    try {
      await dispatch(deleteCategory(row.name));
      setSnackbar({
        open: true,
        message: "Deleted successfully",
        severity: "info",
      });
    } catch {
      setSnackbar({ open: true, message: "Delete failed", severity: "error" });
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Category", flex: 1 },
    {
      field: "subcategories",
      headerName: "Subcategories",
      flex: 2,
      renderCell: (params) =>
        params.value?.length > 0 ? params.value.join(", ") : "—",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      headerAlign: "center",
      align: "center",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon sx={{ color: "#4DB6AC" }} />}
          label="Edit"
          onClick={() => handleEditClick(params.row)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon sx={{ color: "#ff5252" }} />}
          label="Delete"
          onClick={() => handleDeleteClick(params.row)}
        />,
      ],
    },
  ];

  const rows = categories.map((cat, index) => ({
    id: index + 1,
    name: cat.name,
    subcategories: cat.subcategories || [],
  }));

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
            ITEM CATEGORIES MANAGEMENT
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
            sx={{
              bgcolor: "#4DB6AC",
              fontWeight: "bold",
              borderRadius: "10px",
              px: 3,
              "&:hover": { bgcolor: "#388e3c" }
            }}
          >
            Add New Category
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
          {editMode ? "Modify Category" : "Define Category"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Major Category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "#4DB6AC" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)" },
              }}
            />
            <TextField
              label="Associated Subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              fullWidth
              helperText="Optional entry for new sub-classification"
              FormHelperTextProps={{ sx: { color: "rgba(255,255,255,0.4)" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "#4DB6AC" },
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
            onClick={handleAddOrUpdate}
            sx={{
              bgcolor: "#4DB6AC",
              fontWeight: "bold",
              px: 4,
              borderRadius: "10px",
              "&:hover": { bgcolor: "#388e3c" }
            }}
          >
            {editMode ? "Confirm Update" : "Save Category"}
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

export default SACategories;
