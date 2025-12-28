const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Log = require('../models/Log'); 
const { loggingMiddleware, logManualOperation } = require('../middleware/loggingMiddleware');

// Middleware to verify super admin role
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

// Approve a user - WITH ENHANCED LOGGING
router.patch('/approve/:id', verifySuperAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Store original user data for logging
    const originalUser = user.toObject();

    if (user.role === 'QuarterMaster') {
      if (!role || !['QuarterMasterPurchase', 'QuarterMasterIssue', 'QuarterMasterACQM'].includes(role)) {
        return res.status(400).json({ msg: 'Valid QuarterMaster role required' });
      }
      user.role = role; // overwrite QuarterMaster with specific role
    }

    user.approved = true;
    await user.save();

    // Manual logging for user approval
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'SuperAdmin' },
      'user_approve',
      'user',
      user._id.toString(),
      {
        before: originalUser,
        after: user.toObject()
      },
      {
        description: `User ${user.name} (${user.pen}) approved with role ${user.role}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    );

    res.json({ msg: 'User approved' });
  } catch (err) {
    // Log failed approval attempt
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'SuperAdmin' },
      'user_approve',
      'user',
      req.params.id,
      {},
      {
        description: `Failed to approve user ${req.params.id}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        success: false,
        errorMessage: err.message
      }
    );
    
    res.status(500).json({ msg: 'Server error' });
  }
});

// Reject (delete) a user - WITH ENHANCED LOGGING
router.delete('/reject/:id', verifySuperAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Store user data before deletion for logging
    const deletedUser = user.toObject();
    
    await User.findByIdAndDelete(req.params.id);

    // Manual logging for user rejection
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'SuperAdmin' },
      'user_reject',
      'user',
      req.params.id,
      {
        before: deletedUser,
        after: null
      },
      {
        description: `User registration rejected and deleted: ${deletedUser.name} (${deletedUser.pen})`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    );

    res.json({ msg: 'User rejected and deleted' });
  } catch (err) {
    // Log failed rejection attempt
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'SuperAdmin' },
      'user_reject',
      'user',
      req.params.id,
      {},
      {
        description: `Failed to reject user ${req.params.id}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        success: false,
        errorMessage: err.message
      }
    );
    
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

// Delete user - WITH ENHANCED LOGGING
router.delete('/delete-user/:id', verifySuperAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Store user data before deletion for logging
    const deletedUser = user.toObject();
    
    await User.findByIdAndDelete(req.params.id);

    // Manual logging for user deletion
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'SuperAdmin' },
      'user_delete',
      'user',
      req.params.id,
      {
        before: deletedUser,
        after: null
      },
      {
        description: `User deleted: ${deletedUser.name} (${deletedUser.pen})`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    );

    res.json({ msg: "User deleted" });
  } catch (err) {
    // Log failed deletion attempt
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'SuperAdmin' },
      'user_delete',
      'user',
      req.params.id,
      {},
      {
        description: `Failed to delete user ${req.params.id}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        success: false,
        errorMessage: err.message
      }
    );
    
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get enhanced logs with filtering and pagination
router.get("/logs", verifySuperAdmin, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 50,
      action,
      resourceType,
      pen,
      startDate,
      endDate,
      success
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (action) filter.action = action;
    if (resourceType) filter.resourceType = resourceType;
    if (pen) filter.pen = pen;
    if (success !== undefined) filter.success = success === 'true';
    
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }

    // Execute query with pagination
    const logs = await Log.find(filter)
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total count for pagination
    const total = await Log.countDocuments(filter);

    res.json({
      logs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching logs" });
  }
});

// Get log statistics
router.get("/logs/stats", verifySuperAdmin, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Build date filter
    const dateFilter = {};
    if (startDate || endDate) {
      dateFilter.timestamp = {};
      if (startDate) dateFilter.timestamp.$gte = new Date(startDate);
      if (endDate) dateFilter.timestamp.$lte = new Date(endDate);
    }

    // Aggregate statistics
    const stats = await Log.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: null,
          totalOperations: { $sum: 1 },
          successfulOperations: {
            $sum: { $cond: [{ $eq: ["$success", true] }, 1, 0] }
          },
          failedOperations: {
            $sum: { $cond: [{ $eq: ["$success", false] }, 1, 0] }
          },
          uniqueUsers: { $addToSet: "$pen" },
          actionBreakdown: {
            $push: "$action"
          },
          resourceBreakdown: {
            $push: "$resourceType"
          }
        }
      },
      {
        $project: {
          totalOperations: 1,
          successfulOperations: 1,
          failedOperations: 1,
          uniqueUserCount: { $size: "$uniqueUsers" },
          successRate: {
            $multiply: [
              { $divide: ["$successfulOperations", "$totalOperations"] },
              100
            ]
          }
        }
      }
    ]);

    // Get action breakdown
    const actionStats = await Log.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: "$action",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Get resource breakdown
    const resourceStats = await Log.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: "$resourceType",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      overview: stats[0] || {
        totalOperations: 0,
        successfulOperations: 0,
        failedOperations: 0,
        uniqueUserCount: 0,
        successRate: 0
      },
      actionBreakdown: actionStats,
      resourceBreakdown: resourceStats
    });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching log statistics" });
  }
});

// Get user activity summary
router.get("/logs/user-activity", verifySuperAdmin, async (req, res) => {
  try {
    const { startDate, endDate, limit = 10 } = req.query;
    
    // Build date filter
    const dateFilter = {};
    if (startDate || endDate) {
      dateFilter.timestamp = {};
      if (startDate) dateFilter.timestamp.$gte = new Date(startDate);
      if (endDate) dateFilter.timestamp.$lte = new Date(endDate);
    }

    const userActivity = await Log.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: {
            pen: "$pen",
            name: "$name",
            role: "$role"
          },
          totalOperations: { $sum: 1 },
          successfulOperations: {
            $sum: { $cond: [{ $eq: ["$success", true] }, 1, 0] }
          },
          failedOperations: {
            $sum: { $cond: [{ $eq: ["$success", false] }, 1, 0] }
          },
          lastActivity: { $max: "$timestamp" },
          actions: { $addToSet: "$action" }
        }
      },
      {
        $project: {
          pen: "$_id.pen",
          name: "$_id.name",
          role: "$_id.role",
          totalOperations: 1,
          successfulOperations: 1,
          failedOperations: 1,
          lastActivity: 1,
          actionCount: { $size: "$actions" },
          successRate: {
            $multiply: [
              { $divide: ["$successfulOperations", "$totalOperations"] },
              100
            ]
          }
        }
      },
      { $sort: { totalOperations: -1 } },
      { $limit: parseInt(limit) }
    ]);

    res.json(userActivity);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching user activity" });
  }
});

module.exports = router;