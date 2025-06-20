const express = require("express");
const router = express.Router();
const Item Category = require("../models/Item Category");

router.get("/categories", async (req, res) => {
  try {
    const categories = await Item Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/categories", async (req, res) => {
  const { name, Sub Category } = req.body;

  try {
    let itemCategory = await Item Category.findOne({ name });

    if (itemCategory) {
      if (
        Sub Category &&
        !itemCategory.subcategories.includes(Sub Category)
      ) {
        itemCategory.subcategories.push(Sub Category);
        await itemCategory.save();
      }
    } else {
      itemCategory = new Item Category({
        name,
        subcategories: Sub Category ? [Sub Category] : [],
      });
      await itemCategory.save();
    }

    res
      .status(200)
      .json({ message: "itemCategory updated/created", itemCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
