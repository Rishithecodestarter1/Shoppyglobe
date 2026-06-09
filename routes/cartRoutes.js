// cartRoutes.js - Defines protected shopping cart endpoints for logged-in users.

import express from 'express';
import { addToCart, removeCartItem, updateCartItem } from '../controllers/cartController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// router.use(protect) applies JWT authentication to every cart route in this file.
router.use(protect);

// POST /api/cart adds a product to the authenticated user's cart.
router.post('/', addToCart);

// PUT /api/cart/:productId updates quantity for a product already in the cart.
router.put('/:productId', updateCartItem);

// DELETE /api/cart/:productId removes a product from the cart.
router.delete('/:productId', removeCartItem);

export default router;
