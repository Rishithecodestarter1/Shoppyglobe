// generate-secret.js - Generates a cryptographically secure JWT secret key.

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { error, info, label, success } from './utils/colorLog.js';

// SECRET_BYTES controls how much randomness goes into the secret.
const SECRET_BYTES = 64;

// __dirname is recreated here because ES Modules do not provide it automatically.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '.env');

// generateJwtSecret creates 64 random bytes and converts them into a hexadecimal string.
function generateJwtSecret() {
  // crypto.randomBytes(64) asks Node.js for 64 cryptographically secure random bytes.
  // .toString('hex') converts those bytes into 128 readable hexadecimal characters.
  return crypto.randomBytes(SECRET_BYTES).toString('hex');
}

// buildEnvContent replaces an existing JWT_SECRET line or appends one when it is missing.
function buildEnvContent(existingContent, secret) {
  const secretLine = `JWT_SECRET="${secret}"`;

  if (!existingContent.trim()) {
    return `${secretLine}\n`;
  }

  if (/^JWT_SECRET=.*$/m.test(existingContent)) {
    return existingContent.replace(/^JWT_SECRET=.*$/m, secretLine);
  }

  const ending = existingContent.endsWith('\n') ? '' : '\n';
  return `${existingContent}${ending}${secretLine}\n`;
}

const jwtSecret = generateJwtSecret();

try {
  label('[JWT Secret Utility]');
  success(`[SUCCESS] Your JWT secret (${SECRET_BYTES} bytes hex):`);
  success(jwtSecret);
  info('[INFO] Copy this value into JWT_SECRET in your .env file.');

  // The generated secret is also written to .env so the project can use it immediately.
  const currentEnvContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
  const nextEnvContent = buildEnvContent(currentEnvContent, jwtSecret);

  fs.writeFileSync(envPath, nextEnvContent, 'utf8');
  success('[SUCCESS] .env has been created or updated with JWT_SECRET.');
} catch (writeError) {
  error(`[ERROR] Could not write JWT_SECRET to .env: ${writeError.message}`);
  process.exitCode = 1;
}
