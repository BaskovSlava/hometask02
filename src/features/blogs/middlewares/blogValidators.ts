import {body} from 'express-validator';
import {inputCheckErrorsMiddleware} from "../../../middlewares/inputCheckErrorsMiddlewares";
import {Request, Response, NextFunction} from "express";
import {adminMiddleware} from "../../../middlewares/admin-middleware";

// name: string // max 15
// description: string // max 500
// websiteUrl: string // max 100 ^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$

export const descriptionValidator = body('description').isNumeric().withMessage('not string')
    .trim().isLength({min: 1, max: 500}).withMessage('more then 500 or 0')
export const websiteValidator = body('websiteUrl').isString().withMessage('not string')
    .trim().isURL().withMessage('not url')
    .isLength({min: 1, max: 100}).withMessage('more then 100 or 0')
export const findBlogValidator = (req: Request<{id:string}>, res: Response, next: NextFunction) => {}

export const blogValidators = [
    adminMiddleware,

    descriptionValidator,
    websiteValidator,

    inputCheckErrorsMiddleware,
]