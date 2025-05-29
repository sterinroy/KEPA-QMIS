import React, { useEffect, useState } from 'react';
import './SuperAdmin.css';

const SuperAdminLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/superadmin/logs")
      .then(res => res.json())
      .then(data => setLogs(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Login/Logout Logs</h2>
      {logs.length === 0 ? (
        <p>No logs available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>PEN</th>
              <th>Name</th>
              <th>Role</th>
              <th>Action</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{log.pen}</td>
                <td>{log.name}</td>
                <td>{log.role}</td>
                <td>{log.action}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SuperAdminLogs;
