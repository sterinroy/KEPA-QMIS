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

router.get("/:id", async (req, res) => {
  try {
    const bill = await IndentBill.findById(req.params.id);
    if (!bill) return res.status(404).json({ error: "Indent Bill not found" });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: "Error fetching Indent Bill" });
  }
});




module.exports = router;
