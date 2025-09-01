const mongoose = require("mongoose");

// Enhanced Log Schema for comprehensive CRUD operation logging
const logSchema = new mongoose.Schema({
  // User Information
  pen: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  
  // Action Information
  action: { 
    type: String, 
    enum: [
      // Authentication actions
      "login", 
      "logout",
      
      // User management actions
      "user_create", 
      "user_update", 
      "user_delete", 
      "user_approve", 
      "user_reject",
      
      // Stock management actions
      "stock_create", 
      "stock_update", 
      "stock_delete",
      "stock_approve",
      "purchase_entry_create",
      "purchase_entry_approve",
      "purchase_entry_reject",
      
      // Category management actions
      "category_create", 
      "category_update", 
      "category_delete",
      
      // Office management actions
      "office_create", 
      "office_update", 
      "office_delete",
      
      // Item request actions
      "item_request_create",
      "item_request_update", 
      "item_request_approve",
      "item_request_reject",
      "item_request_delete",
      
      // Indent bill actions
      "indent_bill_create",
      "indent_bill_update",
      "indent_bill_delete",
      
      // Return item actions
      "return_item_create",
      "return_item_update",
      "return_item_delete"
    ], 
    required: true 
  },
  
  // Resource Information
  resourceType: { 
    type: String, 
    enum: [
      "user", 
      "stock_item", 
      "purchase_entry", 
      "category", 
      "office", 
      "item_request", 
      "indent_bill", 
      "return_item",
      "auth_session"
    ]
  },
  
  resourceId: { 
    type: String, // Can be ObjectId string or other identifier
    default: null,
    required: function() {
      if (this.action === "login" || this.action === "logout") {
        return "auth_session";
    }
      return undefined;
    }
  },
  
  // Change Details
  changes: {
    before: { type: mongoose.Schema.Types.Mixed }, // Previous state
    after: { type: mongoose.Schema.Types.Mixed }   // New state
  },
  
  // Additional Context
  description: { type: String }, // Human-readable description
  ipAddress: { type: String },
  userAgent: { type: String },
  
  // Metadata
  timestamp: { type: Date, default: Date.now },
  success: { type: Boolean, default: true }, // Track failed operations
  errorMessage: { type: String } // Store error details if operation failed
});

// Indexes for better query performance
logSchema.index({ pen: 1, timestamp: -1 });
logSchema.index({ action: 1, timestamp: -1 });
logSchema.index({ resourceType: 1, resourceId: 1, timestamp: -1 });
logSchema.index({ timestamp: -1 });

module.exports = mongoose.model("Log", logSchema);