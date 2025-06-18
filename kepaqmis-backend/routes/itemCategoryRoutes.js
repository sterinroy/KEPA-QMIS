const express = require("express");
const router = express.Router();
const ItemCategory = require("../models/ItemCategory");

router.get("/categories", async (req, res) => {
  try {
    const categories = await ItemCategory.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/categories", async (req, res) => {
  const { name, subcategory } = req.body;

  try {
    let category = await ItemCategory.findOne({ name });

    if (category) {
      if (subcategory && !category.subcategories.includes(subcategory)) {
        category.subcategories.push(subcategory);
        await category.save();
      }
    } else {
      category = new ItemCategory({
        name,
        subcategories: subcategory ? [subcategory] : []
      });
      await category.save();
    }

    res.status(200).json({ message: "Category updated/created", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
