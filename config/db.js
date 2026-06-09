// db.js - Connects the ShoppyGlobe API to MongoDB through Mongoose.

import mongoose from 'mongoose';

// connectDB is separated from server.js so the database setup stays reusable and easy to test.
const connectDB = async () => {
  try {
    // mongoose.connect opens the database connection using the URI stored in the .env file.
    const connection = await mongoose.connect(process.env.MONGO_URI);

    // This log confirms which MongoDB host accepted the connection.
    console.log(`MongoDB connected successfully: ${connection.connection.host}`);
  } catch (error) {
    // If the database connection fails, the API cannot safely handle requests.
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
