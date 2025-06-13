import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/actions/superAdminActions";
import "./SuperAdmin.css";
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
} from "@mui/material";
import { register } from "../../redux/actions/authActions";
import { DataGrid } from "@mui/x-data-grid";

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

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    dispatch(fetchUsers());
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
      // console.log("hiii");
      await dispatch(register(newUser.pen, newUser.name, newUser.phone, newUser.password, newUser.role));
      handleCloseDialog();
    } catch (err) {
      alert("Failed to add user: " + err.message);
    }
  } else {
    alert("Please fill in all fields.");
  }
};

const columns = [
  { field: 'pen', headerName: 'PEN', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'phone', headerName: 'Phone', flex: 1 },
  { field: 'role', headerName: 'Role', flex: 1 },
  { 
    field: 'status', 
    headerName: 'Status', 
    flex: 1,
    // Optional: if you want to show text or badges based on status
  },
  {
    field: 'delete',
    headerName: 'Delete',
    flex: 1,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <button onClick={() => handleDelete(params.row._id)}>
        Delete
      </button>
    ),
  },
];

const rows = users.map(user => ({
  id: user._id,    // DataGrid needs a unique id field
  ...user
}));




  return (
    <div style={{ height: 600, width: "100%" }}>
      <h2>Manage Users</h2>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add User
      </Button>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="PEN"
            name="pen"
            value={newUser.pen}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Name"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            value={newUser.phone}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Password"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleChange}
            fullWidth
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={newUser.role}
              onChange={handleChange}
              required
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="QuarterMaster">QuarterMaster</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          />
      )}
    </div>
  );
};

export default SuperAdminUsers;
