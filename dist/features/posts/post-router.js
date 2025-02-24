"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsController = exports.postsRouter = void 0;
const express_1 = require("express");
const post_repository_1 = require("./post-repository");
const postValidators_1 = require("./middlewares/postValidators");
const admin_middleware_1 = require("../../middlewares/admin-middleware");
const inputCheckErrorsMiddlewares_1 = require("../../middlewares/inputCheckErrorsMiddlewares");
exports.postsRouter = (0, express_1.Router)();
exports.postsController = {
    getPosts(req, res) {
        const posts = post_repository_1.postsRepository.getPosts();
        res.status(200).json(posts);
    },
    createPost(req, res) {
        const newPostId = post_repository_1.postsRepository.createPost(req.body);
        const newPost = post_repository_1.postsRepository.findPostAndMap(newPostId);
        res
            .status(201)
            .json(newPost);
    },
    findPost(req, res) {
        const post = post_repository_1.postsRepository.findPost(req.params.id);
        post ?
            res
                .status(200)
                .json(post)
            : res
                .sendStatus(404);
    },
    updatePost(req, res) {
        const updated = post_repository_1.postsRepository.updatePost(req.params.id, req.body);
        if (updated) {
            const post = post_repository_1.postsRepository.findPost(req.params.id);
            res.sendStatus(204);
        }
        else {
            res.sendStatus(404);
        }
    },
    deletePost(req, res) {
        const isDeleted = post_repository_1.postsRepository.deletePost(req.params.id);
        if (isDeleted) {
            res.send(204);
        }
        else {
            res.send(404);
        }
    }
};
exports.postsRouter.get('/', exports.postsController.getPosts);
exports.postsRouter.post('/', ...postValidators_1.postValidators, exports.postsController.createPost);
exports.postsRouter.get('/:id', postValidators_1.postIdValidator, inputCheckErrorsMiddlewares_1.inputCheckErrorsMiddleware, exports.postsController.findPost);
exports.postsRouter.put('/:id', postValidators_1.postIdValidator, ...postValidators_1.postValidators, exports.postsController.updatePost);
exports.postsRouter.delete('/:id', admin_middleware_1.adminMiddleware, inputCheckErrorsMiddlewares_1.inputCheckErrorsMiddleware, exports.postsController.deletePost);
