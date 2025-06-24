const express = require("express");
const router = express.Router();
const IndentBill = require("../models/IndentBill");
const ItemRequest = require("../models/ItemRequest");

router.post("/", async (req, res) => {
  try {
    const bill = new IndentBill(req.body);
    const savedBill = await bill.save();

    const updateResult = await ItemRequest.updateMany(
      {
        "requestedBy.pen": savedBill.createdBy.pen,
        "dateOfrequest": savedBill.date,
        temporary: false,
        indentBillId: { $exists: false },
      },
      {
        $set: { indentBillId: savedBill._id }
      }
    );

    res.status(201).json({
      message: "Indent bill created and requests linked",
      bill: savedBill,
      linkedRequests: updateResult.modifiedCount,
    });
  } catch (err) {
    console.error("IndentBill Error:", err);
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

router.put("/link-bill-to-requests", async (req, res) => {
  const { pen, dateOfrequest, indentBillId } = req.body;

  try {
    const result = await ItemRequest.updateMany(
      {
        "requestedBy.pen": pen,
        "extra.dateOfrequest": dateOfrequest,
        temporary: false,
        indentBillId: { $exists: false },
      },
      { $set: { indentBillId } }
    );

    res.json({ updated: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: "Failed to link indent bill to item requests" });
  }
});





module.exports = router;
