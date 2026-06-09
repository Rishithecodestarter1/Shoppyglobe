// authController.js - Handles user registration and login for the ShoppyGlobe API.

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// createToken signs the user's id into a JWT so private routes can identify the user later.
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// registerUser validates new account data, hashes the password, saves the user, and returns a token.
export const registerUser = async (req, res, next) => {
  try {
    // Destructuring pulls the expected fields from the JSON request body.
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Username, email, and password are required.',
      });
    }

    if (!username.trim()) {
      return res.status(400).json({
        message: 'Username cannot be empty.',
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Please provide a valid email address.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long.',
      });
    }

    // Checking duplicates before create gives a friendly 409 Conflict instead of a raw MongoDB error.
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.trim() }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: 'A user with this email or username already exists.',
      });
    }

    // Salt rounds of 12 make bcrypt deliberately slow enough to resist brute-force password attacks.
    const hashedPassword = await bcryptjs.hash(password, 12);

    const user = await User.create({
      username: username.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const token = createToken(user._id);

    return res.status(201).json({
      message: 'Registration successful.',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    // Passing errors to next lets the global error handler format one consistent JSON response.
    next(error);
  }
};

// loginUser verifies credentials and returns a signed JWT for future protected requests.
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required.',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    // The model method compares the entered password with the stored bcrypt hash.
    const passwordMatches = await user.matchPassword(password);

    if (!passwordMatches) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    const token = createToken(user._id);

    return res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
