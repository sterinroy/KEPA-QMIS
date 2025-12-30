import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/actions/superAdminActions";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import { register } from "../../redux/actions/authActions";
import { DataGrid } from "@mui/x-data-grid";
import "./SuperAdmin.css";
import "../QuarterMasterIssue/Issue.css";

const SuperAdminUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.superAdmin);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    pen: "",
    name: "",
    phone: "",
    password: "",
    role: "User",
  });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    setUserToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await dispatch(deleteUser(userToDelete));
      await dispatch(fetchUsers());
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
    }
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => {
    setOpen(false);
    setNewUser({
      pen: "",
      name: "",
      phone: "",
      password: "",
      role: "User",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      newUser.pen &&
      newUser.name &&
      newUser.phone &&
      newUser.password &&
      newUser.role
    ) {
      try {
        await dispatch(
          register(
            newUser.pen,
            newUser.name,
            newUser.phone,
            newUser.password,
            newUser.role
          )
        );
        handleCloseDialog();
      } catch (err) {
        alert("Failed to add user: " + err.message);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  const columns = [
    { field: "pen", headerName: "PEN", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 1,
      sortable: false,
      filterable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <button
          className="delete-button"
          onClick={() => handleDeleteClick(params.row.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    ...user,
  }));

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 64px)",
        pl: { xs: 2, md: 5, lg: 5 },
        pr: { xs: 2, md: 4, lg: 4 },
        pt: { xs: 2, md: 4, lg: 4 },
        pb: { xs: 2, md: 4, lg: 4 }, // Reduced for static layout
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
          .qmi-manage-request-container ::-webkit-scrollbar,
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
          .MuiDataGrid-filler,
          [class*="MuiDataGrid-columnHeader--filler"],
          [class*="MuiDataGrid-scrollbarFiller"] {
            display: none !important;
            visibility: hidden !important;
            width: 0 !important;
            min-width: 0 !important;
          }
        `}
      </style>
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
              MANAGE SYSTEM USERS
            </Typography>
            <Button
              variant="contained"
              onClick={handleOpenDialog}
              sx={{
                bgcolor: "#7551ff",
                fontWeight: "bold",
                borderRadius: "10px",
                px: 3,
                mr: 7.8,
                "&:hover": { bgcolor: "#5d3fd3" }
              }}
            >
              Add New User
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
            height: "600px", // Fixed height for 8 rows + header + footer
            overflowX: "auto",
            scrollbarWidth: "auto",
            msOverflowStyle: "auto",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns.map((col) => ({
              ...col,
              headerAlign: "center",
              align: "center",
            }))}
            loading={loading}
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
        </Box>
      </Box>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
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
          Registration Portal
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="PEN Number"
              name="pen"
              value={newUser.pen}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "#7551ff" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)" },
              }}
            />
            <TextField
              label="Full Name"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "#7551ff" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)" },
              }}
            />
            <TextField
              label="Contact Number"
              name="phone"
              value={newUser.phone}
              onChange={handleChange}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "#7551ff" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)" },
              }}
            />
            <TextField
              label="Security Key (Password)"
              name="password"
              type="password"
              value={newUser.password}
              onChange={handleChange}
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "#7551ff" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.6)" },
              }}
            />
            <FormControl fullWidth>
              <InputLabel sx={{ color: "rgba(255,255,255,0.6)" }}>System Role</InputLabel>
              <Select
                name="role"
                value={newUser.role}
                onChange={handleChange}
                label="System Role"
                required
                sx={{
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#7551ff" },
                  ".MuiSvgIcon-root": { color: "white" },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#111c44",
                      color: "white",
                      "& .MuiMenuItem-root:hover": { bgcolor: "#1e2a47" }
                    }
                  }
                }}
              >
                <MenuItem value="User">Standard User</MenuItem>
                <MenuItem value="QuarterMaster">Quarter Master</MenuItem>
                <MenuItem value="Admin">Super Administrator</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} sx={{ color: "rgba(255,255,255,0.6)", fontWeight: "bold" }}>
            Discard
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              bgcolor: "#7551ff",
              fontWeight: "bold",
              px: 4,
              borderRadius: "10px",
              "&:hover": { bgcolor: "#5d3fd3" }
            }}
          >
            Authorize User
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
            Are you sure you want to delete this user? This action cannot be undone.
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
    </Box>
  );
};

export default SuperAdminUsers;
