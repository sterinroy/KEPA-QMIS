import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingUsers,
  approveUser,
  rejectUser,
  fetchUsers,
} from "../../redux/actions/superAdminActions";
import "./SuperAdmin.css";
import { DataGrid } from "@mui/x-data-grid";

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
      renderCell: (params) => {
        if (params.row.role === "QuarterMaster") {
          return (
            <select
              value={selectedRoles[params.id] || ""}
              onChange={(e) => handleRoleChange(params.id, e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="QuarterMasterPurchase">QuarterMaster (Purchase)</option>
              <option value="QuarterMasterIssue">QuarterMaster (Issue)</option>
              <option value="QuarterMasterACQM">ACQM</option>
            </select>
          );
        }
        return params.row.role;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <button
            onClick={() => handleApprove(params.id, params.row.role)}
            style={{ marginRight: 10 }}
          >
            Approve
          </button>
          <button onClick={() => handleReject(params.id)}>Reject</button>
        </>
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
    <div style={{ height: 600, width: "100%" }}>
      <h2>Pending Approvals</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : pendingUsers.length === 0 ? (
        <p>No pending users.</p>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          autoHeight
          rowsPerPageOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          />
      )}
    </div>
  );
};

export default SuperAdminApprovals;
