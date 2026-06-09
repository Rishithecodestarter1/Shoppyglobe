// authMiddleware.js - Protects private routes by validating JWT Bearer tokens.

import jwt from 'jsonwebtoken';

// protect checks whether the request has a valid token before it reaches a private controller.
const protect = (req, res, next) => {
  // The token should arrive in the Authorization header as "Bearer <token>".
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Access denied. No token provided.',
    });
  }

  // Splitting by space removes the "Bearer" label and leaves only the signed JWT string.
  const token = authHeader.split(' ')[1];

  try {
    // jwt.verify proves the token was signed with our secret and has not been tampered with.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Controllers use req.user.id so cart queries only affect the logged-in user's cart.
    req.user = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    // jsonwebtoken throws here for expired, malformed, or forged tokens.
    return res.status(401).json({
      message: 'Invalid or expired token.',
    });
  }
};

export default protect;
