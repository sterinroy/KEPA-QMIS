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

router.put("/categories", async (req, res) => {
  const { oldName, name, subcategory } = req.body;

  try {
    const category = await ItemCategory.findOne({ name: oldName });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (name && name !== oldName) {
      category.name = name;
    }

    if (subcategory && !category.subcategories.includes(subcategory)) {
      category.subcategories.push(subcategory);
    }

    await category.save();
    res.status(200).json({ message: "Category updated", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/categories", async (req, res) => {
  const { name } = req.body;

  try {
    const deleted = await ItemCategory.findOneAndDelete({ name });

    if (!deleted) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted", name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
