// server.js - Entry point for the ShoppyGlobe API. It configures Express, connects to MongoDB, registers routes, and handles errors.

import dotenv from 'dotenv';

// dotenv.config() must run before this file reads process.env values.
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

// Connect to MongoDB before the server accepts incoming API requests.
await connectDB();

const app = express();

// express.json() lets Express read JSON request bodies sent from ThunderClient or any frontend.
app.use(express.json());

// cors() allows browser-based frontends hosted on another origin to call this API.
app.use(cors());

// This health-check route confirms that the server process is running.
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'ShoppyGlobe API is running. Use /api/products to view products.',
  });
});

// Auth routes handle registering and logging in users.
app.use('/api/auth', authRoutes);

// Product routes are public because browsing products does not require login.
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
