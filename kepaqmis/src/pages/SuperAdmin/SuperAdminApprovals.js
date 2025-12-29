import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingUsers,
  approveUser,
  rejectUser,
  fetchUsers,
} from "../../redux/actions/superAdminActions";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, MenuItem, Select, FormControl } from "@mui/material";
import "./SuperAdmin.css";
import "../QuarterMasterIssue/Issue.css";

const SuperAdminApprovals = () => {
  const dispatch = useDispatch();
  const { pendingUsers, loading, error } = useSelector(
    (state) => state.superAdmin
  );

  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    dispatch(fetchPendingUsers());
  }, [dispatch]);

  const columns = [
    { field: "pen", headerName: "PEN", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.row.role === "QuarterMaster") {
          return (
            <FormControl size="small" sx={{ width: "100%", minWidth: 150 }}>
              <Select
                value={selectedRoles[params.id] || ""}
                onChange={(e) => handleRoleChange(params.id, e.target.value)}
                displayEmpty
                sx={{
                  color: "white",
                  bgcolor: "#0c1227",
                  ".MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1e90ff" },
                  ".MuiSvgIcon-root": { color: "white" },
                  height: 35,
                  fontSize: "0.85rem"
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
                <MenuItem value="" disabled>Select Role</MenuItem>
                <MenuItem value="QuarterMasterPurchase">QuarterMaster (Purchase)</MenuItem>
                <MenuItem value="QuarterMasterIssue">QuarterMaster (Issue)</MenuItem>
                <MenuItem value="QuarterMasterACQM">ACQM</MenuItem>
              </Select>
            </FormControl>
          );
        }
        return params.row.role;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.2,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <button
            className="approve-button"
            onClick={() => handleApprove(params.id, params.row.role)}
          >
            Approve
          </button>
          <button
            className="delete-button"
            onClick={() => handleReject(params.id)}
          >
            Reject
          </button>
        </Box>
      ),
    },
  ];

  const rows = pendingUsers.map((user, index) => ({
    id: user._id || index, // Use _id if available, otherwise use index
    pen: user.pen,
    name: user.name,
    phone: user.phone,
    role: user.role,
  }));

  const handleApprove = (id, role) => {
    if (role === "QuarterMaster") {
      if (!selectedRoles[id]) {
        alert("Please select a specific QuarterMaster role");
        return;
      }
      dispatch(approveUser(id, selectedRoles[id]));
      dispatch(fetchUsers());
    } else {
      dispatch(approveUser(id, role));
      dispatch(fetchUsers());
    }
  };

  const handleReject = (id) => {
    dispatch(rejectUser(id));
    dispatch(fetchUsers());
  };

  const handleRoleChange = (id, newRole) => {
    setSelectedRoles({ ...selectedRoles, [id]: newRole });
  };

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
              PENDING REGISTRATION APPROVALS
            </Typography>
          </Box>
        </Box>

        <Box
          className="outer-container"
          sx={{
            width: "100%",
            maxWidth: "1200px !important",
            height: "650px",
            overflow: "hidden",
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
            pageSize={10}
            rowsPerPageOptions={[10]}
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
      </Box>
    </Box>
  );
};

export default SuperAdminApprovals;
