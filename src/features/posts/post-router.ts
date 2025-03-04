import {Router, Request, Response} from "express";
import {postsRepository} from "./post-repository";
// import {PostInputModel, PostViewModel} from "../../input-output-types/posts-types";
import {postValidators, postIdValidator} from "./middlewares/postValidators";
import {adminMiddleware} from "../../middlewares/admin-middleware";
import {inputCheckErrorsMiddleware} from "../../middlewares/inputCheckErrorsMiddlewares";

export const postsRouter = Router();

export const postsController = {
    async getPosts(req: Request, res: Response) {
        const posts = await postsRepository.getPosts();
        res.status(200).json(posts);
    },
    async createPost(req: Request, res: Response) {
        const newPost = await postsRepository.createPost(req.body);
        res
            .status(201)
            .json(newPost);
    },
    async findPost(req: Request, res: Response) {
        const post = await postsRepository.findPost(req.params.id);
        if(!post) {
            res
                .sendStatus(404)
            return
        }
            res
                .status(200)
                .json(post)

    },
    async updatePost(req: Request, res: Response) {
        const updated = await postsRepository.updatePost(req.params.id, req.body);
        if (!updated) {
            // const post = postsRepository.findPost(req.params.id);
            res.sendStatus(404);
            return
        }
            res.sendStatus(204);
    },
    async deletePost(req: Request, res: Response) {
        const isDeleted = await postsRepository.deletePost(req.params.id);
        if (!isDeleted) {
            res.send(404);
            return
        }
            res.send(204);
    }
}

postsRouter.get('/', postsController.getPosts);
postsRouter.post('/', ...postValidators, postsController.createPost);
postsRouter.get('/:id', postIdValidator, inputCheckErrorsMiddleware, postsController.findPost);
postsRouter.put('/:id', postIdValidator, ...postValidators, postsController.updatePost);
postsRouter.delete('/:id', adminMiddleware, inputCheckErrorsMiddleware, postsController.deletePost);






