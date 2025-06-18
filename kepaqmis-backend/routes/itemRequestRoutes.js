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

    const stockItem = await StockItem.findById(request.item._id);

    if (!approvedQty || approvedQty <= 0 || approvedQty > stockItem.quantity) {
      return res.status(400).json({ error: "Invalid approved quantity" });
    }

    stockItem.quantity -= approvedQty;
    await stockItem.save();

    request.status = "approved";
    request.approvedQty = approvedQty;
    request.approvedBy = { pen, name };
    request.approvedDate = new Date();

    await request.save();

    res.status(200).json({ message: "Request approved", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/item-requests/:id/return", async (req, res) => {
  try {
    const request = await ItemRequest.findById(req.params.id).populate("item");

    if (!request || !request.temporary || request.status !== "approved") {
      return res.status(400).json({ error: "Invalid return action" });
    }

    const stockItem = await StockItem.findById(request.item._id);
    const qtyToReturn = request.approvedQty || request.requestedQty;

    stockItem.quantity += qtyToReturn;
    await stockItem.save();

    request.status = "returned";
    request.returnDate = new Date();
    await request.save();

    res.status(200).json({ message: "Item returned", request });
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
