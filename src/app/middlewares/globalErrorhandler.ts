/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import { TErrorSources } from '../interface/error';
import ZodValidationError from '../error/ZodError';
import ValidationError from '../error/ValidationError';
import CastError from '../error/CastError';
import DuplicateError from '../error/DuplicateError';
import AppError from '../error/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  //setting default values
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = ZodValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = ValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = CastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = DuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    console.error(err); // Log the full error for debugging
    message = err.message;
    let path = '';

    const mongoErr = err as any;

    if (mongoErr?.code === 11000 || mongoErr?.code === 11001) {
      // Prioritize keyPattern if available
      if (mongoErr.keyPattern) {
        path = Object.keys(mongoErr.keyPattern)[0];
      } else {
        // Fallback: Extract field from errmsg or index name
        const errmsg = mongoErr.errmsg || mongoErr.message;
        const match = /dup key: \{ ([^}]*) \}/.exec(errmsg);

        if (match && match[1]) {
          try {
            // Parse the matched substring into an object
            const keyValue = JSON.parse(`{${match[1]}}`);
            path = Object.keys(keyValue)[0];
          } catch (parseError) {
            // If parsing fails, try to extract from index name
            if (mongoErr.index) {
              path = mongoErr.index.replace(/_\d+$/, ''); // Remove trailing _1, _2, etc.
            }
          }
        }
      }
    }

    errorSources = [
      {
        path: path,
        message: err.message,
      },
    ];
  }

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
