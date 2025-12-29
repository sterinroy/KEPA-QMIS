// QMIssueEntries.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQMIssueEntries } from "../../redux/actions/qmissueActions";
import { Box, Typography, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const QMIEntries = () => {
  const dispatch = useDispatch();
  const { loading, entries, error } = useSelector((state) => state.qmissue);

  useEffect(() => {
    dispatch(fetchQMIssueEntries());
  }, [dispatch]);

  console.log("QMIssueEntries state:", { loading, entries, error });

  const columns = [
    { field: "orderNo", headerName: "Order No", minWidth: 150 },
    { field: "supplyOrderNo", headerName: "Supply Order No", minWidth: 150 },
    { field: "itemCategory", headerName: "Item Category", minWidth: 150 },
    { field: "itemSubCategory", headerName: "Item Sub Category", minWidth: 150 },
    { field: "status", headerName: "Status", minWidth: 120 },
    { field: "amountType", headerName: "Amount-Type", minWidth: 120 },
    {
      field: "amountDetails",
      headerName: "Amount Details",
      minWidth: 150,
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
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 64px)",
        pl: { xs: 2, md: 5, lg: 5 },
        pr: { xs: 2, md: 5, lg: 5 },
        pt: { xs: 2, md: 4, lg: 4 },
        pb: { xs: 2, md: 4, lg: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        overflow: "hidden",
        backgroundColor: "#0c1227",
      }}
    >
      <Box
        className="qmi-manage-request-container"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "100%", maxWidth: "1200px", display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              color="#ffffff"
              mt={0.9}
              sx={{ textAlign: "center" }}
            >
              QMISSUSE ENTRIES
            </Typography>
          </Box>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" width="100%" mt={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box display="flex" justifyContent="center" width="100%" mt={4}>
            <Typography color="error">Error: {error}</Typography>
          </Box>
        ) : (
          <Box className="outer-container" sx={{ width: "100%", maxWidth: "1200px !important", height: "650px", overflow: "hidden" }}>
            <DataGrid
              rows={rows}
              columns={columns.map((col) => ({
                ...col,
                align: "center",
                headerAlign: "center",
              }))}
              paginationModel={{ pageSize: 10, page: 0 }}
              pageSizeOptions={[10, 25, 50]}
              disableRowSelectionOnClick
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "#111c44",
                width: "100%",
                height: "100%",

                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#111c44 !important",
                  color: "#ffffff !important",
                },
                "& .MuiDataGrid-columnHeadersInner": {
                  backgroundColor: "#111c44 !important",
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#111c44 !important",
                },
                "& .MuiDataGrid-filler": {
                  backgroundColor: "#111c44 !important",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  color: "#ffffff !important",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  overflow: "visible",
                },

                "& .MuiDataGrid-virtualScroller": {
                  "&::-webkit-scrollbar": {
                    display: "block !important",
                    width: "8px !important",
                    height: "8px !important",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#0a1535 !important",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#1e90ff !important",
                    borderRadius: "4px !important",
                  },
                },

                "& .MuiDataGrid-row": {
                  backgroundColor: "#0a1535",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#050b19 !important",
                },
                "& .MuiDataGrid-cell": {
                  color: "#ffffff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottom: "1px solid #1e2a47 !important",
                },

                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "#111c44",
                  color: "white",
                  borderTop: "1px solid #1e2a47",
                },
                "& .MuiDataGrid-menuIcon, & .MuiDataGrid-iconButtonContainer, & .MuiDataGrid-columnHeader .MuiIconButton-root": {
                  color: "white !important",
                },
                "& .MuiDataGrid-sortIcon": {
                  color: "white !important",
                },
                "& .MuiSvgIcon-root": {
                  color: "white !important",
                },
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default QMIEntries;
