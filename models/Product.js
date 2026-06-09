// Product.js - Mongoose schema for products sold through the ShoppyGlobe store.

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    // name is required because every product must have a readable label in API responses.
    name: {
      type: String,
      required: [true, 'Product name is required.'],
      trim: true,
    },
    // price uses a minimum value of 0 so invalid negative prices cannot be saved.
    price: {
      type: Number,
      required: [true, 'Product price is required.'],
      min: [0, 'Price cannot be negative.'],
    },
    // description gives shoppers enough context to understand the product.
    description: {
      type: String,
      default: '',
      trim: true,
    },
    // stockQuantity tracks how many units are available for cart additions.
    stockQuantity: {
      type: Number,
      required: [true, 'Stock quantity is required.'],
      min: [0, 'Stock cannot be negative.'],
      default: 0,
    },
    // category is optional, but helps clients group products.
    category: {
      type: String,
      default: 'General',
      trim: true,
    },
    // imageUrl is optional because this backend-only assignment does not serve a frontend.
    imageUrl: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    // timestamps automatically adds createdAt and updatedAt to every product document.
    timestamps: true,
  },
);

const Product = mongoose.model('Product', productSchema);

export default Product;
