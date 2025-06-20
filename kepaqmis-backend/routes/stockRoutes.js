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
router.post("/purchase/approve/:id", async (req, res) => {
  try {
    const { id } = req.params;
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
      make,
      model,
      modelNo,
      perishable,
      enteredBy: entry.enteredBy,
      serialNumber,
      dateOfVerification: new Date(),
      verifiedBy,
      dateOfPurchase: entry.invoiceDate,
      purchaseEntryId: entry._id,
      amountType: amountType || entry.amountType,
      amountDetails: amountDetails || entry.amountDetails,
    });

    await stockItem.save();
    entry.status = "Verified";
    await entry.save();

    res
      .status(200)
      .json({ message: "Purchase approved and added to stock.", stockItem });
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
      issuedBy,
      make,
      model,
      modelNo,
      enteredBy,
      serialNumber,
      indentNo,
      perishable,
      dateOfVerification,
      dateOfPurchase,
      dateOfIssue,
      verifiedBy,
    } = req.body;

    const stockItem = new StockItem({
      sourceType: "direct-issue",
      Qmno,
      itemName,
      itemCategory,
      itemSubCategory,
      quantity,
      unit,
      issuedBy,
      make,
      model,
      modelNo,
      enteredBy,
      serialNumber,
      perishable,
      indentNo,
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
