// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { submitQMPurchase } from "../../redux/actions/qmpurchaseActions";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Grid,
//   Alert,
//   Select,
//   MenuItem,
//   Popover,
//   IconButton,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import "./QMP.css";
// import {
//   fetchCategories,
//   addCategory,
//   addSubCategory,
// } from "../../redux/actions/categoryActions";
// import AddIcon from "@mui/icons-material/Add";

// const QMPOrder = () => {
//   const [formData, setFormData] = useState({
//     orderNo: "",
//     supplyOrderNo: "",
//     entries: [
//       {
//         itemName: "",
//         itemCategory: "",
//         itemSubCategory: "",
//         quantity: "",
//         fromWhomPurchased: "",
//         toWhom: "",
//         verifyDate: "",
//         billInvoiceNo: "",
//         amountType: "Cash",
//         amountDetails: {
//           cashAmount: 0,
//           creditStatus: "Pending",
//         },
//       },
//     ],
//   });
//   const [selectedEntry, setSelectedEntry] = useState(null);
//   const dispatch = useDispatch();
//   const { loading, successMessage, errorMessage } = useSelector(
//     (state) => state.qmpurchase
//   );
//   const { categories } = useSelector((state) => state.category);
//   const [newCategory, setNewCategory] = useState("");
//   const [newSubCategory, setNewSubCategory] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [anchorElSub, setAnchorElSub] = useState(null);

