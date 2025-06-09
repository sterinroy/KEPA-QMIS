import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingUsers,
  approveUser,
  rejectUser,
} from "../../redux/actions/superAdminActions";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar"; // Add this import
import { Box, Typography } from "@mui/material";
import './SuperAdmin.css';

const SuperAdminApprovals = () => {
  const dispatch = useDispatch();
  const { pendingUsers, loading, error } = useSelector(
    (state) => state.superAdmin
  );

  useEffect(() => {
    dispatch(fetchPendingUsers());
  }, [dispatch]);

  const handleApprove = (id, role) => {
    dispatch(approveUser(id, role));
  };

  const handleReject = (id) => {
    dispatch(rejectUser(id));
  };

  const handleRoleChange = (userId, newRole) => {
    if (newRole) {
      dispatch(approveUser(userId, newRole));
    }
  };

  const columns = [
    { 
      field: "pen", 
      headerName: "PEN", 
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
    },
    { 
      field: "name", 
      headerName: "Name", 
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
    },
    { 
      field: "phone", 
      headerName: "Phone", 
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
    },
    { 
      field: "role", 
      headerName: "Role", 
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: "assignRole",
      headerName: "Assign Role",
      flex: 1.5,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return params.row.role === "QuarterMaster" ? (
          <select
            onChange={(e) => handleRoleChange(params.row._id, e.target.value)}
            defaultValue=""
            className="role-select"
          >
            <option value="" disabled>Select role</option>
            <option value="QuarterMasterPurchase">QuarterMaster (Purchase)</option>
            <option value="QuarterMasterIssue">QuarterMaster (Issue)</option>
            <option value="QuarterMasterACQM">ACQM</option>
          </select>
        ) : (
          "N/A"
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ 
          display: "flex", 
          gap: 1, 
          justifyContent: 'center',
          alignItems: 'center', // Add this to center vertically
          width: '100%',
          height: '100%' // Add this to take full height of the cell
        }}>
          <button 
            className="action-button approve-button"
            onClick={() => handleApprove(params.row._id, params.row.role)}
          >
            Approve
          </button>
          <button 
            className="action-button reject-buttaon"
            onClick={() => handleReject(params.row._id)}
          >
            Reject
          </button>
        </Box>
      ),
    },
  ];

  const rows = pendingUsers.map((user) => ({
    id: user._id,
    ...user,
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar /> {/* Add Topbar component here */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: "90px", // Add margin-top to account for Topbar height
            ml: "260px",
          }}
        >
          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: 2,
              alignItems: 'center',  // Center horizontally
              justifyContent: 'center', // Center vertically
              mb: 4  // Add margin bottom for spacing
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ 
                fontFamily: 'DM Sans, sans-serif', 
                color: '#ccc',
                textAlign: 'center' // Center the text itself
              }}
            >
              Pending Approvals
            </Typography>
          </Box>

          <Box sx={{ height: 600, width: "100%" }}>
            {loading ? (
              <Typography>Loading...</Typography>
            ) : error ? (
              <Typography color="error">Error: {error}</Typography>
            ) : rows.length === 0 ? (
              <Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ fontFamily: 'DM Sans, sans-serif', color: '#7551FF',textAlign: 'center'}}
              >
                No pending approvals.
              </Typography>
              </Typography>
            ) : (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                disableRowSelectionOnClick
                className="approval-grid"
                sx={{
                  borderRadius: 2,
                  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SuperAdminApprovals;