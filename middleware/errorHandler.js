const { logger } = require('../logger');

const errorHandler = (err, req, res, next) => {
    logger.error('Error:', {
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', errors: err.errors });
    }

    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    res.status(err.status || 500).json({
      message: err.message || 'An unexpected error occurred',
      error: process.env.NODE_ENV === 'production' ? {} : err
    });
  };

module.exports = errorHandler;