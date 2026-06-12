// verify-secret.js - Validates that JWT_SECRET exists and is strong enough for application use.

import dotenv from 'dotenv';
import { error, info, label, success, warning } from './utils/colorLog.js';
import { GENERATED_SECRET_LENGTH, validateSecret } from './utils/secretValidation.js';

// dotenv.config({ quiet: true }) reads .env without printing dotenv's own non-RGB status messages.
dotenv.config({ quiet: true });

// process.env.JWT_SECRET is where Node.js stores the JWT secret after dotenv loads it.
const jwtSecret = process.env.JWT_SECRET;

label('[JWT Secret Verification]');

if (!jwtSecret) {
  error('[ERROR] JWT_SECRET was not found in .env or the current environment.');
  process.exit(1);
}

const result = validateSecret(jwtSecret);

if (!result.valid) {
  error('[ERROR] JWT_SECRET is not safe to use:');

  for (const problem of result.problems) {
    error(`- ${problem}`);
  }

  process.exit(1);
}

success('[SUCCESS] JWT_SECRET exists and meets the minimum safety requirements.');

if (result.recommendedFormat) {
  success(`[SUCCESS] JWT_SECRET uses the recommended ${GENERATED_SECRET_LENGTH}-character hex format.`);
} else {
  warning(`[WARNING] JWT_SECRET is valid, but this tool recommends a ${GENERATED_SECRET_LENGTH}-character hex secret.`);

  for (const warningMessage of result.warnings) {
    warning(`- ${warningMessage}`);
  }
}

info('[INFO] You can now use this secret for signing and verifying JWTs.');
