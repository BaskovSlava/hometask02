import {body, param} from 'express-validator';
import {inputCheckErrorsMiddleware} from "../../../middlewares/inputCheckErrorsMiddlewares";
import {adminMiddleware} from "../../../middlewares/admin-middleware";


export const nameValidator = body('name')
    .isString().withMessage('not string')
    .trim().isLength({min:1, max: 15}).withMessage('more then 15 or 0')

export const descriptionValidator = body('description')
    .isString().withMessage('not string')
    .trim().isLength({min: 1, max: 500}).withMessage('more then 500 or 0')

export const websiteValidator = body('websiteUrl')
    .isString().withMessage('not string')
    .trim().isURL().withMessage('not url')
    .isLength({min: 1, max: 100}).withMessage('more then 100 or 0')

export const blogIdValidator = param('id')
    .isString().withMessage('blogId should be a string')
    .notEmpty().withMessage('id is required')
    .trim()

export const blogValidators = [
    adminMiddleware,
    nameValidator,
    descriptionValidator,
    websiteValidator,
    inputCheckErrorsMiddleware,
]

