// File: QMIManageRequest.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQMIssueEntries, deleteIssueEntry } from "../../../redux/actions/qmissueActions";
import {
  fetchCategories,
  addCategory,
  addSubcategory,
} from "../../../redux/actions/categoryActions";
import { Box, Typography, Dialog, Popover } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ApproveDialog from "./ApproveDialog";
import AddCategoryPopover from "./AddCategoryPopover";
import "../Issue.css";

const QMIManageRequest = () => {
  const dispatch = useDispatch();
  const { loading, entries } = useSelector((state) => state.qmissue);
  const { categories } = useSelector((state) => state.category);
  const pen = localStorage.getItem("pen") || "";
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElSub, setAnchorElSub] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");

  useEffect(() => {
    dispatch(fetchQMIssueEntries());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? e.target.checked
          : name === "quantity"
            ? parseInt(value, 10) || 0
            : value,
    }));
  };

  const handleAddCategory = () => {
    dispatch(addCategory(newCategory));
    setFormData((prev) => ({ ...prev, itemCategory: newCategory }));
    setNewCategory("");
    setAnchorEl(null);
  };

  const handleAddSubcategory = () => {
    dispatch(addSubcategory(formData.itemCategory, newSubcategory));
    setFormData((prev) => ({ ...prev, itemSubCategory: newSubcategory }));
    setNewSubcategory("");
    setAnchorElSub(null);
  };

  const columns = [
    { field: "orderNo", headerName: "Order No", minWidth: 120 },
    { field: "supplyOrderNo", headerName: "Supply Order No", minWidth: 180 },
    { field: "invoiceDate", headerName: "Invoice Date", minWidth: 130 },
    { field: "itemCategory", headerName: "Item Category", minWidth: 150 },
    { field: "itemSubCategory", headerName: "Sub Category", minWidth: 150 },
    { field: "status", headerName: "Status", minWidth: 100 },
    { field: "verifyDate", headerName: "Verify Date", minWidth: 130 },
    { field: "amountType", headerName: "Amount-Type", minWidth: 130 },
    {
      field: "amountDetails",
      headerName: "Amount Details",
      minWidth: 150,
      renderCell: (params) => {
        const entry = params.row;
        if (!entry.amountDetails) return "N/A";
        return entry.amountType === "Cash"
          ? entry.amountDetails.cashAmount
          : entry.amountDetails.creditStatus;
      },
    },
    {
      field: "actions",
      headerName: "Action",
      width: 200, // Increased width for action buttons
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <button
            className="approve-button"
            onClick={async () => {
              const entry = params.row;
              const res = await fetch("/api/stockRoutes/stockitems");
              const items = await res.json();
              const nextNumber = (items.length || 0) + 1;
              const formattedQmno = `KEPA/${String(nextNumber).padStart(
                2,
                "0"
              )}/${new Date().getFullYear()}`;
              const isCash = entry.amountType === "Cash";
              const amountDetails = isCash
                ? { cashAmount: entry.amountDetails?.cashAmount || "" }
                : {
                  creditStatus: entry.amountDetails?.creditStatus || "Pending",
                };
              setSelectedEntry(entry);
              setFormData({
                ...entry,
                amountDetails,
                Qmno: formattedQmno,
                verifiedBy: { pen },
              });
              setShowForm(true);
            }}
          >
            Approve
          </button>
          <button
            className="delete-button"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this request?")) {
                dispatch(deleteIssueEntry(params.row._id));
              }
            }}
          >
            Delete
          </button>
        </Box>
      ),
    },
  ];

  const rows = entries.map((entry, index) => ({
    id: entry._id || index,
    ...entry,
    invoiceDate: entry.invoiceDate?.split("T")[0] || "N/A",
    verifyDate: entry.verifyDate?.split("T")[0] || "N/A",
  }));

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 64px)",
        pl: { xs: 2, md: 5, lg: 5 },
        pr: { xs: 2, md: 4, lg: 4 },
        pt: { xs: 2, md: 4, lg: 4 },
        pb: { xs: 2, md: 4, lg: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        overflow: "hidden", // Disable page-level scrolling
      }}
    >
      <Box
        className="qmi-manage-request-container"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          height: "100%", // Take full height
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
              MANAGE REQUESTS
            </Typography>
          </Box>
        </Box>
        <Box className="outer-container" sx={{ width: "100%", maxWidth: "1200px !important", height: "650px", overflow: "hidden" }}>
          <DataGrid
            rows={rows}
            columns={columns.map((col) => ({
              ...col,
              align: "center",
              headerAlign: "center",
            }))}
            pageSize={10}
            rowsPerPageOptions={[10]}
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
                  height: "8px !important", // Support horizontal scrolling too
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

        <ApproveDialog
          open={showForm}
          onClose={() => setShowForm(false)}
          entry={selectedEntry}
          formData={formData}
          setFormData={setFormData}
        />

        <AddCategoryPopover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onAdd={handleAddCategory}
          label="Category"
        />

        <AddCategoryPopover
          anchorEl={anchorElSub}
          open={Boolean(anchorElSub)}
          onClose={() => setAnchorElSub(null)}
          value={newSubcategory}
          onChange={(e) => setNewSubcategory(e.target.value)}
          onAdd={handleAddSubcategory}
          label="SubCategory"
        />
      </Box>
    </Box>
  );
};

export default QMIManageRequest;
