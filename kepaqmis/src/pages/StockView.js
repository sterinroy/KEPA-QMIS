import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockItems } from "../redux/actions/stockActions";
import { DataGrid } from "@mui/x-data-grid";
import "../App.css";

const StockItemView = () => {
  const dispatch = useDispatch();
  const { stocks, loading, error } = useSelector((state) => state.stock);

  useEffect(() => {
    dispatch(fetchStockItems());
  }, [dispatch]);

  const columns = [
    { field: "sourceType", headerName: "Source Type", flex: 1 },
    { field: "itemName", headerName: "Item Name", flex: 1 },
    { field: "itemCategory", headerName: "Category", flex: 1 },
    { field: "itemSubCategory", headerName: "Subcategory", flex: 1 },
    { field: "quantity", headerName: "Qty", flex: 0.5 },
    { field: "unit", headerName: "Unit", flex: 0.5 },
    { field: "Qmno", headerName: "QM No", flex: 1 },
    // {
    //   field: "model",
    //   headerName: "Model",
    //   flex: 1,
    //   valueGetter: (params) =>
    //     `${params?.row?.model || ""} ${params?.row?.modelNo || ""}`.trim(),
    // },
    // {
    //   field: "invoiceDate",
    //   headerName: "Invoice Date",
    //   flex: 1,
    //   renderCell: (params) =>
    //     params.value ? new Date(params.value).toLocaleDateString() : "-",
    // },
    // {
    //   field: "dateOfIssue",
    //   headerName: "Issue Date",
    //   flex: 1,
    //   renderCell: (params) =>
    //     params.value ? new Date(params.value).toLocaleDateString() : "-",
    // },
    // {
    //   field: "issuedfrom",
    //   headerName: "Issued From",
    //   flex: 1,
    // },
    // {
    //   field: "toWhom",
    //   headerName: "To (Office/ Company)",
    //   flex: 1,
    // },
    // {
    //   field: "enteredBy",
    //   headerName: "Entered By",
    //   flex: 1,
    //   valueGetter: (params) =>
    //     params?.row?.enteredBy?.name && params?.row?.enteredBy?.pen
    //       ? `${params.row.enteredBy.name} (${params.row.enteredBy.pen})`
    //       : "-",
    // },
    // {
    //   field: "barcodeImage",
    //   headerName: "Barcode",
    //   flex: 1,
    //   renderCell: (params) =>
    //     params.value ? (
    //       <img src={params.value} alt="Barcode" style={{ width: 60 }} />
    //     ) : (
    //       "N/A"
    //     ),
    // },
  ];

  const rows = stocks.map((item, index) => ({
    id: item._id || index,
    ...item,
  }));

  return (
    <div style={{ width: "100%", marginTop: "-15px" }}>
      <div>
        <h2>STOCK ITEMS</h2>
      </div>
      <div style={{ height: 600 }}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : rows.length === 0 ? (
          <p>No stock items available.</p>
        ) : (
          <div
            className="stock-items"
            style={{ marginLeft: "-20px", marginRight: "78px" }}
          >
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

export default StockItemView;
