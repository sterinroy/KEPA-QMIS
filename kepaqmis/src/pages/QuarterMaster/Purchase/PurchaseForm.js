// import React, { useEffect, useState } from "react";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import "./Purchase.css";



// const PurchaseForm = () => {
//   // Local state for form data
//   const [formData, setFormData] = useState({
//     orderNo: "",
//     supplyOrderNo: "",
//     invoiceDate: "",
//     from: "",
//     to: "",
//     dateOfVerification: "",
//     billInvoiceNo: "",
//     amount: "",
//     item: "",
//     category: "",
//     subCategory: "",
//     qty: "",
//     isPerishable: "",
//   });

//   useEffect(() => {
//     const today = new Date().toISOString().split("T")[0];
//     setFormData((prev) => ({
//       ...prev,
//       invoiceDate: today,
//       dateOfVerification: today,
//     }));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const userWantsToAddMore = window.confirm(
//       "Do you want to add more items in the same order number?"
//     );

//     if (userWantsToAddMore) {

//       const { orderNo } = formData;
//       setFormData((prev) => ({
//         orderNo, 
//         supplyOrderNo: "",
//         invoiceDate: prev.invoiceDate,
//         from: "",
//         to: "",
//         dateOfVerification: prev.dateOfVerification,
//         billInvoiceNo: "",
//         amount: "",
//         item: "",
//         category: "",
//         subCategory: "",
//         qty: "",
//         isPerishable: "",
//       }));
//     } else {
//       handleFinalSubmit();
//     }
//   };

//   const handleFinalSubmit = () => {
//     console.log("Final Form submitted:", formData);
//     alert("Form submitted successfully!");
//     const today = new Date().toISOString().split("T")[0];
//     setFormData({
//       orderNo: "",
//       supplyOrderNo: "",
//       invoiceDate: today,
//       from: "",
//       to: "",
//       dateOfVerification: today,
//       billInvoiceNo: "",
//       amount: "",
//       item: "",
//       category: "",
//       subCategory: "",
//       qty: "",
//       isPerishable: "",
//     });
//   };

//   return (
//     <>
//       {/* <div className="purchase-entry-container"
//         style={{
//           display: "flex",
//           backgroundColor: "#0C1227",
//           minHeight: "100vh",
          
//         }}
//       > */}

//           <div
//             className="purchase-root"
//             style={{
//               // backgroundColor: "#0C1227",
//               height: "calc(100vh - 64px)",

//                     }}
//                   >

//             <Box className="purchase-box">
//               <Typography
//                 variant="h5"
//                 mb={3}
//                 fontWeight="bold"
//                 textAlign="center"
//                 color="white"
//               >
//                 Purchase Details Entry Form
//               </Typography>
//               <form onSubmit={handleSubmit} className="mui-form">
//                 <TextField
//                   label="Order No"
//                   name="orderNo"
//                   value={formData.orderNo}
//                   onChange={handleChange}
//                   // InputLabelProps={{ shrink: true }}
//                   required
//                   fullWidth
//                   sx={{
//                     input: { color: "white" },
//                     label: { color: "white" },
//                     fieldset: { borderColor: "white" },
//                     mb: 0.5,
//                   //  width:500
//                   }}
//                 />
//                 <TextField
//                   label="Supply Order No"
//                   name="supplyOrderNo"
//                   value={formData.supplyOrderNo}
//                   onChange={handleChange}
//                   InputLabelProps={{ shrink: true }}
//                   required
//                   fullWidth
//                   sx={{
//                     input: { color: "white" },
//                     label: { color: "white" },
//                     fieldset: { borderColor: "white" },
//                     mb: 0.5,
                  
