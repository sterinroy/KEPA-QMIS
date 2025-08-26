import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./User.css";

const columns = [
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    renderCell: (params) => {
      const date = new Date(params.value);
      return date.toString() === "Invalid Date"
        ? "N/A"
        : `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getFullYear()}`;
    },
  },
  { field: "item", headerName: "Item", flex: 1 },
  { field: "category", headerName: "Category", flex: 1 },
  { field: "subcategory", headerName: "Subcategory", flex: 1 },
  { field: "quantity", headerName: "Quantity", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
  {
    field: "IndentBill",
    headerName: "Indent Bill",
    flex: 1,
    renderCell: (params) => {
      if (params.row.istemporary)
        return <span style={{ color: "gray" }}>N/A</span>;
      return params.row.indentBillId ? (
        <a
          href={`/Indent?id=${params.row.indentBillId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Bill
        </a>
      ) : (
        <span style={{ color: "gray" }}>N/A</span>
      );
    },
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
          date: entry.dateOfrequest,
          item: entry.item?.itemName || "N/A",
          category: entry.item?.itemCategory || "N/A",
          subcategory: entry.item?.itemSubCategory || "N/A",
          quantity: `${entry.requestedQty} ${entry.unit || ""}`,
          status: entry.status,
          istemporary: entry.temporary,
          indentBillId: entry.indentBillId || null,
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
    <div className="manage-request-root">
      <div className="manage-request-container">
        <h2>Manage Requests</h2>
        <div style={{ height: 550 }}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : rows.length === 0 ? (
            <p style={{ color: "white" }}>No Requests available.</p>
          ) : (
            <div className="manage-request-form">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              disableRowSelectionOnClick
              showToolbar
            />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManageRequest;
