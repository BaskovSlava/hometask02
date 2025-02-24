import {Router, Request, Response, NextFunction} from "express";
import {postsRepository} from "./post-repository";
import {PostInputModel, PostViewModel} from "../../input-output-types/posts-types";
import {postValidators, findPostValidator, postIdValidator} from "./middlewares/postValidators";
import {adminMiddleware} from "../../middlewares/admin-middleware";
import {inputCheckErrorsMiddleware} from "../../middlewares/inputCheckErrorsMiddlewares";

export const postsRouter = Router();

export const postsController = {
    getPosts(req: Request, res: Response<PostViewModel[]>) {
        const posts = postsRepository.getPosts();
        res.status(200).json(posts);
    },
    createPost(req: Request<any, any, PostInputModel>, res: Response<PostViewModel>) {
        const newPostId = postsRepository.createPost(req.body);
        const newPost = postsRepository.findPostAndMap(newPostId);

        res
            .status(201)
            .json(newPost);
    },
    findPost(req: Request<{ id: string }>, res: Response<PostViewModel | {}>) {
        const post = postsRepository.findPost(req.params.id);
        post ?
            res
                .status(200)
                .json(post)
            : res
                .sendStatus(404)
    },
    updatePost(req: Request<{ id: string }>, res: Response<PostViewModel | {}>) {
        const updated = postsRepository.updatePost(req.params.id, req.body);
        if (updated) {
            const post = postsRepository.findPost(req.params.id);
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    },
    deletePost(req: Request<{ id: string }>, res: Response) {
        const isDeleted = postsRepository.deletePost(req.params.id);
        if (isDeleted) {
            res.send(204);
        } else {
            res.send(404);
        }
    }
}

postsRouter.get('/', postsController.getPosts);
postsRouter.post('/', ...postValidators, postsController.createPost);
postsRouter.get('/:id', postIdValidator, inputCheckErrorsMiddleware, postsController.findPost);
postsRouter.put('/:id', postIdValidator, ...postValidators, postsController.updatePost);
postsRouter.delete('/:id', adminMiddleware, inputCheckErrorsMiddleware, postsController.deletePost);






