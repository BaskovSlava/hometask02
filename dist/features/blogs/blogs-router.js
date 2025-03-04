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
exports.blogsController = exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("./blogs-repository");
const blogValidators_1 = require("./middlewares/blogValidators");
const inputCheckErrorsMiddlewares_1 = require("../../middlewares/inputCheckErrorsMiddlewares");
const admin_middleware_1 = require("../../middlewares/admin-middleware");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsController = {
    getBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield blogs_repository_1.blogsRepository.getBlogs();
            res.status(200).json(blogs);
        });
    },
    createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = yield blogs_repository_1.blogsRepository.createBlog(req.body);
            res
                .status(201)
                .send(newBlog);
        });
    },
    findBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogs_repository_1.blogsRepository.findBlog(req.params.id);
            if (!blog) {
                res
                    .sendStatus(404);
                return;
            }
            res
                .status(200)
                .json(blog);
        });
    },
    updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield blogs_repository_1.blogsRepository.updateBlog(req.params.id, req.body);
            // const blog = blogsRepository.findBlog(req.params.id);
            if (!updated) {
                res.sendStatus(404);
                return;
            }
            res.sendStatus(204);
        });
    },
    deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield blogs_repository_1.blogsRepository.deleteBlog(req.params.id);
            if (!isDeleted) {
                res.sendStatus(404);
                return;
            }
            res.sendStatus(204);
        });
    }
};
exports.blogsRouter.get('/', exports.blogsController.getBlogs);
exports.blogsRouter.post('/', ...blogValidators_1.blogValidators, exports.blogsController.createBlog);
exports.blogsRouter.get('/:id', blogValidators_1.blogIdValidator, inputCheckErrorsMiddlewares_1.inputCheckErrorsMiddleware, exports.blogsController.findBlog);
exports.blogsRouter.delete('/:id', admin_middleware_1.adminMiddleware, inputCheckErrorsMiddlewares_1.inputCheckErrorsMiddleware, exports.blogsController.deleteBlog); // blogIdValidator,
exports.blogsRouter.put('/:id', ...blogValidators_1.blogValidators, exports.blogsController.updateBlog); // blogIdValidator,
