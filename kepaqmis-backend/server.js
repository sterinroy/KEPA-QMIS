// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const dashboardRoutes = require('./routes/dashboardRoutes');
// const itemCategoryRoutes = require('./routes/itemCategoryRoutes'); 
// const ItemRequestRoutes = require('./routes/itemRequestRoutes');
// const userRoute = require('./routes/userRoute'); 
// const officeRoutes = require('./routes/officeRoutes'); 
// const indentBillRoutes = require('./routes/indentBillRoutes'); 

// const app = express();
// const PORT = process.env.PORT || 5000;



// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/superadmin', require('./routes/superadmin'));
// // app.use("/api", require("./routes/tempIssue"));
// app.use("/api/stockRoutes", require("./routes/stockRoutes"));
// // app.use("/api", require("./routes/userStockRoutes"));
// app.use('/api/dashboardRoutes', dashboardRoutes);
// app.use('/api/itemCategoryRoutes', itemCategoryRoutes);
// app.use('/api/itemRequestRoutes', ItemRequestRoutes);
// app.use('/api/userRoute', userRoute);
// app.use('/api/officeRoutes', officeRoutes);
// app.use("/api/indent-bills", require("./routes/indentBillRoutes"));


// app.use((req, res, next) => {
//   console.log(`⚠️  Unmatched route: ${req.method} ${req.originalUrl}`);
//   res.status(404).send('Route not found');
// });

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log("✅ MongoDB connected");
//   app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// }).catch(err => console.error("❌ MongoDB error:", err));


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboardRoutes');
const itemCategoryRoutes = require('./routes/itemCategoryRoutes'); 
const ItemRequestRoutes = require('./routes/itemRequestRoutes');
const userRoute = require('./routes/userRoute'); 
const officeRoutes = require('./routes/officeRoutes'); 
const indentBillRoutes = require('./routes/indentBillRoutes'); 

// Import security and middleware
const {
  rateLimiters,
  validateInput,
  validationRules,
  errorHandler,
  notFoundHandler,
  securityHeaders,
  sanitizeInput
} = require('./middleware/securityMiddleware');

const {
  responseFormatter,
  addResponseHelpers
} = require('./middleware/apiResponseMiddleware');

const { specs, swaggerUi, swaggerUiOptions } = require('./config/swaggerConfig');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for rate limiting and IP detection
app.set('trust proxy', 1);

// Security headers
app.use(securityHeaders);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] 
    : true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Input sanitization
app.use(sanitizeInput);

// Response formatting middleware
app.use(responseFormatter);
app.use(addResponseHelpers);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

// Health check endpoint
app.get('/health', (req, res) => {
  res.success({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  }, 'Service is healthy');
});

// API Routes with rate limiting and validation

// Authentication routes (strict rate limiting)
app.use('/api/auth', 
  rateLimiters.auth,
  authRoutes
);

// SuperAdmin routes (moderate rate limiting)
app.use('/api/superadmin', 
  rateLimiters.api,
  require('./routes/superadmin')
);

// Stock routes (moderate rate limiting)
app.use("/api/stockRoutes", 
  rateLimiters.api,
  require("./routes/stockRoutes")
);

// Dashboard routes (lenient rate limiting for read operations)
app.use('/api/dashboardRoutes', 
  rateLimiters.read,
  dashboardRoutes
);

// Category routes (moderate rate limiting)
app.use('/api/itemCategoryRoutes', 
  rateLimiters.api,
  itemCategoryRoutes
);

// Item request routes (moderate rate limiting)
app.use('/api/itemRequestRoutes', 
  rateLimiters.api,
  ItemRequestRoutes
);

// User routes (moderate rate limiting)
app.use('/api/userRoute', 
  rateLimiters.api,
  userRoute
);

// Office routes (moderate rate limiting)
app.use('/api/officeRoutes', 
  rateLimiters.api,
  officeRoutes
);

// Indent bill routes (moderate rate limiting)
app.use("/api/indent-bills", 
  rateLimiters.api,
  require("./routes/indentBillRoutes")
);

// 404 handler for unmatched routes
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// Database connection with retry logic
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      // bufferMaxEntries: 0, 
      bufferCommands: false, // Disable mongoose buffering
    });
    
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    
    // Start server only after successful DB connection
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
      console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
    });
    
    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully');
      server.close(() => {
        console.log('Process terminated');
        mongoose.connection.close();
      });
    });
    
    return server;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled Promise Rejection:', err.message);
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});

// Start the application
if (require.main === module) {
  connectDB();
}

module.exports = app;