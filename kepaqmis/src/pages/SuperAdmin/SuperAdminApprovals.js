import React, { useEffect, useState } from 'react';
import './SuperAdmin.css';

const SuperAdminApprovals = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/superadmin/pending-registrations")
      .then(res => res.json())
      .then(data => setPendingUsers(data))
      .catch(err => console.error(err));
  }, []);

  const handleAction = async (id, action) => {
    try {
      const method = action === 'approve' ? 'PATCH' : 'DELETE';
      await fetch(`http://localhost:3000/api/superadmin/${action}/${id}`, { method });
      setPendingUsers(pendingUsers.filter(user => user._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Pending Approvals</h2>
      {pendingUsers.length === 0 ? (
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
            {pendingUsers.map(user => (
              <tr key={user._id}>
                <td>{user.pen}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleAction(user._id, "approve")}>Approve</button>
                  <button onClick={() => handleAction(user._id, "reject")}>Reject</button>
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
