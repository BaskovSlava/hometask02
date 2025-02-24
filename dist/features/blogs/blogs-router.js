"use strict";
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
        const blogs = blogs_repository_1.blogsRepository.getBlogs();
        res.status(200).json(blogs);
    },
    createBlog(req, res) {
        const newBlogId = blogs_repository_1.blogsRepository.createBlog(req.body);
        const newBlog = blogs_repository_1.blogsRepository.findBlogAndMap(newBlogId);
        res
            .status(201)
            .send(newBlog);
    },
    findBlog(req, res) {
        const blog = blogs_repository_1.blogsRepository.findBlog(req.params.id);
        blog ?
            res
                .status(200)
                .json(blog)
            : res
                .sendStatus(404);
    },
    updateBlog(req, res) {
        const updated = blogs_repository_1.blogsRepository.updateBlog(req.params.id, req.body);
        // const blog = blogsRepository.findBlog(req.params.id);
        if (updated) {
            res.sendStatus(204);
        }
        else {
            res.sendStatus(404);
        }
    },
    deleteBlog(req, res) {
        const isDeleted = blogs_repository_1.blogsRepository.deleteBlog(req.params.id);
        if (isDeleted) {
            res.send(204).json();
        }
        else {
            res.send(404).json();
        }
    }
};
exports.blogsRouter.get('/', exports.blogsController.getBlogs);
exports.blogsRouter.post('/', ...blogValidators_1.blogValidators, exports.blogsController.createBlog);
exports.blogsRouter.get('/:id', blogValidators_1.blogIdValidator, inputCheckErrorsMiddlewares_1.inputCheckErrorsMiddleware, exports.blogsController.findBlog);
exports.blogsRouter.delete('/:id', admin_middleware_1.adminMiddleware, inputCheckErrorsMiddlewares_1.inputCheckErrorsMiddleware, exports.blogsController.deleteBlog); // blogIdValidator,
exports.blogsRouter.put('/:id', ...blogValidators_1.blogValidators, exports.blogsController.updateBlog); // blogIdValidator,
