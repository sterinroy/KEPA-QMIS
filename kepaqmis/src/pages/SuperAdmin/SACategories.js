import React, { useEffect, useState } from "react";
import "./QMA.css";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
} from "@mui/x-data-grid";
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

const SACategories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

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
        await dispatch(updateCategory(selectedCategory.name, categoryName.trim(), subcategory.trim()));
        setSnackbar({ open: true, message: "Updated successfully", severity: "success" });
      } else {
        await dispatch(addCategory(categoryName.trim(), subcategory.trim()));
        setSnackbar({ open: true, message: "Category added", severity: "success" });
      }
    } catch {
      setSnackbar({ open: true, message: "Operation failed", severity: "error" });
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
    const confirmed = window.confirm(`Are you sure you want to delete category "${row.name}"?`);
    if (!confirmed) return;

    try {
      await dispatch(deleteCategory(row.name));
      setSnackbar({ open: true, message: "Deleted successfully", severity: "info" });
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
        params.value?.length > 0 ? params.value.join(", ") : "—"
    },
    {
      field: "actions",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEditClick(params.row)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
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
    <div className="p-4" style={{ width: "100%", backgroundColor: "#0C1227", zIndex: 1 }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Item Categories</h2>
        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          Add Category
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
          />
        )}
      </div>

      <Dialog open={openDialog} onClose={() => { setOpenDialog(false); resetForm(); }} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? "Edit Category" : "Add New Category"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            fullWidth
            required
            margin="dense"
          />
          <TextField
            label="Subcategory (Optional)"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenDialog(false); resetForm(); }}>Cancel</Button>
          <Button variant="contained" onClick={handleAddOrUpdate}>
            {editMode ? "Update" : "Add"}
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
    </div>
  );
};

export default SACategories;