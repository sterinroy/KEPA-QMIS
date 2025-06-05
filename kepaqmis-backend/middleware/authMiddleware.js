const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ 
        success: false,
        msg: "Authentication required. No token provided" 
      });
    }

    const token = authHeader.split(" ")[1];
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check token expiration
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ 
        success: false,
        msg: "Token has expired" 
      });
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ 
        success: false,
        msg: "User not found" 
      });
    }

    if (!user.isActive) {
      return res.status(403).json({ 
        success: false,
        msg: "User account is deactivated" 
      });
    }

    // Add more user info to request
    req.user = {
      id: user._id,
      pen: user.pen,
      name: user.name,
      role: user.role,
      isActive: user.isActive
    };

    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err);
    
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        msg: "Invalid token" 
      });
    }
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        msg: "Token has expired" 
      });
    }

    res.status(500).json({ 
      success: false,
      msg: "Authentication failed" 
    });
  }
};

module.exports = authMiddleware;
