const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null; // allow downstream to handle
    return next();
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      req.user = null;
      return next();
    }

    req.user = {
      pen: user.pen,
      name: user.name,
      role: user.role,
      id: user._id
    };

    next();
  } catch (err) {
    console.error("JWT verify error:", err.message);
    req.user = null; // let route handle logging
    next();
  }
};

module.exports = authMiddleware;
