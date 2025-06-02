const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Log = require('../models/Log');

// Middleware to verify super admin role - dummy check for now
const verifySuperAdmin = (req, res, next) => {
  // TODO: Replace with real auth & role check
  // Example: if (req.user.role !== 'SuperAdmin') return res.status(403).json({ msg: 'Forbidden' });
  next();
};

// Get all pending registrations
router.get('/pending-registrations', verifySuperAdmin, async (req, res) => {
  try {
    const pendingUsers = await User.find({ approved: false });
    res.json(pendingUsers);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Approve a user
router.patch('/approve/:id', verifySuperAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (user.role === 'QuarterMaster') {
      if (!role || !['QuarterMasterPurchase', 'QuarterMasterIssue', 'QuarterMasterACQM'].includes(role)) {
        return res.status(400).json({ msg: 'Valid QuarterMaster role required' });
      }
      user.role = role; // overwrite QuarterMaster with specific role
    }

    user.approved = true;
    await user.save();

    res.json({ msg: 'User approved' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


// Reject (delete) a user
router.delete('/reject/:id', verifySuperAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json({ msg: 'User rejected and deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all users for management page
router.get('/all-users', verifySuperAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


router.delete('/delete-user/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "User deleted" });
});

router.get("/logs", async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching logs" });
  }
});


module.exports = router;
