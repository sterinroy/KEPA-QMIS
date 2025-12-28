// Authentication Routes Test Suite
const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../server'); // Adjust path to your server file
const User = require('../models/User');
const {
  setupTestDB,
  teardownTestDB,
  clearTestDB,
  createTestUser,
  testUtils
} = require('./test-setup');

// Setup test database
beforeAll(async () => {
  await setupTestDB();
});

afterAll(async () => {
  await teardownTestDB();
});

beforeEach(async () => {
  await clearTestDB();
});

describe('Authentication Routes', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = createTestUser({
        pen: 'NEW001',
        name: 'New User',
        phone: '+254700000001'
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      testUtils.validateSuccessResponse(response.body);
      expect(response.body.message).toBe('User registered successfully');

      // Verify user was created in database
      const user = await User.findOne({ pen: userData.pen });
      expect(user).toBeTruthy();
      expect(user.name).toBe(userData.name);
      expect(user.approved).toBe(false); // Should be false by default
    });

    it('should hash the password before saving', async () => {
      const userData = createTestUser({
        pen: 'HASH001',
        password: 'PlainPassword123'
      });

      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      const user = await User.findOne({ pen: userData.pen });
      expect(user.password).not.toBe(userData.password);
      
      // Verify password is properly hashed
      const isValidPassword = await bcrypt.compare(userData.password, user.password);
      expect(isValidPassword).toBe(true);
    });

    it('should reject registration with duplicate PEN', async () => {
      const userData = createTestUser({ pen: 'DUP001' });

      // Create first user
      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      // Try to create duplicate
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      testUtils.validateErrorResponse(response.body);
      expect(response.body.message).toBe('User already exists');
    });

    it('should validate required fields', async () => {
      const incompleteData = {
        pen: 'INCOMPLETE001',
        name: 'Incomplete User'
        // Missing phone, password, role
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(incompleteData)
        .expect(400);

      testUtils.validateErrorResponse(response.body);
      expect(response.body.error).toBe('Validation failed');
      expect(response.body.details).toBeInstanceOf(Array);
      expect(response.body.details.length).toBeGreaterThan(0);
    });

    it('should validate password strength', async () => {
      const userData = createTestUser({
        pen: 'WEAK001',
        password: 'weak' // Too weak password
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      testUtils.validateErrorResponse(response.body);
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'password',
            message: expect.stringContaining('Password must contain')
          })
        ])
      );
    });

    it('should validate email format for phone', async () => {
      const userData = createTestUser({
        pen: 'PHONE001',
        phone: 'invalid-phone'
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      testUtils.validateErrorResponse(response.body);
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'phone',
            message: expect.stringContaining('valid phone number')
          })
        ])
      );
    });

    it('should validate role enum', async () => {
      const userData = createTestUser({
        pen: 'ROLE001',
        role: 'InvalidRole'
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      testUtils.validateErrorResponse(response.body);
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'role',
            message: expect.stringContaining('must be one of')
          })
        ])
      );
    });
  });

  describe('POST /api/auth/login', () => {
    let testUser;

    beforeEach(async () => {
      // Create and save a test user
      const hashedPassword = await bcrypt.hash('TestPass123', 10);
      testUser = new User({
        ...createTestUser({
          pen: 'LOGIN001',
          password: hashedPassword,
          approved: true
        })
      });
      await testUser.save();
    });

    it('should login successfully with valid credentials', async () => {
      const loginData = {
        pen: 'LOGIN001',
        password: 'TestPass123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('role', testUser.role);
      expect(response.body).toHaveProperty('pen', testUser.pen);
      expect(response.body).toHaveProperty('name', testUser.name);
      expect(typeof response.body.token).toBe('string');
    });

    it('should reject login with invalid PEN', async () => {
      const loginData = {
        pen: 'INVALID001',
        password: 'TestPass123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(400);

      expect(response.text).toBe('Invalid credentials');
    });

    it('should reject login with invalid password', async () => {
      const loginData = {
        pen: 'LOGIN001',
        password: 'WrongPassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(400);

      expect(response.text).toBe('Invalid credentials');
    });

    it('should reject login for unapproved user', async () => {
      // Create unapproved user
      const hashedPassword = await bcrypt.hash('TestPass123', 10);
      const unapprovedUser = new User({
        ...createTestUser({
          pen: 'UNAPPROVED001',
          password: hashedPassword,
          approved: false
        })
      });
      await unapprovedUser.save();

      const loginData = {
        pen: 'UNAPPROVED001',
        password: 'TestPass123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(403);

      testUtils.validateErrorResponse(response.body);
      expect(response.body.message).toBe('Your registration is pending approval');
    });

    it('should validate required login fields', async () => {
      const incompleteData = {
        pen: 'LOGIN001'
        // Missing password
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(incompleteData)
        .expect(400);

      testUtils.validateErrorResponse(response.body);
      expect(response.body.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'password',
            message: expect.stringContaining('required')
          })
        ])
      );
    });

    it('should create login log entry', async () => {
      const EnhancedLog = require('../models/Log'); // Assuming you've updated the model
      
      const loginData = {
        pen: 'LOGIN001',
        password: 'TestPass123'
      };

      await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      // Check if log entry was created
      const logEntry = await EnhancedLog.findOne({
        pen: 'LOGIN001',
        action: 'login'
      });

      expect(logEntry).toBeTruthy();
      expect(logEntry.resourceType).toBe('auth_session');
      expect(logEntry.success).toBe(true);
    });
  });

  describe('POST /api/auth/logout', () => {
    let testUser;
    let authToken;

    beforeEach(async () => {
      // Create and save a test user
      const hashedPassword = await bcrypt.hash('TestPass123', 10);
      testUser = new User({
        ...createTestUser({
          pen: 'LOGOUT001',
          password: hashedPassword,
          approved: true
        })
      });
      await testUser.save();

      // Login to get token
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          pen: 'LOGOUT001',
          password: 'TestPass123'
        });

      authToken = loginResponse.body.token;
    });

    it('should logout successfully with valid token', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      testUtils.validateSuccessResponse(response.body);
      expect(response.body.message).toBe('Logout logged successfully');
    });

    it('should reject logout without token', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .expect(401);

      testUtils.validateErrorResponse(response.body);
      expect(response.body.error).toBe('Unauthorized');
    });

    it('should reject logout with invalid token', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      testUtils.validateErrorResponse(response.body);
      expect(response.body.error).toBe('Invalid token');
    });

    it('should create logout log entry', async () => {
      const EnhancedLog = require('../models/Log');
      
      await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Check if log entry was created
      const logEntry = await EnhancedLog.findOne({
        pen: 'LOGOUT001',
        action: 'logout'
      });

      expect(logEntry).toBeTruthy();
      expect(logEntry.resourceType).toBe('auth_session');
      expect(logEntry.success).toBe(true);
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limiting on login attempts', async () => {
      const loginData = {
        pen: 'RATE001',
        password: 'WrongPassword'
      };

      // Make multiple failed login attempts
      const promises = [];
      for (let i = 0; i < 6; i++) {
        promises.push(
          request(app)
            .post('/api/auth/login')
            .send(loginData)
        );
      }

      const responses = await Promise.all(promises);
      
      // First 5 should be 400 (invalid credentials)
      // 6th should be 429 (rate limited)
      const rateLimitedResponse = responses.find(res => res.status === 429);
      expect(rateLimitedResponse).toBeTruthy();
      
      testUtils.validateErrorResponse(rateLimitedResponse.body);
      expect(rateLimitedResponse.body.error).toBe('Too many requests');
    });
  });
});

// Custom test matchers
expect.extend({
  toBeValidJWT(received) {
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
    const pass = jwtRegex.test(received);
    
    if (pass) {
      return {
        message: () => `Expected ${received} not to be a valid JWT`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected ${received} to be a valid JWT`,
        pass: false,
      };
    }
  }
});

