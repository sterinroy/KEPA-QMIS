const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase'); // Mongoose model

// GET /api/purchasestransfer
router.get('/', async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ invoice_date: -1 });
    res.json(purchases);
  } catch (err) {
    console.error('Error fetching purchases:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
