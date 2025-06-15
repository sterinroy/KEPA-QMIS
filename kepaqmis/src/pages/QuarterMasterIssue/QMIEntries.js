// QMIssueEntries.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQMIssueEntries } from "../../redux/actions/qmissueActions";
import { DataGrid } from "@mui/x-data-grid";

const QMIEntries = () => {
  const dispatch = useDispatch();
  const { loading, entries, error } = useSelector((state) => state.qmissue);

  useEffect(() => {
    dispatch(fetchQMIssueEntries());
  }, [dispatch]);

  console.log("QMIssueEntries state:", { loading, entries, error });

  const columns = [
    { field: "orderNo", headerName: "Order No", flex: 1 },
    { field: "itemName", headerName: "Item Name", flex: 1 },
    { field: "qty", headerName: "Quantity", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  const rows = entries.map((entry, index) => ({
    id: entry._id || index, // Use _id if available, otherwise use index
    orderNo: entry.orderNo,
    itemName: entry.itemName,
    qty: entry.qty,
    status: entry.status,
  }));

  return (
    <div style={{ height: 600, width: "100%" }}>
      <h2>QMIssue Entries</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : entries.length === 0 ? (
        <p>No QMIssue entries.</p>
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

export default QMIEntries;
