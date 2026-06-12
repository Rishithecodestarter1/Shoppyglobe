// app.js - Small demonstration showing how another Node.js file can load the JWT secret.

import { jwtSecret } from './load-secret.js';
import { info, success } from './utils/colorLog.js';

// This message proves the secret loaded and passed validation without exposing the secret itself.
success('[SUCCESS] Secret loaded successfully and is ready for JWT signing.');

// Showing only the length is safe and useful for confirming the generated 64-byte hex format.
info(`[INFO] Loaded JWT secret length: ${jwtSecret.length} characters.`);
