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
    // Check if user exists
    const existing = await User.findOne({ pen });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      pen,
      name,
      phone,
      password: hashed,
      role,
    });

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
  const user = await User.findOne({ pen });

  if (!user) return res.status(400).send("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send("Invalid credentials");

  if (!user.approved) {
    return res
      .status(403)
      .json({ msg: "Your registration is pending approval" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  await Log.create({
    pen: user.pen,
    name: user.name,
    role: user.role,
    action: "login",
  });

  res.json({ token, role: user.role, pen: user.pen });
});

router.post("/logout", authMiddleware, async (req, res) => {
  try {
    // console.log("Logout request from:", req.user);
    const { pen, name, role } = req.user;

    await Log.create({
      pen,
      name,
      role,
      action: "logout",
    });

    res.status(200).json({ msg: "Logout logged successfully" });
  } catch (error) {
    console.error("Logout logging error:", error);
    res.status(500).json({ msg: "Failed to log logout" });
  }
});

module.exports = router;
