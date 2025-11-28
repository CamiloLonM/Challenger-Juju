import AppError from '../utils/AppError.js';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      details: err.details || undefined,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
