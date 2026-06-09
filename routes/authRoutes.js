// authRoutes.js - Defines the public registration and login endpoints for users.

import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/register creates a new user account and returns a JWT.
router.post('/register', registerUser);

// POST /api/auth/login verifies an existing user and returns a JWT.
router.post('/login', loginUser);

export default router;
