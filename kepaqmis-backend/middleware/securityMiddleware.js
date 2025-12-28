const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const validator = require('validator');
const mongoSanitize = require('express-mongo-sanitize');

// Rate limiting configurations
const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      error: 'Too many requests',
      message,
      retryAfter: Math.ceil(windowMs / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        error: 'Too many requests',
        message,
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }
  });
};

// Different rate limiters for different endpoints
const rateLimiters = {
  // Strict rate limiting for authentication endpoints
  auth: createRateLimiter(
    15 * 60 * 1000, // 15 minutes
    500, // 5 attempts
    'Too many authentication attempts. Please try again in 15 minutes.'
  ),
  
  // Moderate rate limiting for API endpoints
  api: createRateLimiter(
    15 * 60 * 1000, // 15 minutes
    100, // 100 requests
    'Too many API requests. Please try again in 15 minutes.'
  ),
  
  // Lenient rate limiting for read operations
  read: createRateLimiter(
    15 * 60 * 1000, // 15 minutes
    200, // 200 requests
    'Too many read requests. Please try again in 15 minutes.'
  )
};

// Input validation middleware
const validateInput = (validationRules) => {
  return (req, res, next) => {
    const errors = [];
    
    for (const field in validationRules) {
      const rules = validationRules[field];
      const value = req.body[field];
      
      // Check if required field is present
      if (rules.required && (!value || value.toString().trim() === '')) {
        errors.push({
          field,
          message: `${field} is required`
        });
        continue;
      }
      
      // Skip validation if field is not required and not present
      if (!rules.required && (!value || value.toString().trim() === '')) {
        continue;
      }
      
      // Type validation
      if (rules.type) {
        switch (rules.type) {
          case 'email':
            if (!validator.isEmail(value)) {
              errors.push({
                field,
                message: `${field} must be a valid email address`
              });
            }
            break;
          case 'phone':
            if (!validator.isMobilePhone(value, 'any')) {
              errors.push({
                field,
                message: `${field} must be a valid phone number`
              });
            }
            break;
          case 'alphanumeric':
            if (!validator.isAlphanumeric(value)) {
              errors.push({
                field,
                message: `${field} must contain only letters and numbers`
              });
            }
            break;
          case 'numeric':
            if (!validator.isNumeric(value.toString())) {
              errors.push({
                field,
                message: `${field} must be a number`
              });
            }
            break;
          case 'date':
            if (!validator.isISO8601(value)) {
              errors.push({
                field,
                message: `${field} must be a valid date`
              });
            }
            break;
        }
      }
      
      // Length validation
      if (rules.minLength && value.length < rules.minLength) {
        errors.push({
          field,
          message: `${field} must be at least ${rules.minLength} characters long`
        });
      }
      
      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push({
          field,
          message: `${field} must not exceed ${rules.maxLength} characters`
        });
      }
      
      // Custom validation
      if (rules.custom && typeof rules.custom === 'function') {
        const customResult = rules.custom(value);
        if (customResult !== true) {
          errors.push({
            field,
            message: customResult || `${field} is invalid`
          });
        }
      }
      
      // Enum validation
      if (rules.enum && !rules.enum.includes(value)) {
        errors.push({
          field,
          message: `${field} must be one of: ${rules.enum.join(', ')}`
        });
      }
    }
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Please check your input and try again',
        details: errors
      });
    }
    
    next();
  };
};

// Common validation rules
const validationRules = {
  // User registration validation
  userRegistration: {
    pen: {
      required: true,
      type: 'alphanumeric',
      minLength: 3,
      maxLength: 20
    },
    name: {
      required: true,
      minLength: 2,
      maxLength: 100,
      custom: (value) => {
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          return 'Name must contain only letters and spaces';
        }
        return true;
      }
    },
    phone: {
      required: true,
      type: 'phone'
    },
    password: {
      required: true,
      minLength: 8,
      custom: (value) => {
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        return true;
      }
    },
    role: {
      required: true,
      enum: ['SuperAdmin', 'QuarterMaster', 'QuarterMasterPurchase', 'QuarterMasterIssue', 'QuarterMasterACQM', 'User']
    }
  },
  
  // User login validation
  userLogin: {
    pen: {
      required: true,
      type: 'alphanumeric'
    },
    password: {
      required: true,
      minLength: 1
    }
  },
  
  // Stock item validation
  stockItem: {
    itemName: {
      required: true,
      minLength: 2,
      maxLength: 200
    },
    itemCategory: {
      required: true,
      minLength: 2,
      maxLength: 100
    },
    quantity: {
      required: true,
      type: 'numeric',
      custom: (value) => {
        const num = parseFloat(value);
        if (num <= 0) {
          return 'Quantity must be greater than 0';
        }
        return true;
      }
    },
    unit: {
      required: true,
      minLength: 1,
      maxLength: 20
    }
  },
  
  // Category validation
  category: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 100,
      custom: (value) => {
        if (!/^[a-zA-Z0-9\s\-_]+$/.test(value)) {
          return 'Category name can only contain letters, numbers, spaces, hyphens, and underscores';
        }
        return true;
      }
    }
  }
};

// Enhanced error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  
  // Default error response
  let error = {
    success: false,
    error: 'Internal server error',
    message: 'Something went wrong. Please try again later.'
  };
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    error = {
      success: false,
      error: 'Validation error',
      message: 'Please check your input and try again',
      details: Object.values(err.errors).map(e => ({
        field: e.path,
        message: e.message
      }))
    };
    return res.status(400).json(error);
  }
  
  if (err.name === 'CastError') {
    error = {
      success: false,
      error: 'Invalid ID format',
      message: 'The provided ID is not valid'
    };
    return res.status(400).json(error);
  }
  
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = {
      success: false,
      error: 'Duplicate entry',
      message: `${field} already exists`
    };
    return res.status(409).json(error);
  }
  
  if (err.name === 'JsonWebTokenError') {
    error = {
      success: false,
      error: 'Invalid token',
      message: 'Please log in again'
    };
    return res.status(401).json(error);
  }
  
  if (err.name === 'TokenExpiredError') {
    error = {
      success: false,
      error: 'Token expired',
      message: 'Your session has expired. Please log in again'
    };
    return res.status(401).json(error);
  }
  
  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).json(error);
  }
  
  // In development, provide more details
  error.details = {
    message: err.message,
    stack: err.stack
  };
  
  res.status(500).json(error);
};

// 404 handler
const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
};

// Security headers middleware
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

// Request sanitization middleware
const sanitizeInput = [
  mongoSanitize(), // Remove any keys that start with '$' or contain '.'
  (req, res, next) => {
    // Additional custom sanitization
    const sanitizeObject = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          // Remove potential XSS attempts
          obj[key] = obj[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
          obj[key] = obj[key].replace(/javascript:/gi, '');
          obj[key] = obj[key].replace(/on\w+\s*=/gi, '');
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          sanitizeObject(obj[key]);
        }
      }
    };
    
    if (req.body) sanitizeObject(req.body);
    if (req.query) sanitizeObject(req.query);
    if (req.params) sanitizeObject(req.params);
    
    next();
  }
];

module.exports = {
  rateLimiters,
  validateInput,
  validationRules,
  errorHandler,
  notFoundHandler,
  securityHeaders,
  sanitizeInput
};

