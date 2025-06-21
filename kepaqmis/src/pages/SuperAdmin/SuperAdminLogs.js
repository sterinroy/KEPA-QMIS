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
    { field: "pen", headerName: "PEN", flex: 1 ,headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header',},
    { field: "name", headerName: "Name", flex: 1, headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header',},
    { field: "role", headerName: "Role", flex: 1, headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header',},
    { field: "action", headerName: "Action", flex: 1, headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header',},
    {
      field: "timestamp",
      headerName: "Timestamp",
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      headerClassName: 'super-app-theme--header',
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
    <div className="super-admin-approvals" style={{width: "100%" }}>
      <div className="super-admin-header">
        <h2>Login/Logout Logs</h2>
      </div>
      <div style={{ height: 550 }}>
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
          className="approval-grid"
          showToolbar
  
          sx={{
              width: "100%",
              border: "none",
              borderColor: "#060118",
              borderRadius: "11px",
              backgroundColor: "#1B254B",
              height: "100%",
              display: "flex",
              justifyContent: "center",
          }}
          />
      )}
      </div>
    </div>
  );
};

export default SuperAdminLogs;
