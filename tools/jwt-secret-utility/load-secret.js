// load-secret.js - Loads and exports a validated JWT secret for use in other modules.

import dotenv from 'dotenv';
import { error } from './utils/colorLog.js';
import { validateSecret } from './utils/secretValidation.js';

// dotenv.config({ quiet: true }) loads .env without printing dotenv's own non-RGB status messages.
dotenv.config({ quiet: true });

// loadJwtSecret reads JWT_SECRET and throws a descriptive error if it is missing or weak.
export function loadJwtSecret() {
  const jwtSecret = process.env.JWT_SECRET;
  const result = validateSecret(jwtSecret);

  if (!result.valid) {
    const details = result.problems.join(' ');
    const message = `JWT_SECRET is not configured safely. ${details}`;

    error(`[ERROR] ${message}`);
    throw new Error(message);
  }

  return jwtSecret.trim();
}

// jwtSecret is exported as a ready-to-use string for simple imports.
export const jwtSecret = loadJwtSecret();