//   useEffect(() => {
//     const today = new Date().toISOString().split("T")[0];
//     setFormData((prev) => ({
//       ...prev,
//       entries: prev.entries.map((entry) => ({
//         ...entry,
//         invoiceDate: today,
//         verifyDate: today,
//       })),
//     }));
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     setFormData((prev) => {
//       let newFormData = { ...prev };
//       if (name === "supplyOrderNo") {
//         newFormData.entries[index].supplyOrderNo = value;
//       } else if (name === "invoiceDate") {
//         newFormData.entries[index].invoiceDate = value;
//       } else {
//         const newEntries = [...prev.entries];
//         if (name === "amountType") {
//           newEntries[index].amountType = value;
//           newEntries[index].amountDetails = {
//             ...newEntries[index].amountDetails,
//             cashAmount: value === "Cash" ? 0 : null,
//             creditStatus: value === "Credit" ? "Pending" : null,
//           };
//         } else if (name.startsWith("amountDetails.")) {
//           const subField = name.split(".")[1];
//           newEntries[index].amountDetails[subField] = value;
//         } else {
//           newEntries[index][name] = value;
//         }
//         newFormData.entries = newEntries;
//       }
//       return newFormData;
//     });
//   };

//   const handleAddEntry = () => {
//     setFormData((prev) => {
//       const firstSupplyOrderNo = prev.entries[0]?.supplyOrderNo || "";
//       return {
//         ...prev,
//         entries: [
//           ...prev.entries,
//           {
//             itemName: "",
//             itemCategory: "",
//             itemSubCategory: "",
//             quantity: "",
//             fromWhomPurchased: "",
//             toWhom: "",
//             verifyDate: new Date().toISOString().split("T")[0],
//             billInvoiceNo: "",
//             supplyOrderNo: firstSupplyOrderNo,
//             amountType: "Cash",
//             amountDetails: {
//               cashAmount: 0,
//               creditStatus: "Pending",
//             },
//           },
//         ],
//       };
//     });
//   };
//   const handleRemoveEntry = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       entries: prev.entries.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = () => {
//     const { orderNo, entries } = formData;
//     const data = { orderNo, entries };
//     console.log("Form Data:", data);
//     dispatch(submitQMPurchase(data));
//   };

//   const handleAddCategory = () => {
//     dispatch(addCategory(newCategory));
//     setFormData((prev) => ({
//       ...prev,
//       entries: prev.entries.map((entry) => ({
//         ...entry,
//         itemCategory: newCategory,
//       })),
//     }));
//     setNewCategory("");
//     setAnchorEl(null);
//   };

//   const handleAddSubCategory = () => {
//     dispatch(addSubCategory(formData.entries[0].itemCategory, newSubCategory));
//     setFormData((prev) => ({
//       ...prev,
//       entries: prev.entries.map((entry) => ({
//         ...entry,
//         itemSubCategory: newSubCategory,
//       })),
//     }));
//     setNewSubCategory("");
//     setAnchorElSub(null);
//   };

//   const handleRowClick = (params) => {
//     setSelectedEntry(params.row);
//   };

//   const formFields = [
//     {
//       name: "supplyOrderNo",
//       label: "Supply-Order Number",
//       type: "text",
//       className: "supply-order-no-field",
//     },
//     {
//       name: "invoiceDate",
//       label: "Invoice Date",
//       type: "date",
//       required: true,
//       className: "invoice-date-field",
//     },
//     {
//       name: "itemName",
//       label: "Item Name",
//       type: "text",
//       required: true,
//       className: "item-name-field",
//     },
//     {
//       name: "quantity",
//       label: "Quantity",
//       type: "number",
//       className: "quantity-field",
//     },
//     {
//       name: "fromWhomPurchased",
//       label: "From Whom?",
//       type: "text",
//       className: "from-whom-purchased-field",
//     },
//     {
//       name: "toWhom",
//       label: "To Whom?",
//       type: "text",
//       className: "to-whom-field",
//     },
//     {
//       name: "verifyDate",
//       label: "Date of Verifying",
//       type: "date",
//       required: true,
//       className: "verify-date-field",
//     },
//     {
//       name: "billInvoiceNo",
//       label: "Bill Invoice No",
//       type: "text",
//       required: true,
//       className: "bill-invoice-no-field",
//     },
//   ];

//   return (
//     <div className="form">
//       <Box
//         className="direct-issue-box"
//         sx={{
//           maxWidth: "800px",
//           margin: "0 auto",
//           padding: "20px",
//           borderRadius: "8px",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//           backgroundColor: "#f9f9f9",
//         }}
//       >
//         <Typography
//           variant="h5"
//           mb={2}
//           fontWeight="bold"
//           textAlign="center"
//           color="white"
//         >
//           QM-Purchase Order Form
//         </Typography>

//         <form className="mui-form">
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 className="order-no-field"
//                 label="Order/Req Number"
//                 name="orderNo"
//                 type="text"
//                 value={formData.orderNo}
//                 onChange={(e) =>
//                   setFormData({ ...formData, orderNo: e.target.value })
//                 }
//                 required
//                 fullWidth
//                 sx={{
//                   input: { color: "white" },
//                   label: { color: "white" },
//                   fieldset: { borderColor: "#ccc" },
//                   mb: 2,
//                 }}
//               />
//             </Grid>

//             {formData.entries.map((entry, index) => (
//               <React.Fragment key={index}>
//                 {formFields.map((field, fieldIndex) => (
//                   <Grid item xs={12} sm={4} key={fieldIndex}>
//                     <TextField
//                       className={field.className}
//                       label={field.label}
//                       name={field.name}
//                       type={field.type}
//                       value={entry[field.name]}
//                       onChange={(e) => handleChange(e, index)}
//                       required={field.required}
//                       fullWidth
//                       sx={{
//                         input: { color: "white" },
//                         label: { color: "white" },
//                         fieldset: { borderColor: "#ccc" },
//                         mb: 2,
//                       }}
//                     />
//                   </Grid>
//                 ))}

//                 <Grid item xs={12} sm={4}>
//                   <FormControl fullWidth className="category-field">
//                     <InputLabel>Category</InputLabel>
//                     <Select
//                       name="itemCategory"
//                       value={entry.itemCategory}
//                       onChange={(e) => handleChange(e, index)}
//                       label="Category"
//                     >
//                       {categories.map((cat, i) => (
//                         <MenuItem key={i} value={cat.name}>
//                           {cat.name}
//                         </MenuItem>
//                       ))}
//                       <MenuItem
//                         value=""
//                         onClick={(e) => setAnchorEl(e.currentTarget)}
//                       >
//                         <em>
//                           <AddIcon fontSize="small" /> Add Category
//                         </em>
//                       </MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={4}>
//                   <FormControl fullWidth className="SubCategory-field">
//                     <InputLabel>SubCategory</InputLabel>
//                     <Select
//                       name="itemSubCategory"
//                       value={entry.itemSubCategory}
//                       onChange={(e) => handleChange(e, index)}
//                       label="SubCategory"
//                       disabled={!entry.itemCategory}
//                     >
//                       {(
//                         categories.find((c) => c.name === entry.itemCategory)
//                           ?.subcategories || []
//                       ).map((sub, i) => (
//                         <MenuItem key={i} value={sub}>
//                           {sub}
//                         </MenuItem>
//                       ))}
//                       <MenuItem
//                         value=""
//                         onClick={(e) => setAnchorElSub(e.currentTarget)}
//                       >
//                         <em>
//                           <AddIcon fontSize="small" /> Add SubCategory
//                         </em>
//                       </MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={4}>
//                   <FormControl fullWidth className="amount-type-field">
//                     <InputLabel>Amount Type</InputLabel>
//                     <Select
//                       name="amountType"
//                       value={entry.amountType}
//                       onChange={(e) => handleChange(e, index)}
//                       label="Amount Type"
//                       required
//                     >
//                       <MenuItem value="Cash">Cash</MenuItem>
//                       <MenuItem value="Credit">Credit</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 {entry.amountType === "Cash" && (
//                   <Grid item xs={12} sm={4}>
//                     <TextField
//                       className="cash-amount-field"
//                       label="Cash Amount"
//                       name="amountDetails.cashAmount"
//                       type="number"
//                       value={entry.amountDetails.cashAmount}
//                       onChange={(e) => handleChange(e, index)}
//                       fullWidth
//                       sx={{
//                         input: { color: "white" },
//                         label: { color: "white" },
//                         fieldset: { borderColor: "#ccc" },
//                         mb: 2,
//                       }}
//                     />
//                   </Grid>
//                 )}

//                 {entry.amountType === "Credit" && (
//                   <Grid item xs={12} sm={4}>
//                     <FormControl fullWidth className="credit-status-field">
//                       <InputLabel>Credit Status</InputLabel>
//                       <Select
//                         name="amountDetails.creditStatus"
//                         value={entry.amountDetails.creditStatus}
//                         onChange={(e) => handleChange(e, index)}
//                         label="Credit Status"
//                         fullWidth
//                         sx={{
//                           input: { color: "white" },
//                           label: { color: "white" },
//                           fieldset: { borderColor: "#ccc" },
//                           mb: 2,
//                         }}
//                       >
//                         <MenuItem value="Pending">Pending</MenuItem>
//                         <MenuItem value="Approved">Approved</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                 )}

//                 <Grid item xs={12} sm={4}>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => handleRemoveEntry(index)}
//                     sx={{
//                       borderRadius: "20px",
//                       px: 2,
//                       py: 1,
//                       fontWeight: "bold",
//                       backgroundColor: "#ffcccc",
//                       "&:hover": {
//                         backgroundColor: "#ff9999",
//                       },
//                     }}
//                   >
//                     Remove Entry
//                   </Button>
//                 </Grid>
//               </React.Fragment>
//             ))}

//             <Grid item xs={12} sm={4}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleAddEntry}
//                 sx={{
//                   borderRadius: "20px",
//                   px: 4,
//                   py: 1,
//                   fontWeight: "bold",
//                   backgroundColor: "#007bff",
//                   "&:hover": {
//                     backgroundColor: "#0056b3",
//                   },
//                 }}
//               >
//                 Add Entry
//               </Button>
//             </Grid>

//             <Grid item xs={12} sm={4}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSubmit}
//                 sx={{
//                   borderRadius: "20px",
//                   px: 4,
//                   py: 1,
//                   fontWeight: "bold",
//                   backgroundColor: "#007bff",
//                   "&:hover": {
//                     backgroundColor: "#0056b3",
//                   },
//                 }}
//               >
//                 Submit
//               </Button>
//             </Grid>
//           </Grid>
//           {loading && <Alert severity="info">Submitting...</Alert>}

//           {successMessage && <Alert severity="success">{successMessage}</Alert>}

//           {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
//         </form>
//         <Popover
//           open={Boolean(anchorEl)}
//           anchorEl={anchorEl}
//           onClose={() => setAnchorEl(null)}
//           anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//         >
//           <Box sx={{ p: 2 }}>
//             <Typography variant="subtitle1">Add New Category</Typography>
//             <TextField
//               size="small"
//               value={newCategory}
//               onChange={(e) => setNewCategory(e.target.value)}
//               placeholder="Category Name"
//               fullWidth
//               sx={{ mb: 1 }}
//             />
//             <Button variant="contained" onClick={handleAddCategory}>
//               Add
//             </Button>
//           </Box>
//         </Popover>
//         <Popover
//           open={Boolean(anchorElSub)}
//           anchorEl={anchorElSub}
//           onClose={() => setAnchorElSub(null)}
//           anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//         >
//           <Box sx={{ p: 2 }}>
//             <Typography variant="subtitle1">Add New SubCategory</Typography>
//             <TextField
//               size="small"
//               value={newSubCategory}
//               onChange={(e) => setNewSubCategory(e.target.value)}
//               placeholder="SubCategory Name"
//               fullWidth
//               sx={{ mb: 1 }}
//             />
//             <Button variant="contained" onClick={handleAddSubCategory}>
//               Add
//             </Button>
//           </Box>
//         </Popover>
//       </Box>
//     </div>
//   );
// };

// export default QMPOrder;
