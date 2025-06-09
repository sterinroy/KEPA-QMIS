const express = require("express");
const router = express.Router();

const StockItem = require("../models/StockItem");
const StockTransaction = require("../models/StockTransaction");
const TemporaryIssue = require("../models/TemporaryIssue");

// TEMPORARY ISSUE
router.post("/issue/temp", async (req, res) => {
  try {
    const { itemId, quantity, user, expectedReturnDate, remarks, admin } = req.body;

    const item = await StockItem.findById(itemId);
    if (!item || item.quantity < quantity) {
      return res.status(400).json({ message: "Item not found or insufficient stock" });
    }

    // Decrease stock
    item.quantity -= quantity;
    await item.save();

    // Log transaction
    await StockTransaction.create({
      itemId: item._id,
      action: "TempIssue",
      quantity,
      toUser: user,
      by: admin,
      timestamp: new Date(),
      remarks,
    });

    // Add to temporaryIssues
    await TemporaryIssue.create({
      itemId: item._id,
      itemName: item.itemName,
      user,
      quantity,
      issueDate: new Date(),
      expectedReturnDate,
      status: "Issued",
    });

    res.status(200).json({ message: "Temporary issue recorded successfully." });
  } catch (error) {
    console.error("Temp Issue Error:", error);
    res.status(500).json({ message: "Server error in temp issue." });
  }
});

// TEMPORARY RETURN
router.post("/return/temp", async (req, res) => {
  try {
    const { tempIssueId, admin, remarks } = req.body;

    const tempIssue = await TemporaryIssue.findById(tempIssueId);
    if (!tempIssue || tempIssue.status !== "Issued") {
      return res.status(404).json({ message: "Temporary issue not found or already returned." });
    }

    const item = await StockItem.findById(tempIssue.itemId);
    if (!item) {
      return res.status(404).json({ message: "Stock item not found." });
    }

    // Increase stock
    item.quantity += tempIssue.quantity;
    await item.save();

    // Log return transaction
    await StockTransaction.create({
      itemId: item._id,
      action: "TempReturn",
      quantity: tempIssue.quantity,
      toUser: tempIssue.user,
      by: admin,
      timestamp: new Date(),
      remarks: remarks || "Returned after temporary use",
    });

    // Update status
    tempIssue.status = "Returned";
    await tempIssue.save();

    res.status(200).json({ message: "Temporary return recorded successfully." });
  } catch (error) {
    console.error("Temp Return Error:", error);
    res.status(500).json({ message: "Server error in temp return." });
  }
});

module.exports = router;
