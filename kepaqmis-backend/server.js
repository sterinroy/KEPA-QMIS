require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;
const tempStockRoutes = require('./routes/tempstock.js');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/superadmin', require('./routes/superadmin'));
app.use('/api/tempstock', tempStockRoutes); 

// Catch-all for unmatched routes
app.use((req, res, next) => {
  console.log(`⚠️  Unmatched route: ${req.method} ${req.originalUrl}`);
  res.status(404).send('Route not found');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => console.error("❌ MongoDB error:", err));
