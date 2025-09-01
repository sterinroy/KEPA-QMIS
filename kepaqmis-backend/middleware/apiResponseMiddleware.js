// Standardized API Response Middleware
// This middleware ensures all API responses follow a consistent format

const responseFormatter = (req, res, next) => {
  // Store original res.json method
  const originalJson = res.json;
  
  // Override res.json to format responses consistently
  res.json = function(data) {
    let formattedResponse;
    
    // If data is already in our standard format, use it as-is
    if (data && typeof data === 'object' && data.hasOwnProperty('success')) {
      formattedResponse = data;
    } else {
      // Format the response according to our standard
      formattedResponse = {
        success: res.statusCode < 400,
        data: res.statusCode < 400 ? data : null,
        error: res.statusCode >= 400 ? (data?.error || 'An error occurred') : null,
        message: data?.message || data?.msg || null,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        method: req.method
      };
      
      // Add pagination info if present
      if (data?.totalPages || data?.currentPage || data?.total) {
        formattedResponse.pagination = {
          currentPage: data.currentPage || 1,
          totalPages: data.totalPages || 1,
          total: data.total || 0,
          hasNext: data.currentPage < data.totalPages,
          hasPrev: data.currentPage > 1
        };
      }
      
      // Add metadata if present
      if (data?.metadata) {
        formattedResponse.metadata = data.metadata;
      }
    }
    
    return originalJson.call(this, formattedResponse);
  };
  
  // Add helper methods to res object
  res.success = function(data, message = null, statusCode = 200) {
    res.status(statusCode);
    return res.json({
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    });
  };
  
  res.error = function(error, message = null, statusCode = 500, details = null) {
    res.status(statusCode);
    return res.json({
      success: false,
      error,
      message,
      details,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    });
  };
  
  res.paginated = function(data, pagination, message = null, statusCode = 200) {
    res.status(statusCode);
    return res.json({
      success: true,
      data,
      message,
      pagination: {
        currentPage: pagination.currentPage || 1,
        totalPages: pagination.totalPages || 1,
        total: pagination.total || 0,
        limit: pagination.limit || 10,
        hasNext: pagination.currentPage < pagination.totalPages,
        hasPrev: pagination.currentPage > 1
      },
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    });
  };
  
  next();
};

// Standard response templates
const responses = {
  // Success responses
  success: {
    created: (data, message = 'Resource created successfully') => ({
      success: true,
      data,
      message,
      statusCode: 201
    }),
    
    updated: (data, message = 'Resource updated successfully') => ({
      success: true,
      data,
      message,
      statusCode: 200
    }),
    
    deleted: (message = 'Resource deleted successfully') => ({
      success: true,
      data: null,
      message,
      statusCode: 200
    }),
    
    retrieved: (data, message = 'Resource retrieved successfully') => ({
      success: true,
      data,
      message,
      statusCode: 200
    }),
    
    listed: (data, pagination = null, message = 'Resources retrieved successfully') => ({
      success: true,
      data,
      message,
      pagination,
      statusCode: 200
    })
  },
  
  // Error responses
  error: {
    badRequest: (message = 'Bad request', details = null) => ({
      success: false,
      error: 'Bad Request',
      message,
      details,
      statusCode: 400
    }),
    
    unauthorized: (message = 'Unauthorized access') => ({
      success: false,
      error: 'Unauthorized',
      message,
      statusCode: 401
    }),
    
    forbidden: (message = 'Access forbidden') => ({
      success: false,
      error: 'Forbidden',
      message,
      statusCode: 403
    }),
    
    notFound: (resource = 'Resource', message = null) => ({
      success: false,
      error: 'Not Found',
      message: message || `${resource} not found`,
      statusCode: 404
    }),
    
    conflict: (message = 'Resource already exists') => ({
      success: false,
      error: 'Conflict',
      message,
      statusCode: 409
    }),
    
    validation: (details, message = 'Validation failed') => ({
      success: false,
      error: 'Validation Error',
      message,
      details,
      statusCode: 422
    }),
    
    tooManyRequests: (message = 'Too many requests', retryAfter = null) => ({
      success: false,
      error: 'Too Many Requests',
      message,
      retryAfter,
      statusCode: 429
    }),
    
    internal: (message = 'Internal server error') => ({
      success: false,
      error: 'Internal Server Error',
      message,
      statusCode: 500
    }),
    
    serviceUnavailable: (message = 'Service temporarily unavailable') => ({
      success: false,
      error: 'Service Unavailable',
      message,
      statusCode: 503
    })
  }
};

// Helper function to create consistent API responses
const createResponse = (type, subtype, ...args) => {
  if (responses[type] && responses[type][subtype]) {
    return responses[type][subtype](...args);
  }
  throw new Error(`Invalid response type: ${type}.${subtype}`);
};

// Middleware to add response helpers to req object
const addResponseHelpers = (req, res, next) => {
  req.responses = responses;
  req.createResponse = createResponse;
  next();
};

// Standard HTTP status codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
};

module.exports = {
  responseFormatter,
  responses,
  createResponse,
  addResponseHelpers,
  HTTP_STATUS
};

