import { validationResult } from 'express-validator';
import { Response, Request, NextFunction } from 'express';


export const errorResultMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send({
            errorsMessage: errors
                .array({onlyFirstError: true})
                .map((err) => {
                    return {message: err.msg, fields: (err as any).param}
                }),
        })
            return
    } else {
            next();
        }
}