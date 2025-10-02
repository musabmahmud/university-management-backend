import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';

const validateRequest = (schema: ZodType) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
