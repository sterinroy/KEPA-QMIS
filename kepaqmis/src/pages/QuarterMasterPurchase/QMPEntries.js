// QMIssueEntries.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQMIssueEntries } from "../../redux/actions/qmissueActions";
import { DataGrid } from "@mui/x-data-grid";
import "./QMP.css";

const QMPEntries = () => {
  const dispatch = useDispatch();
  const { loading, entries, error } = useSelector((state) => state.qmissue);

  useEffect(() => {
    dispatch(fetchQMIssueEntries());
  }, [dispatch]);

  console.log("QMIssueEntries state:", { loading, entries, error });

  const columns = [
    { field: "orderNo", headerName: "Order No", flex: 1 },
    { field: "itemName", headerName: "Item Name", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "amountType", headerName: "Amount-Type", flex: 1 },
    {
      field: "amountDetails",
      headerName: "Amount Details",
      flex: 1,
      renderCell: (params) => {
        const entry = params.row;
        if (!entry.amountDetails) return "N/A"; // Check if amountDetails is undefined

        return entry.amountType === "Cash"
          ? entry.amountDetails.cashAmount
          : entry.amountDetails.creditStatus;
      },
    },
  ];

  const rows = entries.map((entry, index) => ({
    id: entry._id || index, // Use _id if available, otherwise use index
    orderNo: entry.orderNo,
    itemName: entry.itemName,
    quantity: entry.quantity,
    status: entry.status,
    amountType: entry.amountType,
    amountDetails: entry.amountDetails,
  }));

  return (
    <div className="qm-issue-entries-container" style={{ width: "100%" }}>
      <div>
        <h2 style={{ color: "#0c1227" }}>QM PURCHASE ENTRIES</h2>
      </div>
      <div style={{ height: 600 }}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : entries.length === 0 ? (
          <p>No QMIssue entries.</p>
        ) : (
          <div className="table-wrapper" style={{ marginLeft: "-25px" }}>
            <DataGrid
              rows={rows}
              columns={columns.map((col) => ({
                ...col,
                align: "center",
                headerAlign: "center",
              }))}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              showToolbar
              disableRowSelectionOnClick
              sx={{
                "& .MuiDataGrid-cell": {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QMPEntries;
