import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./User.css";

const columns = [
  { field: "date", headerName: "Date", flex: 1},
  { field: "item", headerName: "Item", flex: 1 },
  { field: "category", headerName: "Category", flex: 1 },
  { field: "subcategory", headerName: "Subcategory", flex: 1 },
  { field: "quantity", headerName: "Quantity", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
  {
    field: "IndentBill",
    headerName: "IndentBill",
    flex: 1,
    renderCell: (params) => (
      <button onClick={() => alert(`Exporting ${params.row.item}`)}>
        IndentBill
      </button>
    ),
  },
];

const UserManageRequest = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pen = localStorage.getItem("pen");

  useEffect(() => {
    const fetchIssuedItems = async () => {
      if (!pen) return;

      try {
        const response = await fetch(`/api/userRoute/my-issued-items/${pen}`);
        if (!response.ok) {
          throw new Error("Failed to fetch issued items");
        }

        const data = await response.json();

        const formattedRows = data.map((entry, index) => ({
          id: entry._id || index,
          date: entry.approvedDate
            ? new Date(entry.approvedDate).toLocaleDateString()
            : "N/A",
          item: entry.item?.itemName || "N/A",
          category: entry.item?.itemCategory || "N/A",
          subcategory: entry.item?.itemSubCategory || "N/A",
          quantity: `${entry.requestedQty} ${entry.unit || ""}`,
          status: entry.status,
        }));

        setRows(formattedRows);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchIssuedItems();
  }, [pen]);

  return (
    <div style={{ width: "100%" }}>
      <div>
        <h2>Manage Requests</h2>
      </div>
      <div style={{ height: 550 }}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : rows.length === 0 ? (
          <p>No Requests available.</p>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            showToolbar
          />
        )}
      </div>
    </div>
  );
};

export default UserManageRequest;
