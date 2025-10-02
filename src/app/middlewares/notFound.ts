import { NextFunction, Request, Response } from 'express';

import httpStatus from 'http-status';

const notFound = (req: Request, res: Response, _next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Api Not Found',
    error: {
      path: req.originalUrl,
      message: 'Api Not Found',
    },
  });
};

export default notFound;
