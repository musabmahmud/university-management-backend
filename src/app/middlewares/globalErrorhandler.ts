import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = 500;
  const message = err.message || 'Something went wrong';

  console.error('Unhandled Error:', err);
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);

  return res.status(statusCode).json({
    success: false,
    message,
    error: err
  });
};

export default globalErrorHandler;
