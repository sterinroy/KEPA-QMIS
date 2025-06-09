const express = require("express");
const router = express.Router();

const StockItem = require("../models/StockItem");
const StockTransaction = require("../models/StockTransaction");
const PendingPurchase = require("../models/PendingPurchase");

// 1️⃣ Add Purchase Entry (by Purchase Wing)
router.post("/purchase/submit", async (req, res) => {
  try {
    const { itemName, category, quantity, unit, addedBy } = req.body;

    const newEntry = new PendingPurchase({ itemName, category, quantity, unit, addedBy });
    await newEntry.save();

    res.status(200).json({ message: "Purchase entry submitted." });
  } catch (err) {
    console.error("Submit Error:", err);
    res.status(500).json({ message: "Error submitting purchase entry." });
  }
});

// 2️⃣ Verify & Approve Purchase (by Main QM)
router.post("/purchase/approve/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { make, model, batchNo, description, by } = req.body;

    const pending = await PendingPurchase.findById(id);
    if (!pending) return res.status(404).json({ message: "Entry not found" });

    const stockItem = await StockItem.findOne({ itemName: pending.itemName, category: pending.category });

    if (stockItem) {
      stockItem.quantity += pending.quantity;
    } else {
      await StockItem.create({
        itemName: pending.itemName,
        category: pending.category,
        quantity: pending.quantity,
        unit: pending.unit,
        purchaseType: "Purchased",
        make,
        model,
        batchNo,
        description
      });
    }

    await StockTransaction.create({
      itemId: stockItem?._id,
      action: "Purchase",
      quantity: pending.quantity,
      by,
      remarks: "Approved from Purchase Wing"
    });

    pending.status = "Approved";
    await pending.save();

    res.status(200).json({ message: "Purchase verified and stock updated." });
  } catch (err) {
    console.error("Approve Error:", err);
    res.status(500).json({ message: "Error approving purchase." });
  }
});

// 3️⃣ Add Direct Issue (stock is affected)
router.post("/stock/direct-issue", async (req, res) => {
  try {
    const { itemName, category, quantity, unit, by, make, model, batchNo, description } = req.body;

    let item = await StockItem.findOne({ itemName, category, unit });
    if (item) {
      item.quantity += quantity;
    } else {
      item = new StockItem({
        itemName,
        category,
        quantity,
        unit,
        purchaseType: "DirectIssue",
        make,
        model,
        batchNo,
        description
      });
    }

    await item.save();

    await StockTransaction.create({
      itemId: item._id,
      action: "DirectIssue",
      quantity,
      by,
      remarks: "Direct Government Allocation"
    });

    res.status(200).json({ message: "Direct issue added to stock." });
  } catch (err) {
    console.error("Direct Issue Error:", err);
    res.status(500).json({ message: "Error adding direct issue." });
  }
});

// 4️⃣ Add Quota Entry (previously Allocation)
router.post("/stock/quota", async (req, res) => {
  try {
    const { itemName, category, quantity, unit, by } = req.body;

    let item = await StockItem.findOne({ itemName, category, unit });
    if (item) {
      item.quantity += quantity;
    } else {
      item = new StockItem({
        itemName,
        category,
        quantity,
        unit,
        purchaseType: "Quota"
      });
    }

    await item.save();

    await StockTransaction.create({
      itemId: item._id,
      action: "Quota",
      quantity,
      by,
      remarks: "Quota allocation"
    });

    res.status(200).json({ message: "Quota recorded successfully." });
  } catch (err) {
    console.error("Quota Error:", err);
    res.status(500).json({ message: "Error recording quota." });
  }
});

module.exports = router;
