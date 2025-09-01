const express = require("express");
const router = express.Router();

const PurchaseEntry = require("../models/PurchaseEntry");
const StockItem = require("../models/StockItem");
const { loggingMiddleware, logManualOperation } = require('../middleware/loggingMiddleware');

// 1. Purchase Wing: Submit Purchase Entry - WITH LOGGING
router.post("/purchase/submit", loggingMiddleware.purchaseEntryCreate(), async (req, res) => {
  try {
    const { orderNo, entries } = req.body;
    const savedEntries = await Promise.all(
      entries.map((entryData) => {
        const entry = new PurchaseEntry({ ...entryData, orderNo });
        return entry.save();
      })
    );

    // Log each entry creation
    for (const entry of savedEntries) {
      await logManualOperation(
        req.user || { pen: 'system', name: 'System', role: 'system' },
        'purchase_entry_create',
        'purchase_entry',
        entry._id.toString(),
        {
          before: null,
          after: entry.toObject()
        },
        {
          description: `Purchase entry created for order ${orderNo}`,
          ipAddress: req.ip,
          userAgent: req.get('User-Agent')
        }
      );
    }

    res.status(201).json({ 
      message: "Purchase entries submitted.", 
      entries: savedEntries 
    });
  } catch (err) {
    // Log failed submission
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'system' },
      'purchase_entry_create',
      'purchase_entry',
      null,
      {},
      {
        description: `Failed to submit purchase entries for order ${req.body.orderNo}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        success: false,
        errorMessage: err.message
      }
    );
    
    res.status(500).json({ error: err.message });
  }
});

// 2. Purchase Wing: Get Pending Purchase Entries
router.get("/purchase/entries", async (req, res) => {
  try {
    const entries = await PurchaseEntry.find({ status: "Pending" });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Verification QM: Approve & Add to Stock - WITH ENHANCED LOGGING
router.post("/purchase/approve/:id", async (req, res) => {
  const totalStockItems = await StockItem.countDocuments();
  const nextStockItemNo = totalStockItems + 1;
  
  try {
    const { id } = req.params;
    const pendingPurchase = await PurchaseEntry.findById(id);
    
    if (!pendingPurchase || pendingPurchase.status !== "Pending") {
      return res.status(404).json({ message: "Invalid or already verified entry." });
    }

    // Store original purchase entry for logging
    const originalPurchaseEntry = pendingPurchase.toObject();

    const {
      orderNo, invoiceDate, supplyOrderNo, fromWhomPurchased, toWhom,
      billInvoiceNo, amount, Qmno, itemName, itemCategory, itemSubCategory,
      quantity, unit, warranty, typeofFund, make, model, modelNo,
      perishable, serialNumber, verifiedBy, amountType, amountDetails
    } = req.body;

    const stockItem = new StockItem({
      sourceType: "purchase",
      orderNo: orderNo || pendingPurchase.orderNo,
      invoiceDate: invoiceDate || pendingPurchase.invoiceDate,
      supplyOrderNo: supplyOrderNo || pendingPurchase.supplyOrderNo,
      fromWhomPurchased: fromWhomPurchased || pendingPurchase.fromWhomPurchased,
      toWhom: toWhom || pendingPurchase.toWhom,
      billInvoiceNo: billInvoiceNo || pendingPurchase.billInvoiceNo,
      amount: amount || pendingPurchase.amount,
      Qmno,
      itemName: pendingPurchase.itemName || itemName,
      itemCategory: pendingPurchase.itemCategory || itemCategory,
      itemSubCategory: pendingPurchase.itemSubCategory || itemSubCategory,
      quantity: pendingPurchase.quantity || quantity,
      unit: pendingPurchase.unit || unit,
      warranty,
      typeofFund,
      make,
      model,
      modelNo,
      perishable,
      enteredBy: pendingPurchase.enteredBy,
      serialNumber,
      dateOfVerification: new Date(),
      verifiedBy: typeof verifiedBy === "string" ? { pen: verifiedBy } : verifiedBy || pendingPurchase.verifiedBy,
      dateOfPurchase: pendingPurchase.invoiceDate,
      purchaseEntryId: pendingPurchase._id,
      amountType: amountType || pendingPurchase.amountType,
      amountDetails: amountDetails || pendingPurchase.amountDetails,
    });

    await stockItem.save();
    await PurchaseEntry.findByIdAndUpdate(id, { status: "Verified" });

    // Log purchase entry approval
    await logManualOperation(
      req.user || { pen: verifiedBy || 'system', name: 'System', role: 'QuarterMaster' },
      'purchase_entry_approve',
      'purchase_entry',
      id,
      {
        before: originalPurchaseEntry,
        after: { ...originalPurchaseEntry, status: 'Verified' }
      },
      {
        description: `Purchase entry approved and converted to stock item: ${itemName}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    );

    // Log stock item creation
    await logManualOperation(
      req.user || { pen: verifiedBy || 'system', name: 'System', role: 'QuarterMaster' },
      'stock_create',
      'stock_item',
      stockItem._id.toString(),
      {
        before: null,
        after: stockItem.toObject()
      },
      {
        description: `Stock item created from approved purchase: ${itemName} (Qty: ${quantity})`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    );

    res.status(200).json({
      message: "Purchase approved and added to stock.",
      stockItem,
      nextStockItemNo,
    });
  } catch (err) {
    // Log failed approval
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'system' },
      'purchase_entry_approve',
      'purchase_entry',
      req.params.id,
      {},
      {
        description: `Failed to approve purchase entry ${req.params.id}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        success: false,
        errorMessage: err.message
      }
    );
    
    res.status(500).json({ error: err.message });
  }
});

// 4. Verification QM: Requested Issue (no purchase) - WITH LOGGING
router.post("/stock/requested-issue", async (req, res) => {
  try {
    const stockItem = new StockItem({
      sourceType: "requested-issue",
      ...req.body,
      dateOfPurchase: req.body.dateOfPurchase ? new Date(req.body.dateOfPurchase) : new Date(),
      dateOfIssue: req.body.dateOfIssue ? new Date(req.body.dateOfIssue) : new Date(),
      dateOfVerification: req.body.dateOfVerification ? new Date(req.body.dateOfVerification) : new Date(),
    });

    await stockItem.save();

    // Log requested issue creation
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'QuarterMaster' },
      'stock_create',
      'stock_item',
      stockItem._id.toString(),
      {
        before: null,
        after: stockItem.toObject()
      },
      {
        description: `Requested issue stock item created: ${req.body.itemName}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    );

    res.status(201).json({ message: "Requested issue item added.", stockItem });
  } catch (err) {
    // Log failed creation
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'system' },
      'stock_create',
      'stock_item',
      null,
      {},
      {
        description: `Failed to create requested issue item: ${req.body.itemName}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        success: false,
        errorMessage: err.message
      }
    );
    
    res.status(500).json({ error: err.message });
  }
});

// 5. Verification QM: Direct Issue - WITH LOGGING
router.post("/stock/direct-issue", async (req, res) => {
  try {
    const stockItem = new StockItem({
      sourceType: "direct-issue",
      ...req.body,
      dateOfPurchase: req.body.dateOfPurchase ? new Date(req.body.dateOfPurchase) : new Date(),
      dateOfIssue: req.body.dateOfIssue ? new Date(req.body.dateOfIssue) : new Date(),
      dateOfVerification: req.body.dateOfVerification ? new Date(req.body.dateOfVerification) : new Date(),
    });

    await stockItem.save();

    // Log direct issue creation
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'QuarterMaster' },
      'stock_create',
      'stock_item',
      stockItem._id.toString(),
      {
        before: null,
        after: stockItem.toObject()
      },
      {
        description: `Direct issue stock item created: ${req.body.itemName}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    );

    res.status(201).json({ message: "Direct issue item added.", stockItem });
  } catch (err) {
    // Log failed creation
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'system' },
      'stock_create',
      'stock_item',
      null,
      {},
      {
        description: `Failed to create direct issue item: ${req.body.itemName}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        success: false,
        errorMessage: err.message
      }
    );
    
    res.status(500).json({ error: err.message });
  }
});

// Add direct entry - WITH LOGGING
router.post("/stock/add-direct-entry", async (req, res) => {
  try {
    const stockItem = new StockItem({
      ...req.body,
      dateOfVerification: req.body.dateOfVerification ? new Date(req.body.dateOfVerification) : new Date(),
      dateOfPurchase: req.body.dateOfPurchase ? new Date(req.body.dateOfPurchase) : new Date(),
      dateOfIssue: req.body.dateOfIssue ? new Date(req.body.dateOfIssue) : new Date(),
    });

    await stockItem.save();

    // Log direct entry creation
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'QuarterMaster' },
      'stock_create',
      'stock_item',
      stockItem._id.toString(),
      {
        before: null,
        after: stockItem.toObject()
      },
      {
        description: `Direct stock entry created: ${req.body.itemName}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    );

    res.status(201).json({ message: "Stock item added successfully", stockItem });
  } catch (err) {
    // Log failed creation
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'system' },
      'stock_create',
      'stock_item',
      null,
      {},
      {
        description: `Failed to create direct stock entry: ${req.body.itemName}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        success: false,
        errorMessage: err.message
      }
    );
    
    res.status(500).json({ error: err.message });
  }
});

// Get Stock Items
router.get("/stockitems", async (req, res) => {
  try {
    const stockItems = await StockItem.find().sort({ invoiceDate: -1 });
    res.status(200).json(stockItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update stock item - WITH LOGGING
router.put("/stockitems/:id", async (req, res) => {
  try {
    const stockItem = await StockItem.findById(req.params.id);
    if (!stockItem) {
      return res.status(404).json({ error: "Stock item not found" });
    }

    // Store original data for logging
    const originalData = stockItem.toObject();
    
    // Update the stock item
    const updatedStockItem = await StockItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Log stock item update
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'QuarterMaster' },
      'stock_update',
      'stock_item',
      req.params.id,
      {
        before: originalData,
        after: updatedStockItem.toObject()
      },
      {
        description: `Stock item updated: ${updatedStockItem.itemName}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    );

    res.status(200).json({ message: "Stock item updated successfully", stockItem: updatedStockItem });
  } catch (err) {
    // Log failed update
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'system' },
      'stock_update',
      'stock_item',
      req.params.id,
      {},
      {
        description: `Failed to update stock item ${req.params.id}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        success: false,
        errorMessage: err.message
      }
    );
    
    res.status(500).json({ error: err.message });
  }
});

// Delete stock item - WITH LOGGING
router.delete("/stockitems/:id", async (req, res) => {
  try {
    const stockItem = await StockItem.findById(req.params.id);
    if (!stockItem) {
      return res.status(404).json({ error: "Stock item not found" });
    }

    // Store data before deletion for logging
    const deletedData = stockItem.toObject();
    
    await StockItem.findByIdAndDelete(req.params.id);

    // Log stock item deletion
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'QuarterMaster' },
      'stock_delete',
      'stock_item',
      req.params.id,
      {
        before: deletedData,
        after: null
      },
      {
        description: `Stock item deleted: ${deletedData.itemName}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    );

    res.status(200).json({ message: "Stock item deleted successfully" });
  } catch (err) {
    // Log failed deletion
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'system' },
      'stock_delete',
      'stock_item',
      req.params.id,
      {},
      {
        description: `Failed to delete stock item ${req.params.id}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        success: false,
        errorMessage: err.message
      }
    );
    
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;