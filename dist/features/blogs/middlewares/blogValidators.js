"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidators = exports.blogIdValidator = exports.websiteValidator = exports.descriptionValidator = exports.nameValidator = void 0;
const express_validator_1 = require("express-validator");
const inputCheckErrorsMiddlewares_1 = require("../../../middlewares/inputCheckErrorsMiddlewares");
const admin_middleware_1 = require("../../../middlewares/admin-middleware");
exports.nameValidator = (0, express_validator_1.body)('name')
    .isString().withMessage('not string')
    .trim().isLength({ min: 1, max: 15 }).withMessage('more then 15 or 0');
exports.descriptionValidator = (0, express_validator_1.body)('description')
    .isString().withMessage('not string')
    .trim().isLength({ min: 1, max: 500 }).withMessage('more then 500 or 0');
exports.websiteValidator = (0, express_validator_1.body)('websiteUrl')
    .isString().withMessage('not string')
    .trim().isURL().withMessage('not url')
    .isLength({ min: 1, max: 100 }).withMessage('more then 100 or 0');
exports.blogIdValidator = (0, express_validator_1.param)('id')
    .isString().withMessage('blogId should be a string')
    .notEmpty().withMessage('id is required')
    .trim();
exports.blogValidators = [
    admin_middleware_1.adminMiddleware,
    exports.nameValidator,
    exports.descriptionValidator,
    exports.websiteValidator,
    inputCheckErrorsMiddlewares_1.inputCheckErrorsMiddleware,
];
