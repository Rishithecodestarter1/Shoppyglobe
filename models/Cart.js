// Cart.js - Mongoose schema for each user's shopping cart and its product items.

import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    // productId links this cart item back to the product collection.
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product id is required.'],
    },
    // quantity must stay at one or more because a cart item with zero units should not exist.
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
      min: [1, 'Quantity must be at least 1.'],
      default: 1,
    },
  },
  {
    // _id is disabled for item subdocuments because productId already identifies each cart item.
    _id: false,
  },
);

const cartSchema = new mongoose.Schema(
  {
    // user references the owner of the cart and unique enforces one cart per user.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Cart user is required.'],
      unique: true,
    },
    // items stores the products currently selected by the logged-in user.
    items: [cartItemSchema],
    // totalPrice is stored for convenience and recalculated by cart controllers after every change.
    totalPrice: {
      type: Number,
      min: [0, 'Total price cannot be negative.'],
      default: 0,
    },
  },
  {
    // timestamps adds createdAt and updatedAt, including when the cart changes.
    timestamps: true,
  },
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
