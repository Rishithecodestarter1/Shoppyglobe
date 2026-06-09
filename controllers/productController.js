// productController.js - Handles public product browsing requests for ShoppyGlobe.

import mongoose from 'mongoose';
import Product from '../models/Product.js';

// getProducts returns every product in the database for catalog browsing.
export const getProducts = async (req, res, next) => {
  try {
    // Product.find({}) with an empty filter fetches all product documents.
    const products = await Product.find({});

    return res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// getProductById returns one product document by its MongoDB ObjectId.
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // ObjectId validation prevents user-friendly requests like "abc" from becoming Mongoose CastErrors.
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid product ID format.',
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found.',
      });
    }

    return res.status(200).json({
      product,
    });
  } catch (error) {
    next(error);
  }
};
