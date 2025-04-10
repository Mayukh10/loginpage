import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;

  // If the error is not an AppError, create a new AppError
  if (!(error instanceof AppError)) {
    let message = error.message || 'Something went wrong';
    
    // Handle Prisma errors
    if (error.message.includes('Unique constraint failed')) {
      message = 'A user with that email already exists';
      error = new AppError(message, 400);
    } else {
      error = new AppError(message, 500);
    }
  }

  const appError = error as AppError;

  if (process.env.NODE_ENV === 'development') {
    return res.status(appError.statusCode).json({
      status: appError.status,
      message: appError.message,
      stack: appError.stack,
      error: appError
    });
  }

  // Production mode: don't leak error details
  return res.status(appError.statusCode).json({
    status: appError.status,
    message: appError.isOperational ? appError.message : 'Something went wrong'
  });
}; 