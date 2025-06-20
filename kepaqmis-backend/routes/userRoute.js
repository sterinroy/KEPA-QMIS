const express = require("express");
const router = express.Router();

const ItemRequest = require("../models/ItemRequest");

// GET /my-issued-items/:pen
router.get('/my-issued-items/:pen', async (req, res) => {
  try {
    const userPen = req.params.pen;

    const issuedItems = await ItemRequest.find({
      "requestedBy.pen": userPen,
      status: "approved",
      temporary: false
    }).populate("item");

    res.status(200).json(issuedItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
