require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const purchaseTransferRoutes = require('./routes/purchasesTransfer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/superadmin', require('./routes/superadmin'));

const purchaseRoutes = require('./routes/purchaseRoutes');
app.use('/api/purchasestockdetailentry', purchaseRoutes);
app.use('/api/purchasestransfer', purchaseTransferRoutes);
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => console.error("❌ MongoDB error:", err));
