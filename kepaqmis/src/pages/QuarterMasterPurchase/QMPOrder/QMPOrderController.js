import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addCategory,
  addSubcategory,
} from "../../../redux/actions/categoryActions";
import { submitQMPurchase } from "../../../redux/actions/qmpurchaseActions";
import {useNavigate } from "react-router-dom";
import { fetchOffices } from "../../../redux/actions/officeActions";


export const useQMPOrderController = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  

  const { loading, successMessage, errorMessage } = useSelector(
    (state) => state.qmpurchase
  );
  const { categories } = useSelector((state) => state.category);
  const { offices } = useSelector((state) => state.office);

  const [formData, setFormData] = useState({
    orderNo: "",
    supplyOrderNo: "",
    entries: [
      {
        invoiceDate: "",
        itemName: "",
        itemCategory: "",
        itemSubCategory: "",
        quantity: "",
        fromWhomPurchased: "",
        toWhom: "",
        verifyDate: "",
        billInvoiceNo: "",
        amountType: "Cash",
        amountDetails: { cashAmount: 0, creditStatus: "Pending" },
      },
    ],
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElSub, setAnchorElSub] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      entries: prev.entries.map((entry) => ({
        ...entry,
        invoiceDate: today,
        verifyDate: today,
      })),
    }));
    dispatch(fetchCategories());
    dispatch(fetchOffices());
  }, [dispatch]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value} at index ${index}`);
    setFormData((prev) => {
      let newFormData = { ...prev };
      if (name === "supplyOrderNo") {
        newFormData.entries[index].supplyOrderNo = value;
      } else if (name === "invoiceDate") {
        newFormData.entries[index].invoiceDate = value;
      } else {
        const newEntries = [...prev.entries];
        if (name === "amountType") {
          newEntries[index].amountType = value;
          newEntries[index].amountDetails = {
            ...newEntries[index].amountDetails,
            cashAmount: value === "Cash" ? 0 : null,
            creditStatus: value === "Credit" ? "Pending" : null,
          };
        } else if (name.startsWith("amountDetails.")) {
          const subField = name.split(".")[1];
          newEntries[index].amountDetails[subField] = value;
        } else {
          newEntries[index][name] = value;
        }
        newFormData.entries = newEntries;
      }
      return newFormData;
    });
  };

  const handleAddEntry = () => {
    setFormData((prev) => {
      const firstSupplyOrderNo = prev.entries[0]?.supplyOrderNo || "";
      return {
        ...prev,
        entries: [
          ...prev.entries,
          {
            invoiceDate: new Date().toISOString().split("T")[0],
            itemName: "",
            itemCategory: "",
            itemSubCategory: "",
            quantity: "",
            fromWhomPurchased: "",
            toWhom: "",
            verifyDate: new Date().toISOString().split("T")[0],
            billInvoiceNo: "",
            supplyOrderNo: firstSupplyOrderNo,
            amountType: "Cash",
            amountDetails: {
              cashAmount: 0,
              creditStatus: "Pending",
            },
          },
        ],
      };
    });
  };

  const handleRemoveEntry = (index) => {
    setFormData((prev) => ({
      ...prev,
      entries: prev.entries.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    const data = {
      orderNo: formData.orderNo,
      entries: formData.entries,
    };
    dispatch(submitQMPurchase(data));


    if (!formData.entries || formData.entries.length === 0) return;


    const mappedEntries = formData.entries.map((entry) => ({
  item: entry.itemName,
  qty: entry.quantity,
  quantityUnit: "Nos", // Update if needed
  amount: entry.amountDetails?.cashAmount || "0",
  dateOfPurchased: entry.invoiceDate,
  verificationDate: entry.verifyDate,
  invoiceNumber: entry.billInvoiceNo,
  purchasingParty: entry.fromWhomPurchased,
  purchaseOrderNo: formData.orderNo,
}));

    setTimeout(() => {
   navigate("/proceedings", { state: { entries: mappedEntries } });
  }, 500);
  };

  const handleAddCategory = () => {
    dispatch(addCategory(newCategory));
    setFormData((prev) => ({
      ...prev,
      entries: prev.entries.map((entry) => ({
        ...entry,
        itemCategory: newCategory,
      })),
    }));
    setNewCategory("");
    setAnchorEl(null);
  };

  const handleAddSubcategory = () => {
    dispatch(addSubcategory(formData.entries[0].itemCategory, newSubcategory));
    setFormData((prev) => ({
      ...prev,
      entries: prev.entries.map((entry) => ({
        ...entry,
        itemSubCategory: newSubcategory,
      })),
    }));
    setNewSubcategory("");
    setAnchorElSub(null);
  };

  return {
    formData,
    setFormData,
    loading,
    successMessage,
    errorMessage,
    categories,
    handleChange,
    handleAddEntry,
    handleRemoveEntry,
    handleSubmit,
    anchorEl,
    setAnchorEl,
    anchorElSub,
    offices,
    setAnchorElSub,
    newCategory,
    setNewCategory,
    newSubcategory,
    setNewSubcategory,
    handleAddCategory,
    handleAddSubcategory,
  };
};
