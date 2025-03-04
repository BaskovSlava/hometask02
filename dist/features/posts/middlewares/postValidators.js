"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidators = exports.findPostValidator = exports.blogIdValidator = exports.postIdValidator = exports.contentValidator = exports.shortDescriptionValidator = exports.titleValidator = void 0;
const express_validator_1 = require("express-validator");
const blogs_repository_1 = require("../../blogs/blogs-repository");
const post_repository_1 = require("../post-repository");
const admin_middleware_1 = require("../../../middlewares/admin-middleware");
const inputCheckErrorsMiddlewares_1 = require("../../../middlewares/inputCheckErrorsMiddlewares");
// title: string // max 30
// shortDescription: string // max 100
// content: string // max 1000
// blogId: string // valid
exports.titleValidator = (0, express_validator_1.body)('title')
    .isString().withMessage('not string')
    .trim().isLength({ min: 1, max: 30 }).withMessage('more then 30 or 0');
exports.shortDescriptionValidator = (0, express_validator_1.body)('shortDescription')
    .isString().withMessage('not string')
    .trim().isLength({ min: 1, max: 100 }).withMessage('more then 100 or 0');
exports.contentValidator = (0, express_validator_1.body)('content')
    .isString().withMessage('not string')
    .trim().isLength({ min: 1, max: 1000 }).withMessage('more then 1000 or 0');
exports.postIdValidator = (0, express_validator_1.param)('id')
    .isString().withMessage('id should be a string')
    .notEmpty().withMessage('id is required')
    .trim();
exports.blogIdValidator = (0, express_validator_1.body)('blogId').isString().withMessage('blogId should be a string')
    .notEmpty().withMessage('blogId is requires').custom((blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_repository_1.blogsRepository.findBlog(blogId);
    if (blog) {
        return true;
    }
    else {
        return Promise.reject();
    }
    // return !!blog
})).withMessage('no blog');
const findPostValidator = (req, res, next) => {
    const post = post_repository_1.postsRepository.findPost(req.params.id);
    if (!post) {
        res
            .status(404)
            .json({});
        return;
    }
    next();
};
exports.findPostValidator = findPostValidator;
exports.postValidators = [
    admin_middleware_1.adminMiddleware,
    exports.titleValidator,
    exports.shortDescriptionValidator,
    exports.contentValidator,
    exports.blogIdValidator,
    inputCheckErrorsMiddlewares_1.inputCheckErrorsMiddleware,
];
