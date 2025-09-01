const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const Log = require("../models/Log");
const authMiddleware = require("../middleware/authMiddleware");

// Register
router.post("/register", async (req, res) => {
  const { pen, name, phone, password, role } = req.body;

  try {
    const existing = await User.findOne({ pen });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({ pen, name, phone, password: hashed, role });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { pen, password } = req.body;

  try {
    const user = await User.findOne({ pen });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    if (!user.approved) {
      return res.status(403).json({ msg: "Your registration is pending approval" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    // ✅ log with required fields
    await Log.create({
      pen: user.pen,
      name: user.name,
      role: user.role,
      action: "login",
      resourceType: "user",
      resourceId: user._id.toString(),
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      description: "User logged in",
      success: true
    });

    res.json({
      token,
      role: user.role,
      pen: user.pen,
      name: user.name,
      userId: user._id.toString()
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Logout
router.post("/logout", authMiddleware, async (req, res) => {
  try {
    if (req.user) {
      // Valid user logout
      const { pen, name, role, id } = req.user;

      await Log.create({
        pen,
        name,
        role,
        action: "logout",
        resourceType: "auth_session",   // ✅ matches enum
        resourceId: id,                 // ✅ required for login/logout
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        description: "User logged out",
        success: true
      });

      return res.status(200).json({ msg: "Logout logged successfully" });
    } else {
      // Invalid/malformed token logout attempt
      await Log.create({
        pen: "unknown",
        name: "unknown",
        role: "unknown",
        action: "logout",
        resourceType: "auth_session",   // ✅ still valid enum
        resourceId: "invalid",          // ✅ required, provide placeholder
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        description: "Logout attempt with invalid or missing token",
        success: false
      });


      return res.status(200).json({ msg: "Logout attempt logged (invalid token)" });
    }
  } catch (error) {
    console.error("Logout logging error:", error);
    res.status(500).json({ msg: "Failed to log logout" });
  }
});

module.exports = router;
