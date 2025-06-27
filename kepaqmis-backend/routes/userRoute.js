const express = require("express");
const router = express.Router();

const ItemRequest = require("../models/ItemRequest");

//view user requsts by pen no
router.get('/my-issued-items/:pen', async (req, res) => {
  try {
    const userPen = req.params.pen;

    const issuedItems = await ItemRequest.find({
      "requestedBy.pen": userPen,
      // status: "approved",
      // temporary: false
    }).populate("item");

    res.status(200).json(issuedItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/my-issued-items/:id/permanent-return", async (req, res) => {
  const { id } = req.params;
  const { quantity, dateOfReturn, reason, penNo, name } = req.body;

  try {
    const itemRequest = await ItemRequest.findById(id);
    if (!itemRequest) {
      return res.status(404).json({ error: "Issued item not found" });
    }

    if (itemRequest.status !== "approved") {
      return res.status(400).json({ error: "Item not eligible for return" });
    }

    itemRequest.status = "returned";
    itemRequest.returnDate = dateOfReturn;
    itemRequest.remarks = reason;

    await itemRequest.save();

    res.status(200).json({ message: "Return request recorded successfully", item: itemRequest });
  } catch (err) {
    console.error("Return request error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//this is to get the list
router.get("/returns/pending-verification", async (req, res) => {
  try {
    const pendingReturns = await ItemRequest.find({
      status: "pending",
      // returnCategory: { $exists: false }
    }).populate({
      path: "item",
      populate: [
        { path: "officeId", model: "Office" },
        { path: "categoryId", model: "ItemCategory" },
        { path: "subcategoryId", model: "SubCategory" }
      ]
    });

    res.status(200).json(pendingReturns);
  } catch (err) {
    console.error("Error fetching pending return verifications:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//this is to view all items which is permantly returned
router.get("/returns/permanent-verified", async (req, res) => {
  try {
    const verifiedReturns = await ItemRequest.find({
      status: "returned",
      returnCategory: { $in: ["Reusable", "Damaged", "Repairable"] }
    }).populate("item");

    res.status(200).json(verifiedReturns);
  } catch (err) {
    console.error("Error fetching verified returned items:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.post("/qm/verify-return/:id", async (req, res) => {
  const { id } = req.params;
  const {
    processedBy,
    technicalReportRequired,
    technicalWing,
    technicalReportNo,
    returnCategory,
  } = req.body;

  try {
    const itemRequest = await ItemRequest.findById(id).populate("item");
    if (!itemRequest || itemRequest.status !== "returned") {
      return res.status(400).json({ error: "Invalid return request" });
    }
    itemRequest.technicalReportRequired = technicalReportRequired;
    if (technicalReportRequired) {
      itemRequest.technicalWing = technicalWing;
      itemRequest.technicalReportNo = technicalReportNo;
    }
    itemRequest.returnCategory = returnCategory;
    await itemRequest.save();
    res.json({ message: "Item return processed successfully" });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;