//                   }}
//                 />
//                 <TextField
//                   label="Invoice Date"
//                   type="date"
//                   name="invoiceDate"
//                   value={formData.invoiceDate}
//                   onChange={handleChange}
//                   InputLabelProps={{ shrink: true }}
//                   required
//                   fullWidth
//                   sx={{
//                     input: { color: "white" },
//                     label: { color: "white" },
//                     fieldset: { borderColor: "white" },
//                     mb: 0.5,
//                   }}
//                 />
//                 <TextField
//                   label="Bill Invoice No"
//                   name="billInvoiceNo"
//                   value={formData.billInvoiceNo}
//                   onChange={handleChange}
//                   required
//                   fullWidth
//                   sx={{
//                     input: { color: "white" },
//                     label: { color: "white" },
//                     fieldset: { borderColor: "white" },
//                     mb: 0.5,
//                   }}
//                 />
//                 <TextField
//                   label="Amount"
//                   name="amount"
//                   value={formData.amount}
//                   onChange={handleChange}
//                   required
//                   fullWidth
//                   sx={{
//                     input: { color: "white" },
//                     label: { color: "white" },
//                     fieldset: { borderColor: "white" },
//                     mb: 0.5,
//                   }}
//                 />
//                 <TextField
//                   label="From (Party Name)"
//                   name="from"
//                   value={formData.from}
//                   onChange={handleChange}
//                   required
//                   fullWidth
//                   sx={{
//                     input: { color: "white" },
//                     label: { color: "white" },
//                     fieldset: { borderColor: "white" },
//                     mb: 0.5,
//                   }}
//                 />
//                 <TextField
//                   label="To (Office/Company)"
//                   name="to"
//                   value={formData.to}
//                   onChange={handleChange}
//                   required
//                   fullWidth
//                   sx={{
//                     input: { color: "white" },
//                     label: { color: "white" },
//                     fieldset: { borderColor: "white" },
//                     mb: 0.5,
//                   }}
//                 />
//                 <TextField
//                   label="Date Of Verification"
//                   type="date"
//                   name="dateOfVerification"
//                   value={formData.dateOfVerification}
//                   onChange={handleChange}
//                   InputLabelProps={{ shrink: true }}
//                   required
//                   fullWidth
//                   sx={{
//                     input: { color: "white" },
//                     label: { color: "white" },
//                     fieldset: { borderColor: "white" },
//                     mb: 0.5,
//                   }}
//                 />
//                 <TextField
//                   label="Item"
//                   name="item"
//                   value={formData.item}
//                   onChange={handleChange}
//                   required
//                   fullWidth
//                   sx={{
//                     input: { color: "white" },
//                     label: { color: "white" },
//                     fieldset: { borderColor: "white" },
//                     mb: 0.5,
//                   }}
//                 />
//                 <TextField
//                   label="Category"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   required
//                   fullWidth
//                   sx={{
//                     input: { color: "white" },
//                     label: { color: "white" },
//                     fieldset: { borderColor: "white" },
//                     mb: 0.5,
//                   }}
//                 />
//                 <TextField
//                   label="Sub Category"
//                   name="subCategory"
//                   value={formData.subCategory}
//                   onChange={handleChange}
//                   required
//                   fullWidth
//                   sx={{
//                     input: { color: "white" },
//                     label: { color: "white" },
//                     fieldset: { borderColor: "white" },
//                     mb: 0.5,
//                   }}
//                 />
//                 <TextField
//                   label="Quantity"
//                   type="number"
//                   name="qty"
//                   value={formData.qty}
//                   onChange={handleChange}
//                   required
//                   fullWidth
//                   sx={{
//                     input: { color: "white" },
//                     label: { color: "white" },
//                     fieldset: { borderColor: "white" },
//                     mb: 0.5,
//                   }}
//                 />
//                 <FormControl fullWidth sx={{ mb: 1 }}>
//                   <InputLabel id="perishable-label" sx={{ color: "white" }}>
//                     Is Perishable? *
//                   </InputLabel>
//                   <Select
//                     labelId="perishable-label"
//                     name="isPerishable"
//                     value={formData.isPerishable}
//                     onChange={handleChange}
//                     label="Is Perishable"
//                     sx={{
//                       color: "white",
//                       ".MuiOutlinedInput-notchedOutline": {
//                         borderColor: "white",
//                       },
//                       "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                         borderColor: "white",
//                       },
//                     }}
//                   >
//                     <MenuItem value="Yes">Yes</MenuItem>
//                     <MenuItem value="No">No</MenuItem>
//                   </Select>
//                 </FormControl>

//                 {/* Submit Button */}
//                 <Box display="flex" justifyContent="flex-end" sx={{ mt: 0.7 }}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     type="submit"
//                     sx={{
//                       borderRadius: 2,
//                       px: 8.3,
//                       py: 1,
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Submit
//                   </Button>
//                 </Box>
//               </form>
//             </Box>
//           </div>
        
//       {/* </div> */}
//     </>
//   );
// };

// export default PurchaseForm;

import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import "./Purchase.css";

const LOCAL_STORAGE_KEY = "purchaseCategoryOptions";

