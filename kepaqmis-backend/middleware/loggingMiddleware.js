const Log = require('../models/Log'); // Adjust path as needed

/**
 * Logging middleware factory for CRUD operations
 * @param {string} resourceType - Type of resource being operated on
 * @param {string} action - Action being performed
 * @param {Object} options - Additional options for logging
 */
const createLoggingMiddleware = (resourceType, action, options = {}) => {
  return async (req, res, next) => {
    // Store original res.json to intercept response
    const originalJson = res.json;
    const originalSend = res.send;
    
    // Extract user info from request (assuming auth middleware sets req.user)
    const userInfo = req.user || {};
    
    // Capture request data for "before" state
    const requestData = {
      body: req.body,
      params: req.params,
      query: req.query
    };
    
    // Override res.json to capture response data
    res.json = function(data) {
      // Log the operation after successful response
      logOperation(req, res, data, resourceType, action, userInfo, requestData, options);
      return originalJson.call(this, data);
    };
    
    // Override res.send for non-JSON responses
    res.send = function(data) {
      // Log the operation after response
      logOperation(req, res, data, resourceType, action, userInfo, requestData, options);
      return originalSend.call(this, data);
    };
    
    next();
  };
};

/**
 * Log operation details
 */
async function logOperation(req, res, responseData, resourceType, action, userInfo, requestData, options) {
  try {
    // Skip logging if response indicates failure (unless we want to log failures)
    if (res.statusCode >= 400 && !options.logFailures) {
      return;
    }
    
    // Extract resource ID from various sources
    let resourceId = null;
    if (requestData.params.id) {
      resourceId = requestData.params.id;
    } else if (responseData && responseData._id) {
      resourceId = responseData._id;
    } else if (responseData && responseData.id) {
      resourceId = responseData.id;
    } else if (options.getResourceId) {
      resourceId = options.getResourceId(req, responseData);
    }
    
    // Prepare log entry
    const logEntry = {
      pen: userInfo.pen || 'system',
      name: userInfo.name || 'System',
      role: userInfo.role || 'system',
      action: action,
      resourceType: resourceType,
      resourceId: resourceId,
      description: options.description || `${action} operation on ${resourceType}`,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      timestamp: new Date(),
      success: res.statusCode < 400
    };
    
    // Add change details for update operations
    if (action.includes('update') || action.includes('approve') || action.includes('reject')) {
      logEntry.changes = {
        before: options.getBefore ? options.getBefore(req) : null,
        after: responseData
      };
    } else if (action.includes('create')) {
      logEntry.changes = {
        before: null,
        after: responseData
      };
    } else if (action.includes('delete')) {
      logEntry.changes = {
        before: options.getBefore ? options.getBefore(req) : requestData,
        after: null
      };
    }
    
    // Add error message for failed operations
    if (res.statusCode >= 400) {
      logEntry.success = false;
      logEntry.errorMessage = typeof responseData === 'string' ? responseData : 
                              (responseData && responseData.message) || 
                              `Operation failed with status ${res.statusCode}`;
    }
    
    // Save log entry
    await Log.create(logEntry);
    
  } catch (error) {
    console.error('Logging middleware error:', error);
    // Don't throw error to avoid breaking the main operation
  }
}

/**
 * Manual logging function for complex operations
 */
const logManualOperation = async (userInfo, action, resourceType, resourceId, changes = {}, additionalInfo = {}) => {
  try {
    const logEntry = {
      pen: userInfo.pen || 'system',
      name: userInfo.name || 'System',
      role: userInfo.role || 'system',
      action: action,
      resourceType: resourceType,
      resourceId: resourceId,
      changes: changes,
      description: additionalInfo.description || `${action} operation on ${resourceType}`,
      ipAddress: additionalInfo.ipAddress,
      userAgent: additionalInfo.userAgent,
      timestamp: new Date(),
      success: additionalInfo.success !== false
    };
    
    if (additionalInfo.errorMessage) {
      logEntry.errorMessage = additionalInfo.errorMessage;
      logEntry.success = false;
    }
    
    await Log.create(logEntry);
  } catch (error) {
    console.error('Manual logging error:', error);
  }
};

/**
 * Specific middleware functions for common operations
 */
const loggingMiddleware = {
  // User operations
  userCreate: () => createLoggingMiddleware('user', 'user_create', {
    description: 'New user registration',
    getResourceId: (req, res) => res._id || res.id
  }),
  
  userUpdate: () => createLoggingMiddleware('user', 'user_update', {
    description: 'User information updated'
  }),
  
  userDelete: () => createLoggingMiddleware('user', 'user_delete', {
    description: 'User account deleted'
  }),
  
  userApprove: () => createLoggingMiddleware('user', 'user_approve', {
    description: 'User registration approved'
  }),
  
  userReject: () => createLoggingMiddleware('user', 'user_reject', {
    description: 'User registration rejected'
  }),
  
  // Stock operations
  stockCreate: () => createLoggingMiddleware('stock_item', 'stock_create', {
    description: 'New stock item added'
  }),
  
  stockUpdate: () => createLoggingMiddleware('stock_item', 'stock_update', {
    description: 'Stock item updated'
  }),
  
  stockDelete: () => createLoggingMiddleware('stock_item', 'stock_delete', {
    description: 'Stock item deleted'
  }),
  
  purchaseEntryCreate: () => createLoggingMiddleware('purchase_entry', 'purchase_entry_create', {
    description: 'Purchase entry submitted'
  }),
  
  purchaseEntryApprove: () => createLoggingMiddleware('purchase_entry', 'purchase_entry_approve', {
    description: 'Purchase entry approved and added to stock'
  }),
  
  // Category operations
  categoryCreate: () => createLoggingMiddleware('category', 'category_create', {
    description: 'New category created'
  }),
  
  categoryUpdate: () => createLoggingMiddleware('category', 'category_update', {
    description: 'Category updated'
  }),
  
  categoryDelete: () => createLoggingMiddleware('category', 'category_delete', {
    description: 'Category deleted'
  }),
  
  // Office operations
  officeCreate: () => createLoggingMiddleware('office', 'office_create', {
    description: 'New office added'
  }),
  
  officeDelete: () => createLoggingMiddleware('office', 'office_delete', {
    description: 'Office deleted'
  })
};

module.exports = {
  createLoggingMiddleware,
  logManualOperation,
  loggingMiddleware
};

