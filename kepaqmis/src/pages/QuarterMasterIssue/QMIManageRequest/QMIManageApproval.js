// File: QMIManageRequest.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQMIssueEntries } from "../../../redux/actions/qmissueActions";
import {
  fetchCategories,
  addCategory,
  addSubcategory,
} from "../../../redux/actions/categoryActions";
import { Box, Typography, Dialog, Popover } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ApproveDialog from "./ApproveDialog";
import AddCategoryPopover from "./AddCategoryPopover";

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
    { field: "orderNo", headerName: "Order No", flex: 1 },
    { field: "supplyOrderNo", headerName: "Supply Order No", flex: 1 },
    { field: "invoiceDate", headerName: "Invoice Date", flex: 1 },
    { field: "itemCategory", headerName: "Item Category", flex: 1 },
    { field: "itemSubCategory", headerName: "Sub Category", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "verifyDate", headerName: "Verify Date", flex: 1 },
    { field: "amountType", headerName: "Amount-Type", flex: 1 },
    {
      field: "amountDetails",
      headerName: "Amount Details",
      flex: 1,
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
      width: 90,
      sortable: false,
      renderCell: (params) => (
        <button
          onClick={async () => {
            const entry = params.row;
            const res = await fetch("/api/stockRoutes/stockitems");
            const items = await res.json();
            const nextNumber = (items.length || 0) + 1;
            const formattedQmno = `KEPA/${String(nextNumber).padStart(2, "0")}/${new Date().getFullYear()}`;
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
              verifiedBy: {pen},
            });
            setShowForm(true);
          }}
        >
          Approve
        </button>
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
        p: 3,
        overflowY: "auto",
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom color="white">
        Manage Requests
      </Typography>
      <Box sx={{ maxWidth: "100%", height: "550px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableRowSelectionOnClick
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
  );
};

export default QMIManageRequest;
