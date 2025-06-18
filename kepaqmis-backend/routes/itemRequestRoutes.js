const express = require("express");
const router = express.Router();

const ItemRequest = require("../models/ItemRequest");
const ReturnItem = require("../models/ReturnItem");
const StockItem = require("../models/StockItem");

router.post("/item-requests", async (req, res) => {
  const { itemId, quantity, unit, temporary, user } = req.body;
  try {
    const request = new ItemRequest({
      item: itemId,
      requestedQty: quantity,
      unit,
      temporary,
      requestedBy: user
    });
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/item-requests/:id/approve", async (req, res) => {
  const { pen, name, approvedQty } = req.body;

  try {
    const request = await ItemRequest.findById(req.params.id).populate("item");
    if (!request || request.status !== "pending")
      return res.status(400).json({ error: "Invalid request" });

    const itemName = request.item.itemName;
    let qtyToFulfill = approvedQty;

    // Step 1: Find all stock items with same name and quantity > 0
    const stockSources = await StockItem.find({
      itemName: itemName,
      quantity: { $gt: 0 }
    }).sort({ dateOfPurchase: 1 }); // optional: FIFO

    if (!stockSources.length) {
      return res.status(400).json({ error: "No stock available for item." });
    }

    let totalAvailable = stockSources.reduce((sum, s) => sum + s.quantity, 0);
    if (qtyToFulfill > totalAvailable) {
      return res.status(400).json({ error: "Requested quantity exceeds total available stock." });
    }

    // Step 2: Loop and deduct from stock entries
    const issueLog = [];
    for (let stock of stockSources) {
      if (qtyToFulfill <= 0) break;

      const deductQty = Math.min(qtyToFulfill, stock.quantity);
      stock.quantity -= deductQty;
      await stock.save();

      // Optional: Log somewhere or return to frontend
      issueLog.push({
        stockItemId: stock._id,
        deductedQty: deductQty,
        sourceType: stock.sourceType,
      });
      request.issuedFrom = issueLog;

      qtyToFulfill -= deductQty;
    }

    // Step 3: Mark request as approved
    request.status = "approved";
    request.approvedQty = approvedQty;
    request.approvedBy = { pen, name };
    request.approvedDate = new Date();
    await request.save();

    res.status(200).json({ message: "Request approved and issued", request, issueLog });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/item-requests/:id/return", async (req, res) => {
  try {
    const request = await ItemRequest.findById(req.params.id).populate("issuedFrom.stockItemId");

    if (!request || !request.temporary || request.status !== "approved") {
      return res.status(400).json({ error: "Invalid return action" });
    }

    // Step 1: Restore quantities to each original stock entry
    for (const issued of request.issuedFrom) {
      const stock = await StockItem.findById(issued.stockItemId);
      if (stock) {
        stock.quantity += issued.deductedQty;
        await stock.save();
      }
    }

    // Step 2: Update request status
    request.status = "returned";
    request.returnDate = new Date();
    await request.save();

    res.status(200).json({ message: "Item returned successfully", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/item-requests/:id/reject", async (req, res) => {
  const { pen, name } = req.body; // QM details

  try {
    const request = await ItemRequest.findById(req.params.id);
    if (!request || request.status !== "pending") {
      return res.status(400).json({ error: "Invalid or already processed request" });
    }

    request.status = "rejected";
    request.approvedBy = { pen, name };
    request.approvedDate = new Date();

    await request.save();

    res.status(200).json({ message: "Request rejected", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





module.exports = router;
