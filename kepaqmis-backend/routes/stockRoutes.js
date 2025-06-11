const express = require("express");
const router = express.Router();

const PurchaseEntry = require("../models/PurchaseEntry");
const StockItem = require("../models/StockItem");
const UserIssuedItem = require("../models/UserIssuedItem");
const ReturnItem = require("../models/ReturnItem");
const stockController = require("../controllers/stockController");


// 🔹 1. Purchase Wing: Submit Purchase Entry
router.post("/purchase/submit", async (req, res) => {
  try {
    const entry = new PurchaseEntry(req.body);
    await entry.save();
    res.status(201).json({ message: "Purchase entry submitted.", entry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 2. Verification QM: Approve & Add to Stock
router.post("/purchase/approve/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { itemName, category, quantity, unit, make, model, serialNumber, verifiedBy } = req.body;

    const entry = await PurchaseEntry.findById(id);
    if (!entry || entry.status !== "Pending") {
      return res.status(404).json({ message: "Invalid or already verified entry." });
    }

    const stockItem = new StockItem({
      sourceType: "purchase",
      itemName,
      category,
      quantity,
      unit,
      make,
      model,
      serialNumber,
      dateOfVerification: new Date(),
      verifiedBy,
      dateOfPurchase: entry.invoiceDate,
      purchaseEntryId: entry._id
    });

    await stockItem.save();
    entry.status = "Verified";
    await entry.save();

    res.status(200).json({ message: "Purchase approved and added to stock.", stockItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 3. Verification QM: Direct Issue (no purchase)
router.post("/stock/direct-issue", async (req, res) => {
  try {
    const {
      itemName,
      category,
      quantity,
      unit,
      make,
      model,
      serialNumber,
      dateOfIssue,
      from,
      verifiedBy
    } = req.body;

    const stockItem = new StockItem({
      sourceType: "requested-issue",
      Qmno,
      itemName,
      category,
      quantity,
      unit,
      make,
      model,
      serialNumber,
      dateOfVerification: new Date(),
      verifiedBy,
      dateOfIssue,
      from
    });

    await stockItem.save();
    res.status(201).json({ message: "Direct issue item added.", stockItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 4. Issue Item to User
router.post("/issue/item", async (req, res) => {
  try {
    const { user, stockItemId, quantity, issuedBy, isTemporary = false } = req.body;

    const stockItem = await StockItem.findById(stockItemId);
    if (!stockItem || stockItem.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock or invalid item." });
    }

    stockItem.quantity -= quantity;
    await stockItem.save();

    const issuedItem = new UserIssuedItem({
      user,
      stockItemId,
      quantity,
      issuedBy,
      isTemporary
    });

    await issuedItem.save();
    res.status(201).json({ message: "Item issued successfully.", issuedItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 5. Return Item
router.post("/return/item", async (req, res) => {
  try {
    const { user, stockItemId, quantity } = req.body;

    const issuedItem = await UserIssuedItem.findOne({
      user,
      stockItemId,
      status: "active"
    });

    if (!issuedItem || issuedItem.quantity < quantity) {
      return res.status(400).json({ message: "Invalid or insufficient issued item." });
    }

    issuedItem.quantity -= quantity;
    if (issuedItem.quantity === 0) {
      issuedItem.status = "returned";
    }
    await issuedItem.save();

    const returnItem = new ReturnItem({
      user,
      stockItemId,
      quantity
    });

    await returnItem.save();
    res.status(201).json({ message: "Item returned successfully.", returnItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 6. Process Returned Item (Categorize)
router.post("/return/process/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { category, processedBy } = req.body;

    const returnItem = await ReturnItem.findById(id);
    if (!returnItem || returnItem.processedAt) {
      return res.status(400).json({ message: "Invalid or already processed return." });
    }

    returnItem.category = category;
    returnItem.processedBy = processedBy;
    returnItem.processedAt = new Date();
    await returnItem.save();

    const stockItem = await StockItem.findById(returnItem.stockItemId);
    if (category === "Reusable") {
      stockItem.quantity += returnItem.quantity;
      await stockItem.save();
    }

    res.status(200).json({ message: "Return processed.", returnItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;