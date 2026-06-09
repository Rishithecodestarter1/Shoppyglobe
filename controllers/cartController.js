// cartController.js - Handles all logged-in user cart operations for ShoppyGlobe.

import mongoose from 'mongoose';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// isValidObjectId keeps route handlers from sending malformed ids into Mongoose queries.
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// normalizeQuantity converts incoming JSON values to a number and applies the default quantity.
const normalizeQuantity = (quantity) => {
  if (quantity === undefined) {
    return 1;
  }

  return Number(quantity);
};

// calculateTotalPrice computes the cart total from the current product prices in MongoDB.
const calculateTotalPrice = async (items) => {
  let totalPrice = 0;

  // We read each product because the cart stores product ids, while prices live on product documents.
  for (const item of items) {
    const product = await Product.findById(item.productId);

    if (product) {
      totalPrice += product.price * item.quantity;
    }
  }

  return totalPrice;
};

// addToCart validates the product and quantity, then creates or updates the logged-in user's cart.
export const addToCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const quantity = normalizeQuantity(req.body.quantity);

    if (!productId || !isValidObjectId(productId)) {
      return res.status(400).json({
        message: 'A valid productId is required.',
      });
    }

    if (!Number.isFinite(quantity) || quantity < 1) {
      return res.status(400).json({
        message: 'Quantity must be a number greater than or equal to 1.',
      });
    }

    // The cart can only contain real products that already exist in the database.
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({
        message: 'Product not found. Cannot add a missing product to cart.',
      });
    }

    if (product.stockQuantity < quantity) {
      return res.status(400).json({
        message: 'Not enough stock available for the requested quantity.',
      });
    }

    // Each user gets exactly one cart, created the first time they add an item.
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [],
      });
    }

    // If the product is already present, increasing quantity preserves the existing cart selection.
    const existingItem = cart.items.find((item) => item.productId.toString() === productId);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (product.stockQuantity < newQuantity) {
        return res.status(400).json({
          message: 'Not enough stock available for the updated cart quantity.',
        });
      }

      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({
        productId,
        quantity,
      });
    }

    cart.totalPrice = await calculateTotalPrice(cart.items);
    await cart.save();

    return res.status(201).json({
      message: 'Product added to cart.',
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// updateCartItem changes the quantity for one product already in the logged-in user's cart.
export const updateCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const quantity = Number(req.body.quantity);

    if (!isValidObjectId(productId)) {
      return res.status(400).json({
        message: 'Invalid product ID format.',
      });
    }

    if (!Number.isFinite(quantity) || quantity < 1) {
      return res.status(400).json({
        message: 'Quantity must be a number greater than or equal to 1.',
      });
    }

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found for this user.',
      });
    }

    // We must find the exact cart item before updating so the API can return a clear 404.
    const item = cart.items.find((cartItem) => cartItem.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({
        message: 'This product is not in your cart.',
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found.',
      });
    }

    if (product.stockQuantity < quantity) {
      return res.status(400).json({
        message: 'Not enough stock available for the requested quantity.',
      });
    }

    item.quantity = quantity;
    cart.totalPrice = await calculateTotalPrice(cart.items);
    await cart.save();

    return res.status(200).json({
      message: 'Cart item quantity updated.',
      cart,
    });
  } catch (error) {
    next(error);
  }
};

// removeCartItem deletes one product from the logged-in user's cart but keeps the cart document.
export const removeCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({
        message: 'Invalid product ID format.',
      });
    }

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found for this user.',
      });
    }

    const itemExists = cart.items.some((item) => item.productId.toString() === productId);

    if (!itemExists) {
      return res.status(404).json({
        message: 'Product not found in your cart.',
      });
    }

    // Filtering creates a new items array without the removed product.
    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    cart.totalPrice = await calculateTotalPrice(cart.items);
    await cart.save();

    return res.status(200).json({
      message: 'Product removed from cart.',
      cart,
    });
  } catch (error) {
    next(error);
  }
};
