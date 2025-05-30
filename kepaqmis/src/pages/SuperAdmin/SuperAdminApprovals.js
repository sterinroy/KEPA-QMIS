import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingUsers,
  approveUser,
  rejectUser,
} from "../../redux/actions/superAdminActions";
import "./SuperAdmin.css";

const SuperAdminApprovals = () => {
  const dispatch = useDispatch();
  const { pendingUsers, loading, error } = useSelector(
    (state) => state.superAdmin 
  );

  useEffect(() => {
    dispatch(fetchPendingUsers());
  }, [dispatch]);

  const handleAction = (id, action) => {
    if (action === "approve") {
      dispatch(approveUser(id));
    } else if (action === "reject") {
      dispatch(rejectUser(id));
    }
  };

  return (
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
                  <button onClick={() => handleAction(user._id, "approve")}>
                    Approve
                  </button>
                  <button onClick={() => handleAction(user._id, "reject")}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SuperAdminApprovals;
