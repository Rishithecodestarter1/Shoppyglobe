// seed.js - Inserts sample ShoppyGlobe products into MongoDB for API testing.

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/Product.js';

// dotenv.config() loads MONGO_URI so this standalone script can connect to the database.
dotenv.config();

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    price: 2499,
    description: 'Comfortable over-ear headphones with clear sound and long battery life.',
    stockQuantity: 30,
    category: 'Electronics',
    imageUrl: 'https://example.com/images/wireless-headphones.jpg',
  },
  {
    name: 'Mechanical Keyboard',
    price: 3799,
    description: 'Tactile mechanical keyboard with backlit keys for productive typing.',
    stockQuantity: 18,
    category: 'Computer Accessories',
    imageUrl: 'https://example.com/images/mechanical-keyboard.jpg',
  },
  {
    name: 'USB-C Hub',
    price: 1599,
    description: 'Compact USB-C hub with HDMI, USB 3.0, and SD card support.',
    stockQuantity: 45,
    category: 'Computer Accessories',
    imageUrl: 'https://example.com/images/usb-c-hub.jpg',
  },
  {
    name: 'Gaming Mouse',
    price: 1299,
    description: 'Ergonomic gaming mouse with adjustable DPI and programmable buttons.',
    stockQuantity: 52,
    category: 'Gaming',
    imageUrl: 'https://example.com/images/gaming-mouse.jpg',
  },
  {
    name: 'Smart Fitness Watch',
    price: 4999,
    description: 'Fitness watch with heart-rate tracking, sleep monitoring, and notifications.',
    stockQuantity: 25,
    category: 'Wearables',
    imageUrl: 'https://example.com/images/fitness-watch.jpg',
  },
  {
    name: 'Portable Bluetooth Speaker',
    price: 2199,
    description: 'Water-resistant portable speaker with rich sound for outdoor use.',
    stockQuantity: 34,
    category: 'Audio',
    imageUrl: 'https://example.com/images/bluetooth-speaker.jpg',
  },
];

const seedProducts = async () => {
  try {
    // Connecting inside the script lets it run independently from the Express server.
    await mongoose.connect(process.env.MONGO_URI);

    // Clearing old sample products prevents duplicate seed data after repeated runs.
    await Product.deleteMany({});

    const insertedProducts = await Product.insertMany(products);

    console.log(`Seed complete: inserted ${insertedProducts.length} products.`);
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    // Closing the connection allows the Node process to exit cleanly after seeding.
    await mongoose.disconnect();
  }
};

await seedProducts();
