const express = require("express");
const router = express.Router();

const PurchaseEntry = require("../models/PurchaseEntry");
const StockItem = require("../models/StockItem");
// const UserIssuedItem = require("../models/UserIssuedItem");
// const ReturnItem = require("../models/ReturnItem");

// 1. Purchase Wing: Submit Purchase Entry
router.post("/purchase/submit", async (req, res) => {
  try {
    const { orderNo, entries } = req.body; // Expecting an object with qmNo and an array of entries
    const savedEntries = await Promise.all(
      entries.map((entryData) => {
        const entry = new PurchaseEntry({ ...entryData, orderNo });
        return entry.save();
      })
    );
    res
      .status(201)
      .json({ message: "Purchase entries submitted.", entries: savedEntries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  2. Purchase Wing: Get Pending Purchase Entries
router.get("/purchase/entries", async (req, res) => {
  try {
    const entries = await PurchaseEntry.find({ status: "Pending" });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  3. Verification QM: Approve & Add to Stock
// router.post("/purchase/approve/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       orderNo,

//       supplyOrderNo,
//       invoiceDate,
//       itemCategory,
//       itemSubCategory,
//       verifyDate,
//       amountType,
//       amountDetails,
//       fromWhomPurchased,
//       toWhom,
//       itemName,
//       billInvoiceNo,

//       Qmno,
//       status,
//       quantity,
//       unit,
//       make,
//       model,
//       modelNo,
//       perishable,
//       serialNumber,
//       verifiedBy,
//     } = req.body;

//     const entry = await PurchaseEntry.findById(id);
//     if (!entry || entry.status !== "Pending") {
//       return res
//         .status(404)
//         .json({ message: "Invalid or already verified entry." });
//     }

//     const stockItem = new StockItem({
//       sourceType: "purchase",
//       orderNo: orderNo || entry.orderNo,
//       supplyOrderNo: supplyOrderNo || entry.supplyOrderNo,
//       invoiceDate: invoiceDate || entry.invoiceDate,
//       itemCategory: entry.itemCategory || itemCategory,
//       itemSubCategory: entry.itemSubCategory || itemSubCategory,
//       verifyDate: verifyDate || entry.verifyDate,
//       amountType: amountType || entry.amountType,
//       amountDetails: amountDetails || entry.amountDetails,

//       fromWhomPurchased: fromWhomPurchased || entry.fromWhomPurchased,
//       toWhom: toWhom || entry.toWhom,
//       itemName: entry.itemName || itemName,
//       billInvoiceNo: billInvoiceNo || entry.billInvoiceNo,
//       Qmno,
//       status,
//       quantity: entry.quantity || quantity,
//       unit: entry.unit || unit,
//       make,
//       model,
//       modelNo,
//       perishable,
//       // enteredBy: entry.enteredBy,
//       serialNumber,
//       // dateOfVerification: new Date(),
//       verifiedBy: verifiedBy ? { pen: verifiedBy } : entry.verifiedBy,
//       // dateOfPurchase: entry.invoiceDate,
//       purchaseEntryId: entry._id,
//     });
//     console.log("albert", req.body);
//     console.log("hi", stockItem);

//     await stockItem.save();
//     entry.status = "Verified";
//     await entry.save();

//     res
//       .status(200)
//       .json({ message: "Purchase approved and added to stock.", stockItem });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.post("/purchase/approve/:id", async (req, res) => {
  const totalStockItems = await StockItem.countDocuments();
  const nextStockItemNo = totalStockItems + 1;
  try {
    const { id } = req.params;
    const pendingPurchase = await PurchaseEntry.findById(id);
    if (!pendingPurchase || pendingPurchase.status !== "Pending") {
      return res
        .status(404)
        .json({ message: "Invalid or already verified entry." });
    }

    const {
      orderNo,
      invoiceDate,
      supplyOrderNo,
      fromWhomPurchased,
      toWhom,
      billInvoiceNo,
      amount,
      Qmno,
      itemName,
      itemCategory,
      itemSubCategory,
      quantity,
      unit,
      warranty,
      typeofFund,
      make,
      model,
      modelNo,
      perishable,
      serialNumber,
      verifiedBy,
      amountType,
      amountDetails,
    } = req.body;

    const entry = await PurchaseEntry.findById(id);
    if (!entry || entry.status !== "Pending") {
      return res
        .status(404)
        .json({ message: "Invalid or already verified entry." });
    }

    const stockItem = new StockItem({
      sourceType: "purchase",
      orderNo: orderNo || entry.orderNo,
      invoiceDate: invoiceDate || entry.invoiceDate,
      supplyOrderNo: supplyOrderNo || entry.supplyOrderNo,
      fromWhomPurchased: fromWhomPurchased || entry.fromWhomPurchased,
      toWhom: toWhom || entry.toWhom,
      billInvoiceNo: billInvoiceNo || entry.billInvoiceNo,
      amount: amount || entry.amount,
      Qmno,
      itemName: entry.itemName || itemName,
      itemCategory: entry.itemCategory || itemCategory,
      itemSubCategory: entry.itemSubCategory || itemSubCategory,
      quantity: entry.quantity || quantity,
      unit: entry.unit || unit,
      warranty,
      typeofFund,
      make,
      model,
      modelNo,
      perishable,
      enteredBy: entry.enteredBy,
      serialNumber,
      dateOfVerification: new Date(),
      verifiedBy:
        typeof verifiedBy === "string"
          ? { pen: verifiedBy }
          : verifiedBy || entry.verifiedBy,
      dateOfPurchase: entry.invoiceDate,
      purchaseEntryId: entry._id,
      amountType: amountType || entry.amountType,
      amountDetails: amountDetails || entry.amountDetails,
    });

    console.log("🔸 Incoming approval request body:", req.body);
    console.log("🔸 Params ID:", req.params.id);

    try {
      await stockItem.save();
    } catch (saveErr) {
      console.error("❌ Error saving stock item:", saveErr);
      return res.status(500).json({ error: saveErr.message });
    }

    console.log("1", entry.status);
    await PurchaseEntry.findByIdAndUpdate(entry.id, { status: "Verified" });

    console.log("2", entry.status);

    res.status(200).json({
      message: "Purchase approved and added to stock.",
      stockItem,
      nextStockItemNo,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Verification QM: Requested Issue (no purchase)
router.post("/stock/requested-issue", async (req, res) => {
  try {
    const {
      orderNo,
      invoiceDate,
      supplyOrderNo,
      fromWhomPurchased,
      toWhom,
      billInvoiceNo,
      amount,
      Qmno,
      itemName,
      itemCategory,
      itemSubCategory,
      quantity,
      unit,
      make,
      model,
      modelNo,
      perishable,
      enteredBy,
      serialNumber,
      dateOfVerification,
      dateOfPurchase,
      dateOfIssue,
      verifiedBy,
    } = req.body;

    const stockItem = new StockItem({
      sourceType: "requested-issue",
      orderNo,
      invoiceDate,
      supplyOrderNo,
      fromWhomPurchased,
      toWhom,
      billInvoiceNo,
      amount,
      Qmno,
      itemName,
      itemCategory,
      itemSubCategory,
      quantity,
      unit,
      make,
      model,
      modelNo,
      perishable,
      enteredBy,
      serialNumber,
      dateOfPurchase: dateOfPurchase ? new Date(dateOfPurchase) : new Date(),
      dateOfIssue: dateOfIssue ? new Date(dateOfIssue) : new Date(),
      dateOfVerification: dateOfVerification
        ? new Date(dateOfVerification)
        : new Date(),
      verifiedBy,
    });

    await stockItem.save();
    res.status(201).json({ message: "Requested issue item added.", stockItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Verification QM: direct Issue
router.post("/stock/direct-issue", async (req, res) => {
  try {
    const {
      Qmno,
      itemName,
      itemCategory,
      itemSubCategory,
      quantity,
      unit,
      issuedfrom,
      make,
      model,
      modelNo,
      enteredBy,
      serialNumber,
      indentNo,
      perishable,
      fromWhomPurchased,
      dateOfVerification,
      dateOfPurchase,
      dateOfIssue,
      verifiedBy,
      warranty,
    } = req.body;

    const stockItem = new StockItem({
      sourceType: "direct-issue",
      Qmno,
      fromWhomPurchased,
      itemName,
      itemCategory,
      itemSubCategory,
      quantity,
      unit,
      issuedfrom,
      make,
      model,
      modelNo,
      enteredBy,
      serialNumber,
      perishable,
      indentNo,
      warranty,
      dateOfPurchase: dateOfPurchase ? new Date(dateOfPurchase) : new Date(),
      dateOfIssue: dateOfIssue ? new Date(dateOfIssue) : new Date(),
      dateOfVerification: dateOfVerification
        ? new Date(dateOfVerification)
        : new Date(),
      verifiedBy,
    });
    console.log("ali", stockItem);

    await stockItem.save();
    res.status(201).json({ message: "Requested issue item added.", stockItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/stock/add-direct-entry", async (req, res) => {
  try {
    const stockItem = new StockItem({
      ...req.body,
      dateOfVerification: req.body.dateOfVerification
        ? new Date(req.body.dateOfVerification)
        : new Date(),
      dateOfPurchase: req.body.dateOfPurchase
        ? new Date(req.body.dateOfPurchase)
        : new Date(),
      dateOfIssue: req.body.dateOfIssue
        ? new Date(req.body.dateOfIssue)
        : new Date(),
    });

    await stockItem.save();
    res.status(201).json({ message: "Stock item added successfully", stockItem });
  } catch (err) {
    console.error("Error adding stock item:", err);
    res.status(500).json({ error: err.message });
  }
});


// 🔹 6. Get Stock Items
router.get("/stockitems", async (req, res) => {
  try {
    const stockItems = await StockItem.find().sort({ invoiceDate: -1 });
    res.status(200).json(stockItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
