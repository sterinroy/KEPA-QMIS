import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Alert,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import jsPDF from "jspdf";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategory,
  addSubcategory,
} from "../../redux/actions/categoryActions";

const QMIDirectForm = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const fieldConfig = [
    { name: "Qmno", label: "QM No.", type: "text", required: true },
    {
      name: "dateOfIssue",
      label: "Date Of Issue",
      type: "date",
      required: true,
    },
    {
      name: "fromWhomPurchased",
      label: "From",
      type: "select",
      options: ["Chief", "District", "Others"],
      required: true,
    },
    { name: "itemName", label: "Item", type: "text", required: true },
    { name: "itemCategory", label: "Category", type: "select", required: true },
    {
      name: "itemSubCategory",
      label: "Sub Category",
      type: "select",
      required: true,
    },
    { name: "make", label: "Make / Brand", type: "text", required: true },
    { name: "model", label: "Model", type: "text", required: true },
    { name: "modelNo", label: "Model No", type: "text", required: true },
    {
      name: "serialNumber",
      label: "Product No / Serial No",
      type: "text",
      required: true,
    },
    { name: "quantity", label: "Quantity", type: "number", required: true },
    { name: "issuedfrom", label: "Issued From", type: "text", required: true },
    {
      name: "unit",
      label: "Unit",
      type: "text",
      required: true,
    },
    {
      name: "warranty",
      label: "Warranty (In Months)",
      type: "text",
      required: false,
    },
    { name: "indentNo", label: "Indent No.", type: "text", required: true },
    {
      name: "perishable",
      label: "Perishable",
      type: "select",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      required: true,
    },
    {
      label: "Entered By",
      fields: [
        { name: "enteredByPen", label: "Entered By (PEN No.)", type: "text", required: true },
        { name: "enteredByName", label: "Entered By (Name)", type: "text", required: true },
      ],
    },
    {
      label: "Verified By",
      fields: [
        { name: "verifiedByPen", label: "Verified By (PEN No.)", type: "text", required: true },
      ],
    },
    {
      name: "dateOfPurchase",
      label: "Date Of Purchase",
      type: "date",
      required: true,
    },
    {
      name: "dateOfVerification",
      label: "Date Of Verification",
      type: "date",
      required: true,
    },
  ];

  const getInitialFormData = () => {
    const data = {};
    fieldConfig.forEach((field) => {
      if (field.name) data[field.name] = "";
      if (field.fields) field.fields.forEach((f) => (data[f.name] = ""));
    });
    data.dateOfIssue = new Date().toISOString().split("T")[0];
    data.dateOfPurchase = new Date().toISOString().split("T")[0];
    data.dateOfVerification = new Date().toISOString().split("T")[0];
    return data;
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      itemCategory: value,
      itemSubCategory: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    console.log("Submitted formData:", formData);
    let invalidField = null;
    const invalid = fieldConfig.some((field) => {
      if (
        field.name &&
        field.required &&
        !formData[field.name]?.toString().trim()
      ) {
        invalidField = field.name;
        return true;
      }
      if (field.fields && field.condition?.(formData)) {
        const innerInvalid = field.fields.find(
          (f) => f.required && !formData[f.name]?.toString().trim()
        );
        if (innerInvalid) {
          invalidField = innerInvalid.name;
          return true;
        }
      }
      return false;
    });
    if (invalid) {
      console.error("Missing or invalid field:", invalidField);
      setError("Please fill all required fields.");
      setStatus("failed");
      return;
    }
    setConfirmOpen(true); // Open confirmation dialog
  };

  const submitConfirmed = async () => {
    setConfirmOpen(false);
    setStatus("loading");
    console.log("Submitting formData:", formData);
    const payload = {
      ...formData,
      enteredBy: {
        pen: formData.enteredByPen,
        name: formData.enteredByName,
      },
      verifiedBy: {
        pen: formData.verifiedByPen,
      },
      perishable:
        formData.perishable === "true" || formData.perishable === true,
      warranty: formData.warranty ? parseInt(formData.warranty) : undefined,
    };
    try {
      const res = await fetch("/api/stockRoutes/stock/direct-issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to submit");
      const result = await res.json();
      setSuccessMessage("Item successfully issued.");
      generateAndDownloadPDF();
      setFormData(getInitialFormData());
      setStatus("idle");
    } catch (err) {
      setError(err.message);
      setStatus("failed");
    }
  };

  const generateAndDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Direct Stock Issue", 20, 20);
    let y = 30;
    Object.entries(formData).forEach(([k, v]) => {
      if (v)
        doc.text(`${k.replace(/([A-Z])/g, " $1").trim()}: ${v}`, 20, (y += 10));
    });
    doc.save("DirectStockIssue.pdf");
  };

  const handleAddSubcategory = () => {
    if (!newSubcategory || !formData.itemCategory) return;
    dispatch(addSubcategory(formData.itemCategory, newSubcategory));
    setFormData((prev) => ({
      ...prev,
      itemSubCategory: newSubcategory,
    }));
    setNewSubcategory("");
  };

  const renderField = (field) => {
    const value = formData[field.name];
    if (!field.name) return null;
    if (
      field.type === "text" ||
      field.type === "number" ||
      field.type === "date"
    ) {
      return (
        <TextField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          value={value}
          onChange={handleChange}
          required={field.required}
          fullWidth
          margin="normal"
          InputLabelProps={field.type === "date" ? { shrink: true } : {}}
        />
      );
    }
    if (field.type === "select") {
      return (
        <FormControl
          fullWidth
          required={field.required}
          margin="normal"
          key={field.name}
        >
          <InputLabel>{field.label}</InputLabel>
          <Select
            name={field.name}
            value={value || ""}
            onChange={handleChange}
            label={field.label}
          >
            {(field.options || []).map((opt) =>
              typeof opt === "object" ? (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ) : (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      );
    }
  };

  return (
    <div className="direct-issue-root">
      <div className="direct-issue-box">
        <Typography
          variant="h5"
          textAlign="center"
          gutterBottom
          style={{ color: "white", fontWeight: "bold" }}
        >
          Direct Issued Stock Entry Form
        </Typography>

        {status === "failed" && <Alert severity="error">{error}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        <form onSubmit={handleSubmit}>
          {fieldConfig.map((field) => {
            if (field.condition && !field.condition(formData)) return null;
            if (field.fields) return field.fields.map((f) => renderField(f));
            if (field.name === "itemCategory") {
              return (
                <FormControl fullWidth margin="normal" key="itemCategory">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.itemCategory || ""}
                    onChange={handleCategoryChange}
                    name="itemCategory"
                    label="Category"
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat.name} value={cat.name}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }
            if (field.name === "itemSubCategory") {
              const selectedCategory = categories.find(
                (cat) => cat.name === formData.itemCategory
              );
              return (
                <FormControl fullWidth margin="normal" key="itemSubCategory">
                  <InputLabel>Sub Category</InputLabel>
                  <Select
                    value={formData.itemSubCategory || ""}
                    onChange={handleChange}
                    name="itemSubCategory"
                    label="Sub Category"
                  >
                    {selectedCategory?.subcategories?.map((sub) => (
                      <MenuItem key={sub} value={sub}>
                        {sub}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }
            return renderField(field);
          })}

          <div style={{ marginTop: "16px", textAlign: "right" }}>
            <Button
              variant="contained"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting..." : "Submit"}
            </Button>
          </div>

          <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to issue this item?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmOpen(false)}>No</Button>
              <Button onClick={submitConfirmed} variant="contained">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </div>
    </div>
  );
};

export default QMIDirectForm;
