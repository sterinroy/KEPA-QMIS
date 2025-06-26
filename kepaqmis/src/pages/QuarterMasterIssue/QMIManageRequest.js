// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchQMIssueEntries } from "../../redux/actions/qmissueActions";
// import {
//   fetchCategories,
//   addCategory,
//   addSubcategory,
// } from "../../redux/actions/categoryActions";
// import AddIcon from "@mui/icons-material/Add";
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Checkbox,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Select,
//   MenuItem,
//   InputLabel,
//   Grid,
//   IconButton,
//   Popover,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";

// const QMIManageRequest = () => {
//   const dispatch = useDispatch();
//   const { loading, entries, error } = useSelector((state) => state.qmissue);
//   const { categories } = useSelector((state) => state.category);
//   const [selectedEntry, setSelectedEntry] = useState(null);
//   const [isApproving, setIsApproving] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [anchorElSub, setAnchorElSub] = useState(null);
//   const [newCategory, setNewCategory] = useState("");
//   const [newSubcategory, setNewSubcategory] = useState("");
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const currentYear = new Date().getFullYear();
//   const currentMonth = new Date().getMonth() + 1;

//   useEffect(() => {
//     dispatch(fetchQMIssueEntries());
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     const prepareForm = async () => {
//       if (selectedEntry) {
//         const isCash = selectedEntry.amountType === "Cash";
//         const amountDetails = isCash
//           ? { cashAmount: selectedEntry.amountDetails?.cashAmount || "" }
//           : {
//               creditStatus:
//                 selectedEntry.amountDetails?.creditStatus || "Pending",
//             };

//         const res = await fetch("/api/stockRoutes/stockitems");
//         const items = await res.json();
//         const nextNumber = (items.length || 0) + 1;
//         const formattedQmno = `KEPA/${String(nextNumber).padStart(2, "0")}/${new Date().getFullYear()}`;

//         setFormData({
//           orderNo: selectedEntry.orderNo,
//           supplyOrderNo: selectedEntry.supplyOrderNo,
//           invoiceDate: selectedEntry.invoiceDate,
//           itemCategory: selectedEntry.itemCategory,
//           itemSubCategory: selectedEntry.itemSubCategory,
//           billInvoiceNo: selectedEntry.billInvoiceNo,
//           status: selectedEntry.status,
//           verifyDate: selectedEntry.verifyDate,
//           amountType: selectedEntry.amountType,
//           amountDetails,
//           warranty: "",
//           unit: "",
//           typeofFund: "",
//           make: "",
//           model: "",
//           modelNo: "",
//           perishable: false,
//           serialNumber: "",
//           verifiedBy: "",
//           Qmno: formattedQmno,
//           fromWhomPurchased: selectedEntry.fromWhomPurchased || "",
//           toWhom: selectedEntry.toWhom || "",
//           itemName: selectedEntry.itemName || "",
//           quantity: selectedEntry.quantity || 0,
//         });
//       }
//     };

//     prepareForm();
//   }, [selectedEntry]);

//   const columns = [
//     { field: "orderNo", headerName: "Order No", flex: 1 },
//     { field: "supplyOrderNo", headerName: "Supply Order No", flex: 1 },
//     { field: "invoiceDate", headerName: "Invoice Date", flex: 1 },
//     { field: "itemCategory", headerName: "Item Category", flex: 1 },
//     { field: "itemSubCategory", headerName: "Sub Category", flex: 1 },
//     { field: "status", headerName: "Status", flex: 1 },
//     { field: "verifyDate", headerName: "Verify Date", flex: 1 },
//     { field: "amountType", headerName: "Amount-Type", flex: 1 },
//     {
//       field: "amountDetails",
//       headerName: "Amount Details",
//       flex: 1,
//       renderCell: (params) => {
//         const entry = params.row;
//         if (!entry.amountDetails) return "N/A"; // Check if amountDetails is undefined

//         return entry.amountType === "Cash"
//           ? entry.amountDetails.cashAmount
//           : entry.amountDetails.creditStatus;
//       },
//     },
//     {
//       field: "actions",
//       headerName: "Action",
//       width: 90,
//       sortable: false,
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           color="warning"
//           size="small"
//           onClick={async () => {
//             const entry = params.row;

//             // 1. Fetch total number of stock items
//             const res = await fetch("/api/stockRoutes/stockitems");
//             const items = await res.json();
//             const nextNumber = (items.length || 0) + 1;

//             // 2. Format QM Number
//             const formattedQmno = `KEPA/${String(nextNumber).padStart(2, "0")}/${new Date().getFullYear()}`;

//             // 3. Prepare amount details
//             const isCash = entry.amountType === "Cash";
//             const amountDetails = isCash
//               ? { cashAmount: entry.amountDetails?.cashAmount || "" }
//               : {
//                   creditStatus: entry.amountDetails?.creditStatus || "Pending",
//                 };

//             // 4. Set entry and form data
//             setSelectedEntry(entry);
//             setFormData({
//               orderNo: entry.orderNo,
//               supplyOrderNo: entry.supplyOrderNo,
//               invoiceDate: entry.invoiceDate,
//               itemCategory: entry.itemCategory,
//               itemSubCategory: entry.itemSubCategory,
//               billInvoiceNo: entry.billInvoiceNo,
//               status: entry.status,
//               verifyDate: entry.verifyDate,
//               amountType: entry.amountType,
//               amountDetails,
//               warranty: "",
//               unit: "",
//               typeofFund: "",
//               make: "",
//               model: "",
//               modelNo: "",
//               perishable: false,
//               serialNumber: "",
//               verifiedBy: "",
//               Qmno: formattedQmno, // ✅ Set the dynamic stock number here
//               fromWhomPurchased: entry.fromWhomPurchased || "",
//               toWhom: entry.toWhom || "",
//               itemName: entry.itemName || "",
//               quantity: entry.quantity || 0,
//             });

//             // 5. Show form
//             setShowForm(true);
//           }}
//         >
//           Approve
//         </Button>
//       ),
//     },
//   ];

//   const rows = entries.map((entry, index) => ({
//     id: entry._id || index,
//     ...entry,
//     invoiceDate: entry.invoiceDate?.split("T")[0] || "N/A",
//     verifyDate: entry.verifyDate?.split("T")[0] || "N/A",
//   }));

//   const handleFormClose = () => {
//     setSelectedEntry(null);
//     setShowForm(false);
//   };
//   const handleInputChange = (e) => {
//     const { name, value, type } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? e.target.checked
//           : name === "quantity"
//             ? parseInt(value, 10) || 0
//             : value,
//     }));
//   };
//   const handleAddCategory = () => {
//     dispatch(addCategory(newCategory));
//     setFormData((prev) => ({
//       ...prev,
//       itemCategory: newCategory,
//     }));
//     setNewCategory("");
//     setAnchorEl(null);
//   };

//   const handleApproveSubmit = async () => {
//     if (!selectedEntry?.id) return;

//     setIsApproving(true);
//     try {
//       console.log("hi", selectedEntry._id);
//       const response = await fetch(
//         `/api/stockRoutes/purchase/approve/${selectedEntry._id}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             ...formData,

//             quantity: Number(formData.quantity),
//             invoiceDate: new Date(formData.invoiceDate),
//             verifyDate: new Date(formData.verifyDate),
//             verifiedBy: { pen: formData.verifiedBy || "1" },
//           }),
//         }
//       );
//       console.log("ji:", formData);

//       const result = await response.json();

//       if (response.ok) {
//         alert("Approved successfully!");
//         setShowForm(false);
//         setConfirmOpen(false);
//         dispatch(fetchQMIssueEntries());
//       } else {
//         alert(result.message || "Server error occurred.");
//       }
//     } catch (err) {
//       alert("Something went wrong: " + err.message);
//     }
//     setIsApproving(false);
//   };

//   const handleAddSubcategory = () => {
//     dispatch(addSubcategory(formData.entries[0].itemCategory, newSubcategory));
//     setFormData((prev) => ({
//       ...prev,
//       itemSubCategory: newSubcategory,
//     }));
//     setNewSubcategory("");
//     setAnchorElSub(null);
//   };
//   const handleAmountTypeChange = (e) => {
//     const { value } = e.target;
//     setFormData({
//       ...formData,
//       invoiceDate: new Date(formData.invoiceDate),
//       verifyDate: new Date(formData.verifyDate),
//       verifiedBy: { pen: formData.verifiedBy },
//       amountType: value,
//       amountDetails:
//         value === "Cash" ? { cashAmount: "" } : { creditStatus: "Pending" },
//     });
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         height: "calc(100vh - 64px)",
//         padding: 3,
//         overflowY: "auto",
//       }}
//     >
//       <Typography variant="h5" fontWeight="bold" gutterBottom color="white">
//         Manage Requests
//       </Typography>

//       {/* Scrollable Table Container */}
//       <Box sx={{ mb: 2 }}>
//         <Box sx={{ maxWidth: "100%", height: "550px" }}>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             pageSize={10}
//             rowsPerPageOptions={[10, 25, 50]}
//             disableRowSelectionOnClick
//             showToolbar
//           />
//         </Box>
//       </Box>
//       <Dialog open={showForm} onClose={handleFormClose}>
//         <DialogTitle>Approve Request</DialogTitle>
//         <DialogContent>
//           {selectedEntry && (
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//               <TextField
//                 label="Order No"
//                 name="orderNo"
//                 value={formData.orderNo}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//               <TextField
//                 label="Supply Order No"
//                 name="supplyOrderNo"
//                 value={formData.supplyOrderNo}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//               <TextField
//                 label="Invoice Date"
//                 name="invoiceDate"
//                 value={formData.invoiceDate}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//               <TextField
//                 label="Bill Invoice NO"
//                 name="billInvoiceNo"
//                 value={formData.billInvoiceNo}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//               <FormControl fullWidth>
//                 <InputLabel>Item Category</InputLabel>
//                 <Select
//                   name="itemCategory"
//                   value={formData.itemCategory}
//                   onChange={handleInputChange}
//                   label="Item Category"
//                 >
//                   {categories.map((cat) => (
//                     <MenuItem key={cat._id} value={cat.name}>
//                       {cat.name}
//                     </MenuItem>
//                   ))}
//                   <MenuItem
//                     value=""
//                     onClick={(e) => setAnchorEl(e.currentTarget)}
//                   >
//                     <em>
//                       <AddIcon fontSize="small" /> Add Category
//                     </em>
//                   </MenuItem>
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth>
//                 <InputLabel>Sub Category</InputLabel>
//                 <Select
//                   name="itemSubCategory"
//                   value={formData.itemSubCategory}
//                   onChange={handleInputChange}
//                   label="Sub Category"
//                   disabled={!formData.itemCategory}
//                 >
//                   {categories
//                     .find((c) => c.name === formData.itemCategory)
//                     ?.subcategories.map((sub) => (
//                       <MenuItem key={sub} value={sub}>
//                         {sub}
//                       </MenuItem>
//                     ))}
//                   <MenuItem
//                     value=""
//                     onClick={(e) => setAnchorElSub(e.currentTarget)}
//                   >
//                     <em>
//                       <AddIcon fontSize="small" /> Add SubCategory
//                     </em>
//                   </MenuItem>
//                 </Select>
//               </FormControl>

//               <TextField
//                 label="Verify Date"
//                 name="verifyDate"
//                 value={formData.verifyDate}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//               <FormControl>
//                 <RadioGroup
//                   row
//                   name="amountType"
//                   value={formData.amountType}
//                   onChange={() => {}}
//                 >
//                   <FormControlLabel
//                     value="Cash"
//                     control={<Radio />}
//                     label="Cash"
//                     disabled={formData.amountType === "Credit"}
//                   />
//                   <FormControlLabel
//                     value="Credit"
//                     control={<Radio />}
//                     label="Credit"
//                     disabled={formData.amountType === "Cash"}
//                   />
//                 </RadioGroup>
//               </FormControl>
//               {formData.amountType === "Cash" ? (
//                 <TextField
//                   label="Amount Details"
//                   name="amountDetails"
//                   value={formData.amountDetails?.cashAmount || ""}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       amountDetails: {
//                         cashAmount: e.target.value,
//                       },
//                     })
//                   }
//                   fullWidth
//                 />
//               ) : (
//                 <TextField
//                   select
//                   label="Amount Details"
//                   name="amountDetails"
//                   value={formData.amountDetails?.creditStatus || ""}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       amountDetails: {
//                         creditStatus: e.target.value,
//                       },
//                     })
//                   }
//                   fullWidth
//                 >
//                   <MenuItem value="Pending">Pending</MenuItem>
//                   <MenuItem value="Approved">Approved</MenuItem>
//                 </TextField>
//               )}
//               <TextField
//                 label="From Whom Purchased"
//                 name="fromWhomPurchased"
//                 value={formData.fromWhomPurchased}
//                 onChange={handleInputChange}
//                 fullWidth
//               />

//               <TextField
//                 label="To Whom"
//                 name="toWhom"
//                 value={formData.toWhom}
//                 fullWidth
//                 onChange={handleInputChange}
//               />
//               <TextField
//                 label="Item Name"
//                 name="itemName"
//                 value={formData.itemName}
//                 fullWidth
//                 onChange={handleInputChange}
//               />
//               <TextField
//                 label="Quantity"
//                 name="quantity"
//                 value={formData.quantity}
//                 fullWidth
//                 onChange={handleInputChange}
//               />
//               <TextField
//                 label="Make"
//                 name="make"
//                 value={formData.make}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//               <TextField
//                 label="Model"
//                 name="model"
//                 value={formData.model}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//               <TextField
//                 label="Model No"
//                 name="modelNo"
//                 value={formData.modelNo}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={formData.perishable}
//                     onChange={handleInputChange}
//                     name="perishable"
//                   />
//                 }
//                 label="Perishable"
//               />
//               <TextField
//                 label="Serial Number"
//                 name="serialNumber"
//                 value={formData.serialNumber}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//               <TextField
//                 label="Verified By"
//                 name="verifiedBy"
//                 value={formData.verifiedBy}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//               <TextField
//                 label="Unit"
//                 name="unit"
//                 value={formData.unit}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//               <TextField
//                 label="Warranty (months)"
//                 name="warranty"
//                 value={formData.warranty}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//               <FormControl fullWidth>
//                 <InputLabel>Type of Fund</InputLabel>
//                 <Select
//                   name="typeofFund"
//                   value={formData.typeofFund}
//                   onChange={handleInputChange}
//                   label="Type of Fund"
//                 >
//                   <MenuItem value="A">A</MenuItem>
//                   <MenuItem value="B">B</MenuItem>
//                   <MenuItem value="C">C</MenuItem>
//                 </Select>
//               </FormControl>

//               <TextField
//                 label="QM Number"
//                 name="Qmno"
//                 value={formData.Qmno}
//                 onChange={handleInputChange}
//                 fullWidth
//                 disabled
//               />
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleFormClose} color="primary">
//             Cancel
//           </Button>
//           <Button color="primary" onClick={() => setConfirmOpen(true)}>
//             Approve
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
//         <DialogTitle>Confirm Approval</DialogTitle>
//         <DialogContent>
//           <Typography>
//             Are you sure you want to approve this request?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmOpen(false)} color="primary">
//             No
//           </Button>
//           <Button onClick={handleApproveSubmit} color="primary" autoFocus>
//             Yes
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Popover
//         open={Boolean(anchorEl)}
//         anchorEl={anchorEl}
//         onClose={() => setAnchorEl(null)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//       >
//         <Box sx={{ p: 2 }}>
//           <Typography variant="subtitle1">Add New Category</Typography>
//           <TextField
//             size="small"
//             value={newCategory}
//             onChange={(e) => setNewCategory(e.target.value)}
//             placeholder="Category Name"
//             fullWidth
//             sx={{ mb: 1 }}
//           />
//           <Button variant="contained" onClick={handleAddCategory}>
//             Add
//           </Button>
//         </Box>
//       </Popover>
//       <Popover
//         open={Boolean(anchorElSub)}
//         anchorEl={anchorElSub}
//         onClose={() => setAnchorElSub(null)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//       >
//         <Box sx={{ p: 2 }}>
//           <Typography variant="subtitle1">Add New SubCategory</Typography>
//           <TextField
//             size="small"
//             value={newSubcategory}
//             onChange={(e) => setNewSubcategory(e.target.value)}
//             placeholder="SubCategory Name"
//             fullWidth
//             sx={{ mb: 1 }}
//           />
//           <Button variant="contained" onClick={handleAddSubcategory}>
//             Add
//           </Button>
//         </Box>
//       </Popover>
//     </Box>
//   );
// };

// export default QMIManageRequest;
