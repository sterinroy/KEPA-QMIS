const express = require("express");
const router = express.Router();
const ItemCategory = require("../models/ItemCategory");
const { loggingMiddleware, logManualOperation } = require('../middleware/loggingMiddleware');

// Get categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await ItemCategory.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create or update category - WITH ENHANCED LOGGING
router.post("/categories", async (req, res) => {
  const { name, subcategory } = req.body;

  try {
    let category = await ItemCategory.findOne({ name });
    let isNewCategory = false;
    let originalCategory = null;

    if (category) {
      // Store original state for logging
      originalCategory = category.toObject();
      
      if (subcategory && !category.subcategories.includes(subcategory)) {
        category.subcategories.push(subcategory);
        await category.save();

        // Log subcategory addition
        await logManualOperation(
          req.user || { pen: 'system', name: 'System', role: 'SuperAdmin' },
          'category_update',
          'category',
          category._id.toString(),
          {
            before: originalCategory,
            after: category.toObject()
          },
          {
            description: `Subcategory '${subcategory}' added to category '${name}'`,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent')
          }
        );
      }
    } else {
      // Create new category
      isNewCategory = true;
      category = new ItemCategory({
        name,
        subcategories: subcategory ? [subcategory] : []
      });
      await category.save();

      // Log new category creation
      await logManualOperation(
        req.user || { pen: 'system', name: 'System', role: 'SuperAdmin' },
        'category_create',
        'category',
        category._id.toString(),
        {
          before: null,
          after: category.toObject()
        },
        {
          description: `New category created: '${name}'${subcategory ? ` with subcategory '${subcategory}'` : ''}`,
          ipAddress: req.ip,
          userAgent: req.get('User-Agent')
        }
      );
    }

    res.status(200).json({ 
      message: isNewCategory ? "Category created" : "Category updated", 
      category 
    });
  } catch (err) {
    // Log failed operation
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'system' },
      'category_create',
      'category',
      null,
      {},
      {
        description: `Failed to create/update category '${name}'`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        success: false,
        errorMessage: err.message
      }
    );
    
    res.status(500).json({ error: err.message });
  }
});

// Update category - WITH ENHANCED LOGGING
router.put("/categories", async (req, res) => {
  const { oldName, name, subcategory } = req.body;

  try {
    const category = await ItemCategory.findOne({ name: oldName });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Store original state for logging
    const originalCategory = category.toObject();

    if (name && name !== oldName) {
      category.name = name;
    }

    if (subcategory && !category.subcategories.includes(subcategory)) {
      category.subcategories.push(subcategory);
    }

    await category.save();

    // Log category update
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'SuperAdmin' },
      'category_update',
      'category',
      category._id.toString(),
      {
        before: originalCategory,
        after: category.toObject()
      },
      {
        description: `Category updated: '${oldName}'${name !== oldName ? ` renamed to '${name}'` : ''}${subcategory ? `, subcategory '${subcategory}' added` : ''}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    );

    res.status(200).json({ message: "Category updated", category });
  } catch (err) {
    // Log failed update
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'system' },
      'category_update',
      'category',
      null,
      {},
      {
        description: `Failed to update category '${oldName}'`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        success: false,
        errorMessage: err.message
      }
    );
    
    res.status(500).json({ error: err.message });
  }
});

// Delete category - WITH ENHANCED LOGGING
router.delete("/categories", async (req, res) => {
  const { name } = req.body;

  try {
    const category = await ItemCategory.findOne({ name });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Store data before deletion for logging
    const deletedCategory = category.toObject();
    
    await ItemCategory.findOneAndDelete({ name });

    // Log category deletion
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'SuperAdmin' },
      'category_delete',
      'category',
      category._id.toString(),
      {
        before: deletedCategory,
        after: null
      },
      {
        description: `Category deleted: '${name}' (had ${deletedCategory.subcategories.length} subcategories)`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    );

    res.status(200).json({ message: "Category deleted", name });
  } catch (err) {
    // Log failed deletion
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'system' },
      'category_delete',
      'category',
      null,
      {},
      {
        description: `Failed to delete category '${name}'`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        success: false,
        errorMessage: err.message
      }
    );
    
    res.status(500).json({ error: err.message });
  }
});

// Delete subcategory - WITH ENHANCED LOGGING
router.delete("/categories/subcategory", async (req, res) => {
  const { categoryName, subcategoryName } = req.body;

  try {
    const category = await ItemCategory.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (!category.subcategories.includes(subcategoryName)) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    // Store original state for logging
    const originalCategory = category.toObject();

    // Remove subcategory
    category.subcategories = category.subcategories.filter(sub => sub !== subcategoryName);
    await category.save();

    // Log subcategory deletion
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'SuperAdmin' },
      'category_update',
      'category',
      category._id.toString(),
      {
        before: originalCategory,
        after: category.toObject()
      },
      {
        description: `Subcategory '${subcategoryName}' removed from category '${categoryName}'`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    );

    res.status(200).json({ 
      message: "Subcategory deleted", 
      categoryName, 
      subcategoryName 
    });
  } catch (err) {
    // Log failed deletion
    await logManualOperation(
      req.user || { pen: 'system', name: 'System', role: 'system' },
      'category_update',
      'category',
      null,
      {},
      {
        description: `Failed to delete subcategory '${subcategoryName}' from category '${categoryName}'`,
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