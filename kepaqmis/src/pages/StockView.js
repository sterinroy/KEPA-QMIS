import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockItems } from "../redux/actions/stockActions";
import { DataGrid } from "@mui/x-data-grid";

const StockItemView = () => {
  const dispatch = useDispatch();
  const { stocks, loading, error } = useSelector((state) => state.stock);

  useEffect(() => {
    dispatch(fetchStockItems());
  }, [dispatch]);

  const columns = [
    { field: "itemName", headerName: "Item Name", headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header' },
    { field: "itemCategory", headerName: "Category", headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header' },
    { field: "itemSubCategory", headerName: "Subcategory", headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header' },
    { field: "quantity", headerName: "Qty", flex: 0.5,headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header' },
    { field: "unit", headerName: "Unit", flex: 0.5,headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header' },
    { field: "Qmno", headerName: "QM No", headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header' },
    {
      field: "modelInfo",
      headerName: "Model",
      headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header',
      valueGetter: (params) =>
  `${params?.row?.model || ""} ${params?.row?.modelNo || ""}`.trim()
    },
    {
      field: "invoiceDate",
      headerName: "Invoice Date",
      headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header',
      renderCell: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "-",
    },
    {
      field: "dateOfIssue",
      headerName: "Issue Date",
      headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header',
      renderCell: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "-",
    },
    {
      field: "issuedfrom",
      headerName: "Issued From",
      headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header',
    },
    {
      field: "toWhom",
      headerName: "To Whom",
      headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header',
    },
    {
      field: "enteredBy",
      headerName: "Entered By",
      headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header',
      valueGetter: (params) =>
  params?.row?.enteredBy?.name && params?.row?.enteredBy?.pen
    ? `${params.row.enteredBy.name} (${params.row.enteredBy.pen})`
    : "-",
    },
    {
      field: "barcodeImage",
      headerName: "Barcode",
      headerAlign: 'center',
      align: 'center', headerClassName: 'super-app-theme--header',
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
    <div className="super-admin-approvals" style={{ width: "100%" }}>
      <div className="super-admin-header">
        <h2>Stock Items</h2>
      </div>
      <div style={{ height: 550 }}> 
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : rows.length === 0 ? (
        <p>No stock items available.</p>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          className="approval-grid"
          showToolbar
          horizontalScroll
  
          sx={{
              width: "100%",
              // "& .MuiDataGrid-virtualScroller": {
              //     overflowX: "hidden",
              // },
              border: "none",
              borderColor: "#060118",
              borderRadius: "11px",
              backgroundColor: "#1B254B",
              height: "100%",
              overflowX: "scroll",
          }}
        />
      )}
      </div> 
    </div>
  );
};

export default StockItemView;
