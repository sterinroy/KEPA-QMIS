import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockItems } from "../redux/actions/stockActions";
import { Box, Typography, CircularProgress } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../App.css";

const StockItemView = () => {
  const dispatch = useDispatch();
  const { stocks, loading, error } = useSelector((state) => state.stock);

  useEffect(() => {
    dispatch(fetchStockItems());
  }, [dispatch]);

  const columns = [
    { field: "sourceType", headerName: "Source Type", minWidth: 150 },
    { field: "itemName", headerName: "Item Name", minWidth: 200 },
    { field: "itemCategory", headerName: "Category", minWidth: 150 },
    { field: "itemSubCategory", headerName: "Subcategory", minWidth: 150 },
    { field: "quantity", headerName: "Qty", minWidth: 80 },
    { field: "unit", headerName: "Unit", minWidth: 80 },
    { field: "Qmno", headerName: "QM No", minWidth: 150 },
    {
      field: "model",
      headerName: "Model",
      minWidth: 150,
      valueGetter: (params) =>
        `${params?.row?.model || ""} ${params?.row?.modelNo || ""}`.trim(),
    },
    {
      field: "invoiceDate",
      headerName: "Invoice Date",
      minWidth: 120,
      renderCell: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "-",
    },
    {
      field: "dateOfIssue",
      headerName: "Issue Date",
      minWidth: 120,
      renderCell: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "-",
    },
    {
      field: "issuedfrom",
      headerName: "Issued From",
      minWidth: 150,
    },
    {
      field: "toWhom",
      headerName: "To (Office/ Company)",
      minWidth: 200,
    },
    {
      field: "enteredBy",
      headerName: "Entered By",
      minWidth: 200,
      valueGetter: (params) =>
        params?.row?.enteredBy?.name && params?.row?.enteredBy?.pen
          ? `${params.row.enteredBy.name} (${params.row.enteredBy.pen})`
          : "-",
    },
    {
      field: "barcodeImage",
      headerName: "Barcode",
      minWidth: 120,
      renderCell: (params) =>
        params.value ? (
          <img src={params.value} alt="Barcode" style={{ width: 60 }} />
        ) : (
          "N/A"
        ),
    },
  ];

  const rows = stocks.map((item, index) => ({
    id: item._id || index,
    ...item,
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
              STOCK ITEMS
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
              slots={{ toolbar: GridToolbar }}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                backgroundColor: "#111c44",
                width: "100%",
                height: "100%",

                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#111c44 !important",
                  color: "#ffffff !important",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#111c44 !important",
                  position: "relative",
                  "&:not(:last-child)::after": {
                    content: '""',
                    position: "absolute",
                    right: 0,
                    top: "25%",
                    height: "50%",
                    width: "1px",
                    backgroundColor: "rgba(255,255,255,0.3)",
                  },
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  color: "#ffffff !important",
                  fontWeight: "900",
                  textTransform: "uppercase",
                  fontSize: "0.85rem",
                  letterSpacing: "0.5px",
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
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#050b19 !important",
                },
                "& .MuiDataGrid-cell": {
                  color: "rgba(255,255,255,0.8)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },

                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "#111c44",
                  color: "white",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  "& .MuiTablePagination-root": { color: "white" },
                  "& .MuiSvgIcon-root": { color: "white" },
                },
                "& .MuiDataGrid-toolbarContainer": {
                  backgroundColor: "#111c44",
                  padding: "12px",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  "& .MuiButton-root": {
                    color: "#1e90ff !important",
                    fontWeight: "bold",
                  },
                },
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StockItemView;
