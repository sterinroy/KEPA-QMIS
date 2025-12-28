// Test Setup Configuration
// This file sets up the testing environment for the KEPA-QMIS backend

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

// Setup function to run before all tests
const setupTestDB = async () => {
  // Create an in-memory MongoDB instance
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Connect to the in-memory database
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Cleanup function to run after all tests
const teardownTestDB = async () => {
  // Close the database connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  
  // Stop the in-memory MongoDB instance
  if (mongoServer) {
    await mongoServer.stop();
  }
};

// Clear all test data between tests
const clearTestDB = async () => {
  const collections = mongoose.connection.collections;
  
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

// Create test user data
const createTestUser = (overrides = {}) => {
  return {
    pen: 'TEST001',
    name: 'Test User',
    phone: '+254700000000',
    password: 'TestPass123',
    role: 'User',
    approved: true,
    ...overrides
  };
};

// Create test admin user data
const createTestAdmin = (overrides = {}) => {
  return {
    pen: 'ADMIN001',
    name: 'Test Admin',
    phone: '+254700000001',
    password: 'AdminPass123',
    role: 'SuperAdmin',
    approved: true,
    ...overrides
  };
};

// Create test stock item data
const createTestStockItem = (overrides = {}) => {
  return {
    sourceType: 'purchase',
    orderNo: 'ORD001',
    itemName: 'Test Item',
    itemCategory: 'Test Category',
    itemSubCategory: 'Test Subcategory',
    quantity: 10,
    unit: 'pieces',
    make: 'Test Make',
    model: 'Test Model',
    serialNumber: 'SN001',
    perishable: false,
    dateOfPurchase: new Date(),
    dateOfVerification: new Date(),
    ...overrides
  };
};

// Create test category data
const createTestCategory = (overrides = {}) => {
  return {
    name: 'Test Category',
    subcategories: ['Subcategory 1', 'Subcategory 2'],
    ...overrides
  };
};

// Mock authentication middleware for testing
const mockAuthMiddleware = (user = null) => {
  return (req, res, next) => {
    req.user = user || createTestUser();
    next();
  };
};

// Mock admin authentication middleware for testing
const mockAdminAuthMiddleware = (admin = null) => {
  return (req, res, next) => {
    req.user = admin || createTestAdmin();
    next();
  };
};

// Helper function to generate JWT token for testing
const generateTestToken = (user) => {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
};

// Test database seeding functions
const seedTestData = async () => {
  const User = require('../models/User');
  const ItemCategory = require('../models/ItemCategory');
  const StockItem = require('../models/StockItem');
  const bcrypt = require('bcryptjs');
  
  // Create test users
  const hashedPassword = await bcrypt.hash('TestPass123', 10);
  
  const testUsers = [
    {
      ...createTestUser(),
      password: hashedPassword
    },
    {
      ...createTestAdmin(),
      password: hashedPassword
    },
    {
      pen: 'QM001',
      name: 'Quarter Master',
      phone: '+254700000002',
      password: hashedPassword,
      role: 'QuarterMasterPurchase',
      approved: true
    }
  ];
  
  await User.insertMany(testUsers);
  
  // Create test categories
  const testCategories = [
    createTestCategory({ name: 'Electronics' }),
    createTestCategory({ name: 'Furniture' }),
    createTestCategory({ name: 'Stationery' })
  ];
  
  await ItemCategory.insertMany(testCategories);
  
  // Create test stock items
  const testStockItems = [
    createTestStockItem({ itemName: 'Laptop', itemCategory: 'Electronics' }),
    createTestStockItem({ itemName: 'Desk', itemCategory: 'Furniture' }),
    createTestStockItem({ itemName: 'Pen', itemCategory: 'Stationery' })
  ];
  
  await StockItem.insertMany(testStockItems);
};

// Custom test matchers
const customMatchers = {
  toBeValidApiResponse: (received) => {
    const pass = received &&
      typeof received === 'object' &&
      typeof received.success === 'boolean' &&
      received.hasOwnProperty('timestamp') &&
      received.hasOwnProperty('path') &&
      received.hasOwnProperty('method');
    
    if (pass) {
      return {
        message: () => `Expected ${received} not to be a valid API response`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected ${received} to be a valid API response with success, timestamp, path, and method properties`,
        pass: false,
      };
    }
  },
  
  toBeSuccessResponse: (received) => {
    const pass = received &&
      received.success === true &&
      received.hasOwnProperty('data');
    
    if (pass) {
      return {
        message: () => `Expected ${received} not to be a success response`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected ${received} to be a success response with success: true and data property`,
        pass: false,
      };
    }
  },
  
  toBeErrorResponse: (received) => {
    const pass = received &&
      received.success === false &&
      received.hasOwnProperty('error');
    
    if (pass) {
      return {
        message: () => `Expected ${received} not to be an error response`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected ${received} to be an error response with success: false and error property`,
        pass: false,
      };
    }
  }
};

// Test utilities
const testUtils = {
  // Wait for a specified amount of time
  wait: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Generate random test data
  randomString: (length = 10) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },
  
  randomEmail: () => `test${testUtils.randomString(5)}@example.com`,
  
  randomPhone: () => `+25470${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
  
  // Validate response structure
  validateApiResponse: (response) => {
    expect(response).toHaveProperty('success');
    expect(response).toHaveProperty('timestamp');
    expect(response).toHaveProperty('path');
    expect(response).toHaveProperty('method');
    expect(typeof response.success).toBe('boolean');
  },
  
  validateSuccessResponse: (response, expectedData = null) => {
    testUtils.validateApiResponse(response);
    expect(response.success).toBe(true);
    expect(response).toHaveProperty('data');
    if (expectedData) {
      expect(response.data).toMatchObject(expectedData);
    }
  },
  
  validateErrorResponse: (response, expectedError = null) => {
    testUtils.validateApiResponse(response);
    expect(response.success).toBe(false);
    expect(response).toHaveProperty('error');
    if (expectedError) {
      expect(response.error).toBe(expectedError);
    }
  }
};

module.exports = {
  setupTestDB,
  teardownTestDB,
  clearTestDB,
  createTestUser,
  createTestAdmin,
  createTestStockItem,
  createTestCategory,
  mockAuthMiddleware,
  mockAdminAuthMiddleware,
  generateTestToken,
  seedTestData,
  customMatchers,
  testUtils
};

