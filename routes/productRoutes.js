// productRoutes.js - Defines public product catalog endpoints that do not require authentication.

import express from 'express';
import { getProductById, getProducts } from '../controllers/productController.js';

const router = express.Router();

// GET /api/products returns the full product catalog.
router.get('/', getProducts);

// GET /api/products/:id returns a single product by MongoDB id.
router.get('/:id', getProductById);

export default router;
