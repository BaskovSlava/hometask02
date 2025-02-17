import {body} from "express-validator"
import {blogsRepository} from '../../modules/blogs/blogs-repository';

export const blogsTitleValidator = body('title')
    .isString().withMessage('title should be a string').trim().notEmpty().withMessage('title is required')
    .isLength({min: 1, max: 10}).withMessage('title should contain 1 - 10 symbols')



export const mwArray = [blogsTitleValidator]