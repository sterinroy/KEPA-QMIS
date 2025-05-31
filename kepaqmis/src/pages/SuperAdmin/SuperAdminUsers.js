import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/actions/superAdminActions";
import "./SuperAdmin.css";

const SuperAdminUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.superAdmin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="container">
      <h2>Manage Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>PEN</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.pen}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SuperAdminUsers;
