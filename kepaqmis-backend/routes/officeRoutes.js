const express = require("express");
const router = express.Router();
const OfficeOption = require("../models/OfficeOption");

router.get("/offices", async (req, res) => {
  try {
    const offices = await OfficeOption.find().sort("name");
    res.json(offices.map(o => o.name));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/offices", async (req, res) => {
  try {
    const { list, name } = req.body;

    let added;

    if (Array.isArray(list)) {
      added = await OfficeOption.insertMany(list.map((n) => ({ name: n })));
    } else if (name) {
      const newOffice = new OfficeOption({ name });
      added = await newOffice.save();
    } else {
      return res.status(400).json({ error: "Invalid payload. Provide 'name' or 'list'." });
    }

    res.json(added);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/offices/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const deleted = await OfficeOption.findOneAndDelete({ name });
    if (!deleted) {
      return res.status(404).json({ error: "Office not found" });
    }
    res.json({ message: "Office deleted successfully", office: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
