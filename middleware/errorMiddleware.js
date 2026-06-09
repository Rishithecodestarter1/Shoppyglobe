// errorMiddleware.js - Centralizes JSON error responses for unexpected Express route failures.

// notFound returns a clean JSON message when no registered route matches the request.
export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// errorHandler is recognized by Express as an error handler because it has four parameters.
export const errorHandler = (err, req, res, next) => {
  // Logging the stack trace helps developers debug server-side failures during local testing.
  console.error(err.stack);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  return res.status(statusCode).json({
    message: err.message || 'Internal server error.',
    // The stack is hidden in production so implementation details are not exposed publicly.
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
