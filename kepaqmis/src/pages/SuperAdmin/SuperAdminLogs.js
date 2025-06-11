import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs } from "../../redux/actions/superAdminActions";
import { DataGrid } from "@mui/x-data-grid";
import "./SuperAdmin.css";

const SuperAdminLogs = () => {
  const dispatch = useDispatch();
  const { logs, loading, error } = useSelector((state) => state.superAdmin);

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  const columns = [
    { field: "pen", headerName: "PEN", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "action", headerName: "Action", flex: 1 },
    {
      field: "timestamp",
      headerName: "Timestamp",
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toString() === "Invalid Date"
          ? "N/A"
          : date.toLocaleString();
      },
    }
  ];

  // Convert logs to rows with an `id` field
  const rows = logs
  .filter((log) => log && log.timestamp) // skip broken entries
  .map((log, index) => ({
    id: log._id || index,
    ...log,
  }));

  return (
    <div  style={{ height: 600, width: "100%" }}>
      <h2>Login/Logout Logs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : rows.length === 0 ? (
        <p>No logs available.</p>
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

export default SuperAdminLogs;
