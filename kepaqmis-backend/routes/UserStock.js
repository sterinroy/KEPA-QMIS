const express = require("express");
const router = express.Router();

const UserRequest = require("../models/UserRequest");
const UserIssuedItem = require("../models/UserIssuedItem");
const ReturnItem = require("../models/ReturnItem");
const StockItem = require("../models/StockItem");

// 1️⃣ User requests an item
router.post("/request-item", async (req, res) => {
  try {
    const { user, itemId, quantity } = req.body;

    // Basic validation
    if (!user || !itemId || !quantity) return res.status(400).json({ message: "Missing required fields." });

    const stockItem = await StockItem.findById(itemId);
    if (!stockItem) return res.status(404).json({ message: "Stock item not found." });

    // Create request
    const newRequest = new UserRequest({ user, itemId, quantity });
    await newRequest.save();

    res.status(201).json({ message: "Request submitted, awaiting approval." });
  } catch (err) {
    console.error("Request Error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// 2️⃣ QM approves/rejects the request
router.post("/request-item/:id/approve", async (req, res) => {
  try {
    const { id } = req.params;
    const { approve, qm } = req.body; // qm = {pen, name}

    const request = await UserRequest.findById(id);
    if (!request) return res.status(404).json({ message: "Request not found." });
    if (request.status !== "Pending") return res.status(400).json({ message: "Request already processed." });

    if (approve) {
      const stockItem = await StockItem.findById(request.itemId);
      if (!stockItem) return res.status(404).json({ message: "Stock item not found." });

      if (stockItem.quantity < request.quantity)
        return res.status(400).json({ message: "Insufficient stock." });

      // Deduct stock quantity
      stockItem.quantity -= request.quantity;
      await stockItem.save();

      // Mark request approved
      request.status = "Approved";
      request.approvedAt = new Date();
      request.approvedBy = qm;
      await request.save();

      // Add to issued items for user
      let issuedItem = await UserIssuedItem.findOne({ user: request.user, itemId: request.itemId });
      if (issuedItem) {
        issuedItem.quantity += request.quantity;
        await issuedItem.save();
      } else {
        issuedItem = new UserIssuedItem({
          user: request.user,
          itemId: request.itemId,
          quantity: request.quantity,
        });
        await issuedItem.save();
      }

      res.json({ message: "Request approved and stock updated." });
    } else {
      // Reject request
      request.status = "Rejected";
      request.approvedAt = new Date();
      request.approvedBy = qm;
      await request.save();

      res.json({ message: "Request rejected." });
    }
  } catch (err) {
    console.error("Approval Error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// 3️⃣ User returns item
router.post("/return-item", async (req, res) => {
  try {
    const { user, itemId, quantity } = req.body;

    // Basic validation
    if (!user || !itemId || !quantity) return res.status(400).json({ message: "Missing required fields." });

    // Check user issued item quantity
    const issuedItem = await UserIssuedItem.findOne({ user, itemId });
    if (!issuedItem) return res.status(400).json({ message: "No issued item found for user." });
    if (issuedItem.quantity < quantity) return res.status(400).json({ message: "Return quantity exceeds issued quantity." });

    // Create return record with category = null (unprocessed)
    const returnRecord = new ReturnItem({
      user,
      itemId,
      quantity,
      category: null, // to be updated by QM later
    });

    await returnRecord.save();

    res.status(201).json({ message: "Return request submitted." });
  } catch (err) {
    console.error("Return Error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// 4️⃣ QM processes returned item (categorizes and updates stock accordingly)
router.post("/return-item/:id/process", async (req, res) => {
  try {
    const { id } = req.params;
    const { category, qm } = req.body; // qm = {pen, name}

    if (!["Damaged", "Repairable", "Reusable"].includes(category)) {
      return res.status(400).json({ message: "Invalid category." });
    }

    const returnRecord = await ReturnItem.findById(id);
    if (!returnRecord) return res.status(404).json({ message: "Return record not found." });
    if (returnRecord.category) return res.status(400).json({ message: "Return already processed." });

    const issuedItem = await UserIssuedItem.findOne({ user: returnRecord.user, itemId: returnRecord.itemId });
    if (!issuedItem) return res.status(404).json({ message: "Issued item not found for user." });

    if (issuedItem.quantity < returnRecord.quantity) {
      return res.status(400).json({ message: "Return quantity exceeds issued quantity." });
    }

    // Deduct issued quantity
    issuedItem.quantity -= returnRecord.quantity;
    if (issuedItem.quantity === 0) {
      await issuedItem.deleteOne();
    } else {
      await issuedItem.save();
    }

    // Process based on category
    if (category === "Reusable") {
      // Add back to stock
      const stockItem = await StockItem.findById(returnRecord.itemId);
      if (stockItem) {
        stockItem.quantity += returnRecord.quantity;
        await stockItem.save();
      }
    } else if (category === "Repairable") {
      // TODO: Could add to Repair collection (optional)
    } else if (category === "Damaged") {
      // TODO: Could log damaged items (optional)
    }

    returnRecord.category = category;
    returnRecord.processedBy = qm;
    returnRecord.processedAt = new Date();
    await returnRecord.save();

    res.json({ message: `Return processed as ${category}.` });
  } catch (err) {
    console.error("Process Return Error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
