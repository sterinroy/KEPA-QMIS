const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase'); // Mongoose model

router.post('/', async (req, res) => {
  try {
    const purchase = new Purchase(req.body);
    await purchase.save();
    res.status(200).json({ message: 'Purchase saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
