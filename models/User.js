// User.js - Mongoose schema for registered ShoppyGlobe users with hashed passwords.

import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    // username is shown in responses and must be unique so accounts are easy to identify.
    username: {
      type: String,
      required: [true, 'Username is required.'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long.'],
    },
    // email is used for login, so it must be unique and stored in lowercase.
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'],
    },
    // password stores only the bcrypt hash, never the original plaintext password.
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: [6, 'Password must be at least 6 characters long.'],
    },
  },
  {
    // timestamps automatically adds createdAt and updatedAt to every user document.
    timestamps: true,
  },
);

// matchPassword compares a login password with the saved bcrypt hash without exposing the hash.
userSchema.methods.matchPassword = async function matchPassword(enteredPassword) {
  return bcryptjs.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
