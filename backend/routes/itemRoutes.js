import express from 'express';
import {
    getItems,
    searchItems,
    createItem,
    updateItem,
    deleteItem
} from '../controllers/itemController.js';

const router = express.Router();

// Get all items
router.get('/', getItems);

// Search items
router.get('/search', searchItems);

// Create item
router.post('/', createItem);

// Update item
router.put('/:id', updateItem);

// Delete item
router.delete('/:id', deleteItem);

export default router; 