const PurchaseForm = () => {
  const defaultCategories = {
    Electronic: ["Laptop", "Mouse"],
    Stationary: ["Pen", "Pencil"],
    Weapons: [],
    Others: [],
  };
  const officeOptions = [
    "A block", "AC I Wing", "AC II Wing", "AD Admin", "AD MT", "AD Outdoor", "AD PS", "AD Training",
    "Armour Wing", "B Block", "Computer Lab", "CPC", "Cyber Forensics Lab",
    "Direcor Bunglow", "Director Office", "DKMS", "Drinking Water Treatment Plant (DWTP)",
    "Driving School", "Dry Canteen", "Duty Office", "DySP Admin", "DySP Indoor", "DySP PS1",
    "DySP PS2", "DySP TTNS", "Guest House", "HoD Behavioral Science", "HoD Computer Application", "HoD Forensics Medicine",
    "HoD Forensics Science", "HoD Law", "IGP/ DIG Training", "Indoor",
    "Inspector Admin Office", "Inspector Indoor OFFICE", "Laundry", "Model PS",
    "MT Office", "PRC", "R & P Wing", "SDTS", "SO Mess", "Super Market", "Swimming Pool",
    "Telecommunication Wing", "TT 01", "TT 02", "TT 03", "TT 04", "TT 05", "TT 06", "TT 07", "TT 08",
    "TT 09", "TT 10", "Unit Hospital", "Vishranthi", "Wet Canteen"
  ];

  const [categoryOptions, setCategoryOptions] = useState(defaultCategories);
  const [showCustomSubCategoryInput, setShowCustomSubCategoryInput] = useState(false);

  const [formData, setFormData] = useState({
    orderNo: "",
    supplyOrderNo: "",
    invoiceDate: "",
    from: "",
    to: "",
    dateOfVerification: "",
    billInvoiceNo: "",
    amount: "",
    item: "",
    category: "",
    subCategory: "",
    qty: "",
    units: "",
    isPerishable: "",
  });

  // Load categories from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      setCategoryOptions(JSON.parse(stored));
    }

    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      invoiceDate: today,
      dateOfVerification: today,
    }));
  }, []);

  // Save categories to localStorage on update
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categoryOptions));
  }, [categoryOptions]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        category: value,
        subCategory: "",
      }));
      setShowCustomSubCategoryInput(false);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      showCustomSubCategoryInput &&
      formData.subCategory &&
      formData.category &&
      !categoryOptions[formData.category]?.includes(formData.subCategory)
    ) {
      const updated = {
        ...categoryOptions,
        [formData.category]: [...(categoryOptions[formData.category] || []), formData.subCategory],
      };
      setCategoryOptions(updated);
    }

    const userWantsToAddMore = window.confirm("Do you want to add more items in the same order number?");
    if (userWantsToAddMore) {
      const { orderNo } = formData;
      setFormData((prev) => ({
        orderNo,
        supplyOrderNo: "",
        invoiceDate: prev.invoiceDate,
        from: "",
        to: "",
        dateOfVerification: prev.dateOfVerification,
        billInvoiceNo: "",
        amount: "",
        item: "",
        category: "",
        subCategory: "",
        qty: "",
        units: "",
        isPerishable: "",
      }));
      setShowCustomSubCategoryInput(false);
    } else {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = () => {
    console.log("Final Form submitted:", formData);
    alert("Form submitted successfully!");
    const today = new Date().toISOString().split("T")[0];
    setFormData({
      orderNo: "",
      supplyOrderNo: "",
      invoiceDate: today,
      from: "",
      to: "",
      dateOfVerification: today,
      billInvoiceNo: "",
      amount: "",
      item: "",
      category: "",
      subCategory: "",
      qty: "",
      units: "",
      isPerishable: "",
    });
    setShowCustomSubCategoryInput(false);
  };

  return (
    <div className="purchase-root" style={{ height: "calc(100vh - 64px)" }}>
      <Box className="purchase-box">
        <Typography
          variant="h5"
          mb={3}
          fontWeight="bold"
          textAlign="center"
          color="white"
        >
          Purchase Details Entry Form
        </Typography>
        <form onSubmit={handleSubmit} className="mui-form">
          {/* Other fields */}
          <TextField label="Order No" name="orderNo" value={formData.orderNo} onChange={handleChange} required fullWidth sx={textFieldStyles} />
          <TextField label="Supply Order No" name="supplyOrderNo" value={formData.supplyOrderNo} onChange={handleChange} required fullWidth sx={textFieldStyles} />
          <TextField label="Invoice Date" type="date" name="invoiceDate" value={formData.invoiceDate} onChange={handleChange} InputLabelProps={{ shrink: true }} required fullWidth sx={textFieldStyles} />
          <TextField label="Bill Invoice No" name="billInvoiceNo" value={formData.billInvoiceNo} onChange={handleChange} required fullWidth sx={textFieldStyles} />
          <TextField label="Amount" name="amount" value={formData.amount} onChange={handleChange} required fullWidth sx={textFieldStyles} />
          <TextField label="From (Party Name)" name="from" value={formData.from} onChange={handleChange} required fullWidth sx={textFieldStyles} />

          {/* <TextField label="To (Office/Company)" name="to" value={formData.to} onChange={handleChange} required fullWidth sx={textFieldStyles} /> */}
          <FormControl fullWidth sx={{ mb: 1 }}>
                  <InputLabel sx={{ color: "white" }}>Office / Company</InputLabel>
                  <Select
                    name="toWhom"
                    value={formData.toWhom}
                    onChange={handleChange}
                    sx={selectStyles}
                  >
                    {officeOptions.map((label) => (
                      <MenuItem key={label} value={label}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
          <TextField label="Date Of Verification" type="date" name="dateOfVerification" value={formData.dateOfVerification} onChange={handleChange} InputLabelProps={{ shrink: true }} required fullWidth sx={textFieldStyles} />
          <TextField label="Item" name="item" value={formData.item} onChange={handleChange} required fullWidth sx={textFieldStyles} />

          {/* Category */}
          <FormControl fullWidth sx={{ mb: 1 }}>
            <InputLabel sx={{ color: "white" }}>Category *</InputLabel>
            <Select name="category" value={formData.category} onChange={handleChange} label="Category" sx={selectStyles}>
              {Object.keys(categoryOptions).map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* SubCategory with Add Option */}
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            {formData.category &&
              categoryOptions[formData.category]?.length > 0 &&
              !showCustomSubCategoryInput ? (
              <>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "white" }}>Sub Category *</InputLabel>
                  <Select name="subCategory" value={formData.subCategory} onChange={handleChange} label="Sub Category" sx={selectStyles}>
                    {categoryOptions[formData.category].map((subCat) => (
                      <MenuItem key={subCat} value={subCat}>{subCat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button variant="outlined" onClick={() => setShowCustomSubCategoryInput(true)} sx={{ height: 56 }}>Add</Button>
              </>
            ) : (
              <>
                <TextField label="Sub Category" name="subCategory" value={formData.subCategory} onChange={handleChange} required fullWidth sx={textFieldStyles} />
                {formData.category && categoryOptions[formData.category]?.length > 0 && (
                  <Button variant="outlined" color="secondary" onClick={() => {
                    setFormData((prev) => ({ ...prev, subCategory: "" }));
                    setShowCustomSubCategoryInput(false);
                  }} sx={{ height: 56 }}>
                    Cancel
                  </Button>
                )}
              </>
            )}
          </Box>

          {/* Quantity & Units */}
          <TextField label="Quantity" type="number" name="qty" value={formData.qty} onChange={handleChange} required fullWidth sx={textFieldStyles} />
          <TextField label="Units" name="units" value={formData.units} onChange={handleChange} required fullWidth sx={textFieldStyles} />

          {/* Perishable */}
          <FormControl fullWidth sx={{ mb: 1 }}>
            <InputLabel id="perishable-label" sx={{ color: "white" }}>Is Perishable? *</InputLabel>
            <Select labelId="perishable-label" name="isPerishable" value={formData.isPerishable} onChange={handleChange} label="Is Perishable" sx={selectStyles}>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>

          {/* Submit */}
          <Box display="flex" justifyContent="center" sx={{ mt: 0.7,gridColumn: 'span 2' }}>
            <Button variant="contained" color="primary" type="submit" sx={{ borderRadius: 2, px: 8.3, py: 1, fontWeight: "bold" }}>
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

const textFieldStyles = {
  input: { color: "white" },
  label: { color: "white" },
  fieldset: { borderColor: "white" },
  mb: 0.5,
};

const selectStyles = {
  color: "white",
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
};

export default PurchaseForm;
