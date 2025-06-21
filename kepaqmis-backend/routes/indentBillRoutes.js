const express = require("express");
const router = express.Router();
const IndentBill = require("../models/IndentBill");

router.post("/", async (req, res) => {
  try {
    const bill = new IndentBill(req.body);
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json({ error: "Failed to save indent bill" });
  }
});

router.get("/user/:pen", async (req, res) => {
  try {
    const bills = await IndentBill.find({ "createdBy.pen": req.params.pen });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch indent bills" });
  }
});

module.exports = router;
