const express = require("express");
const router = express.Router();
const StockItem = require("../models/StockItem");

router.get("/stock-dashboard", async (req, res) => {
  try {
    const all = await StockItem.find();
    const totalItems = all.length;
    const totalIssued = all.filter(i => i.dateOfIssue).length;
    const purchasedToday = all.filter(i => {
      const d = i.dateOfPurchase;
      if (!d) return false;
      const today = new Date();
      return d.toDateString() === today.toDateString();add.
    }).length;

    const byCategory = {};
    all.forEach(i => {
      byCategory[i.itemCategory] = (byCategory[i.itemCategory] || 0) + 1;
    });

    const since = new Date();
    since.setDate(since.getDate() - 6);
    const byDate = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date(since);
      d.setDate(since.getDate() + i);
      const key = d.toISOString().slice(0,10);
      byDate[key] = { issued: 0, purchased: 0 };
    }
    all.forEach(i => {
      const purchase = i.dateOfPurchase && i.dateOfPurchase.toISOString().slice(0,10);
      const issue = i.dateOfIssue && i.dateOfIssue.toISOString().slice(0,10);
      if (byDate[purchase]) byDate[purchase].purchased++;
      if (byDate[issue]) byDate[issue].issued++;
    });

    res.json({
      totals: { totalItems, totalIssued, purchasedToday },
      byCategory,
      byDate
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error computing stats");
  }
});

module.exports = router;
