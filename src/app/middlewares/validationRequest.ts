import { NextFunction, Request, Response } from "express"
import { ZodObject } from 'zod'


const validateRequest = (schema: ZodObject<any>) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body
            })
            next();
        }
        catch (err) {
            next(err)
        }
    }
}

export default validateRequest;