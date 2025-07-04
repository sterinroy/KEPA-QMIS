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
    { field: "supplyOrderNo", headerName: "Supply Order No", flex: 1 },
    { field: "itemCategory", headerName: "Item Category", flex: 1 },
    { field: "itemSubCategory", headerName: "Item Sub Category", flex: 1 },
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
    supplyOrderNo: entry.supplyOrderNo,
    itemCategory: entry.itemCategory,
    itemSubCategory: entry.itemSubCategory,
    status: entry.status,
    amountType: entry.amountType,
    amountDetails: entry.amountDetails || {},
  }));

  return (
    <div className="qmi-issue-page-container">
      <div>
        <h2 style={{ color: "white" }}>QMIssue Entries</h2>
      </div>
      <div className="qmi-issue-table-section">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : entries.length === 0 ? (
          <p>No QMIssue entries.</p>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns.map((col) => ({
              ...col,
              align: "center",
              headerAlign: "center",
            }))}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            sx={{
              "& .MuiDataGrid-cell": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1976d2",
                color: "black",
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default QMIEntries;
