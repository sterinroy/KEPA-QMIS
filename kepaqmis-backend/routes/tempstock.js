const express = require('express');
const router = express.Router();
const TempStock = require('../models/temp');


router.post('/', async (req, res) => {
   

  console.log('Payload:', req.body);

  try {
    const newEntry = new TempStock(req.body);
    const saved = await newEntry.save();
    res.status(201).json({ message: 'Saved successfully', data: saved });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save', details: error });
  }
});


router.get('/', async (req, res) => {
  try {
    const record = await TempStock.find();
    res.json(record);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
