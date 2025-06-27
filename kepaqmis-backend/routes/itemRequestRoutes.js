const express = require("express");
const router = express.Router();

const ItemRequest = require("../models/ItemRequest");
const StockItem = require("../models/StockItem");

router.post("/item-requests", async (req, res) => {
  const { itemId, quantity, unit, temporary, user, extra } = req.body;

  try {
    const request = new ItemRequest({
      item: itemId,
      requestedQty: quantity,
      unit,
      temporary,
      requestedBy: user,
      remarks: ` ${extra.purpose || ""}`,
      dateOfrequest: extra.dateOfrequest,
      toWhom: extra.toWhom,
      slNo: extra.slNo,
      mobile: extra.mobile
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

    const stockSources = await StockItem.find({
      itemName: itemName,
      quantity: { $gt: 0 }
    }).sort({ dateOfPurchase: 1 }); 

    if (!stockSources.length) {
      return res.status(400).json({ error: "No stock available for item." });
    }

    let totalAvailable = stockSources.reduce((sum, s) => sum + s.quantity, 0);
    if (qtyToFulfill > totalAvailable) {
      return res.status(400).json({ error: "Requested quantity exceeds total available stock." });
    }

    const issueLog = [];
    for (let stock of stockSources) {
      if (qtyToFulfill <= 0) break;

      const deductQty = Math.min(qtyToFulfill, stock.quantity);
      stock.quantity -= deductQty;
      await stock.save();

      issueLog.push({
        stockItemId: stock._id,
        deductedQty: deductQty,
        sourceType: stock.sourceType,
      });
      request.issuedFrom = issueLog;

      qtyToFulfill -= deductQty;
    }

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

    for (const issued of request.issuedFrom) {
      const stock = await StockItem.findById(issued.stockItemId);
      if (stock) {
        stock.quantity += issued.deductedQty;
        await stock.save();
      }
    }

    request.status = "returned";
    request.returnDate = new Date();
    await request.save();

    res.status(200).json({ message: "Item returned successfully", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/item-requests/:id/reject", async (req, res) => {
  const { pen, name } = req.body; 
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

router.patch("/item-requests/:id", async (req, res) => {
  try {
    const { indentBillId } = req.body;
    const request = await ItemRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ error: "Request not found" });

    request.indentBillId = indentBillId;
    await request.save();

    res.status(200).json({ message: "Indent bill linked", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark repaired item as reintegrated
router.post("/qm/readd-to-stock/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const request = await ItemRequest.findById(id).populate("item");
    if (!request || request.returnCategory !== "Repairable") {
      return res.status(400).json({ error: "Invalid item" });
    }

    const stock = await StockItem.findById(request.item._id);
    if (stock) {
      stock.quantity += request.quantity;
      await stock.save();
    }

    request.status = "reintegrated";
    await request.save();

    res.json({ message: "Item readded to stock successfully" });
  } catch (err) {
    console.error("Reintegration error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
