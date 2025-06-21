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
import { DataGrid} from "@mui/x-data-grid";

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
  { field: 'pen', headerName: 'PEN', flex: 1, headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'name', headerName: 'Name', flex: 1, headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'phone', headerName: 'Phone', flex: 1, headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'role', headerName: 'Role', flex: 1, headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header' },
  { 
    field: 'status', 
    headerName: 'Status', 
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'delete',
    headerName: 'Delete',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'super-app-theme--header',
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <button onClick={() => handleDelete(params.row._id)} style={{ color: "#fff", backgroundColor: "#FF5733", padding: "5px 10px", borderRadius: "5px" }}>
        Delete
      </button>
    ),
  },
];

const rows = users.map(user => ({
  id: user._id,    
  ...user
}));
// check point 2 

  return (
    <div className="super-admin-user" style={{ width: "100%" }}>
      <div className="super-admin-header-manage-user">
        <h2>Manage Users</h2>
      </div>
      {/* <h2>Manage Users</h2> */}
      <div className="super-admin-add-user-button" >
        <Button
          onClick={handleOpenDialog}
          sx={{
            color: "#fff",
            width: "100%",
            backgroundColor: "#111C44",
            boxShadow: "0 8px 32px 0 rgba(54, 54, 54, 0.3) !important",
            "&:hover": {
              backgroundColor: "#f9f9f9",
              color: "#000",
            },
            "&:active": {
              backgroundColor: "#ffffff",
              color: "#000",
            }
          }}
        >
          Add User
        </Button>

        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Add a New User</DialogTitle>
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
      </div>
      {/* <div className="super-admin-add-user"></div> */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : users.length === 0 ? (
          <p>No users available.</p>
        ) : (
          <DataGrid
          // need to minimize to global class
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            showToolbar
            sx={{
                width: "100%",
                border: "none",
                borderColor: "#060118",
                borderRadius: "11px",
                backgroundColor: "#1B254B",
                height: "500px",
            }}
            />
        )}
      
      </div>

  );
};

export default SuperAdminUsers;