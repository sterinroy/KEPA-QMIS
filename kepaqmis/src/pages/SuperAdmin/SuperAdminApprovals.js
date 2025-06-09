import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingUsers,
  approveUser,
  rejectUser,
} from "../../redux/actions/superAdminActions";
import "./SuperAdmin.css";
import Topbar from "./Topbar";  // Add this import
import Sidebar from "./Sidebar"; // Add this import
import { Box } from "@mui/material"; // Add this import

const SuperAdminApprovals = () => {
  const dispatch = useDispatch();
  const { pendingUsers, loading, error } = useSelector(
    (state) => state.superAdmin
  );

  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    dispatch(fetchPendingUsers());
  }, [dispatch]);

  const handleApprove = (id, role) => {
    if (role === "QuarterMaster") {
      if (!selectedRoles[id]) {
        alert("Please select a specific QuarterMaster role");
        return;
      }
      dispatch(approveUser(id, selectedRoles[id]));
    } else {
      dispatch(approveUser(id, role));
    }
  };

  const handleReject = (id) => {
    dispatch(rejectUser(id));
  };

  const handleRoleChange = (id, newRole) => {
    setSelectedRoles({ ...selectedRoles, [id]: newRole });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: '90px', // Height of Topbar
            ml: '260px', // Width of Sidebar
          }}
        >
          <div className="container">
            <h2>Pending Approvals</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : pendingUsers.length === 0 ? (
              <p>No pending users.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>PEN</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Assign Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.pen}</td>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td>{user.role}</td>
                      <td>
                        {user.role === "QuarterMaster" ? (
                          <select
                            onChange={(e) =>
                              handleRoleChange(user._id, e.target.value)
                            }
                            defaultValue=""
                          >
                            <option value="" disabled>Select role</option>
                            <option value="QuarterMasterPurchase">QuarterMaster (Purchase)</option>
                            <option value="QuarterMasterIssue">QuarterMaster (Issue)</option>
                            <option value="QuarterMasterACQM">ACQM</option>
                          </select>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td>
                        <button onClick={() => handleApprove(user._id, user.role)}>
                          Approve
                        </button>
                        <button onClick={() => handleReject(user._id)}>
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default SuperAdminApprovals;
