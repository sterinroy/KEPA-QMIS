const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'KEPA Quality Management Information System API',
    version: '1.0.0',
    description: 'API documentation for the Kenya Environmental Protection Agency Quality Management Information System',
    contact: {
      name: 'KEPA Development Team',
      email: 'dev@kepa.go.ke'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'http://localhost:5000/api',
      description: 'Development server'
    },
    {
      url: 'https://kepa-qmis-api.example.com/api',
      description: 'Production server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      // Standard API Response Schema
      ApiResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: 'Indicates if the request was successful'
          },
          data: {
            type: 'object',
            description: 'Response data (null for errors)'
          },
          error: {
            type: 'string',
            description: 'Error type (null for success)'
          },
          message: {
            type: 'string',
            description: 'Human-readable message'
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            description: 'Response timestamp'
          },
          path: {
            type: 'string',
            description: 'Request path'
          },
          method: {
            type: 'string',
            description: 'HTTP method'
          }
        }
      },
      
      // Paginated Response Schema
      PaginatedResponse: {
        allOf: [
          { $ref: '#/components/schemas/ApiResponse' },
          {
            type: 'object',
            properties: {
              pagination: {
                type: 'object',
                properties: {
                  currentPage: { type: 'integer' },
                  totalPages: { type: 'integer' },
                  total: { type: 'integer' },
                  limit: { type: 'integer' },
                  hasNext: { type: 'boolean' },
                  hasPrev: { type: 'boolean' }
                }
              }
            }
          }
        ]
      },
      
      // User Schema
      User: {
        type: 'object',
        required: ['pen', 'name', 'phone', 'password', 'role'],
        properties: {
          _id: {
            type: 'string',
            description: 'User ID'
          },
          pen: {
            type: 'string',
            description: 'Personal Employee Number',
            example: 'EMP001'
          },
          name: {
            type: 'string',
            description: 'Full name',
            example: 'John Doe'
          },
          phone: {
            type: 'string',
            description: 'Phone number',
            example: '+254700000000'
          },
          role: {
            type: 'string',
            enum: ['SuperAdmin', 'QuarterMaster', 'QuarterMasterPurchase', 'QuarterMasterIssue', 'QuarterMasterACQM', 'User'],
            description: 'User role'
          },
          approved: {
            type: 'boolean',
            description: 'Whether user is approved',
            default: false
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      },
      
      // User Registration Schema
      UserRegistration: {
        type: 'object',
        required: ['pen', 'name', 'phone', 'password', 'role'],
        properties: {
          pen: {
            type: 'string',
            description: 'Personal Employee Number',
            example: 'EMP001'
          },
          name: {
            type: 'string',
            description: 'Full name',
            example: 'John Doe'
          },
          phone: {
            type: 'string',
            description: 'Phone number',
            example: '+254700000000'
          },
          password: {
            type: 'string',
            description: 'Password (min 8 characters, must contain uppercase, lowercase, and number)',
            example: 'SecurePass123'
          },
          role: {
            type: 'string',
            enum: ['SuperAdmin', 'QuarterMaster', 'QuarterMasterPurchase', 'QuarterMasterIssue', 'QuarterMasterACQM', 'User'],
            description: 'User role'
          }
        }
      },
      
      // Login Schema
      LoginRequest: {
        type: 'object',
        required: ['pen', 'password'],
        properties: {
          pen: {
            type: 'string',
            description: 'Personal Employee Number',
            example: 'EMP001'
          },
          password: {
            type: 'string',
            description: 'Password',
            example: 'SecurePass123'
          }
        }
      },
      
      // Login Response Schema
      LoginResponse: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
            description: 'JWT token'
          },
          role: {
            type: 'string',
            description: 'User role'
          },
          pen: {
            type: 'string',
            description: 'Personal Employee Number'
          },
          name: {
            type: 'string',
            description: 'User name'
          }
        }
      },
      
      // Stock Item Schema
      StockItem: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          sourceType: {
            type: 'string',
            enum: ['purchase', 'requested-issue', 'direct-issue']
          },
          orderNo: { type: 'string' },
          supplyOrderNo: { type: 'string' },
          invoiceDate: { type: 'string', format: 'date' },
          billInvoiceNo: { type: 'string' },
          verifyDate: { type: 'string', format: 'date' },
          Qmno: { type: 'string' },
          itemName: { type: 'string' },
          itemCategory: { type: 'string' },
          itemSubCategory: { type: 'string' },
          quantity: { type: 'number' },
          unit: { type: 'string' },
          make: { type: 'string' },
          model: { type: 'string' },
          modelNo: { type: 'string' },
          fromWhomPurchased: { type: 'string' },
          toWhom: { type: 'string' },
          warranty: { type: 'number' },
          typeofFund: {
            type: 'string',
            enum: ['A', 'B', 'C']
          },
          amount: { type: 'number' },
          amountType: {
            type: 'string',
            enum: ['Cash', 'Credit']
          },
          serialNumber: { type: 'string' },
          perishable: { type: 'boolean' },
          dateOfPurchase: { type: 'string', format: 'date' },
          dateOfIssue: { type: 'string', format: 'date' },
          barcodeCode: { type: 'string' },
          barcodeImage: { type: 'string' }
        }
      },
      
      // Category Schema
      ItemCategory: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          subcategories: {
            type: 'array',
            items: { type: 'string' }
          }
        }
      },
      
      // Enhanced Log Schema
      EnhancedLog: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          pen: { type: 'string' },
          name: { type: 'string' },
          role: { type: 'string' },
          action: {
            type: 'string',
            enum: [
              'login', 'logout', 'user_create', 'user_update', 'user_delete',
              'user_approve', 'user_reject', 'stock_create', 'stock_update',
              'stock_delete', 'stock_approve', 'purchase_entry_create',
              'purchase_entry_approve', 'purchase_entry_reject',
              'category_create', 'category_update', 'category_delete',
              'office_create', 'office_update', 'office_delete'
            ]
          },
          resourceType: {
            type: 'string',
            enum: [
              'user', 'stock_item', 'purchase_entry', 'category',
              'office', 'item_request', 'indent_bill', 'return_item', 'auth_session'
            ]
          },
          resourceId: { type: 'string' },
          changes: {
            type: 'object',
            properties: {
              before: { type: 'object' },
              after: { type: 'object' }
            }
          },
          description: { type: 'string' },
          ipAddress: { type: 'string' },
          userAgent: { type: 'string' },
          timestamp: { type: 'string', format: 'date-time' },
          success: { type: 'boolean' },
          errorMessage: { type: 'string' }
        }
      },
      
      // Error Schema
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false
          },
          error: {
            type: 'string',
            example: 'Bad Request'
          },
          message: {
            type: 'string',
            example: 'Invalid input provided'
          },
          details: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: { type: 'string' },
                message: { type: 'string' }
              }
            }
          },
          timestamp: {
            type: 'string',
            format: 'date-time'
          },
          path: { type: 'string' },
          method: { type: 'string' }
        }
      }
    },
    responses: {
      BadRequest: {
        description: 'Bad Request',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' }
          }
        }
      },
      Unauthorized: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' }
          }
        }
      },
      Forbidden: {
        description: 'Forbidden',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' }
          }
        }
      },
      NotFound: {
        description: 'Not Found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' }
          }
        }
      },
      InternalServerError: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' }
          }
        }
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

// Options for swagger-jsdoc
const options = {
  definition: swaggerDefinition,
  apis: [
    './routes/*.js', // Path to the API files
    './models/*.js'  // Path to the model files
  ]
};

// Initialize swagger-jsdoc
const specs = swaggerJsdoc(options);

// Swagger UI options
const swaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true
  }
};

module.exports = {
  specs,
  swaggerUi,
  swaggerUiOptions
};

