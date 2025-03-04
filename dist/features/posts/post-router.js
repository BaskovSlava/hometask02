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
exports.postsController = exports.postsRouter = void 0;
const express_1 = require("express");
const post_repository_1 = require("./post-repository");
// import {PostInputModel, PostViewModel} from "../../input-output-types/posts-types";
const postValidators_1 = require("./middlewares/postValidators");
const admin_middleware_1 = require("../../middlewares/admin-middleware");
const inputCheckErrorsMiddlewares_1 = require("../../middlewares/inputCheckErrorsMiddlewares");
exports.postsRouter = (0, express_1.Router)();
exports.postsController = {
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield post_repository_1.postsRepository.getPosts();
            res.status(200).json(posts);
        });
    },
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = yield post_repository_1.postsRepository.createPost(req.body);
            res
                .status(201)
                .json(newPost);
        });
    },
    findPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield post_repository_1.postsRepository.findPost(req.params.id);
            if (!post) {
                res
                    .sendStatus(404);
                return;
            }
            res
                .status(200)
                .json(post);
        });
    },
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield post_repository_1.postsRepository.updatePost(req.params.id, req.body);
            if (!updated) {
                // const post = postsRepository.findPost(req.params.id);
                res.sendStatus(404);
                return;
            }
            res.sendStatus(204);
        });
    },
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield post_repository_1.postsRepository.deletePost(req.params.id);
            if (!isDeleted) {
                res.send(404);
                return;
            }
            res.send(204);
        });
    }
};
exports.postsRouter.get('/', exports.postsController.getPosts);
exports.postsRouter.post('/', ...postValidators_1.postValidators, exports.postsController.createPost);
exports.postsRouter.get('/:id', postValidators_1.postIdValidator, inputCheckErrorsMiddlewares_1.inputCheckErrorsMiddleware, exports.postsController.findPost);
exports.postsRouter.put('/:id', postValidators_1.postIdValidator, ...postValidators_1.postValidators, exports.postsController.updatePost);
exports.postsRouter.delete('/:id', admin_middleware_1.adminMiddleware, inputCheckErrorsMiddlewares_1.inputCheckErrorsMiddleware, exports.postsController.deletePost);
