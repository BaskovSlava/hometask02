import {Request, Response, Router, NextFunction} from 'express';

export const postsRouter = Router();

postsRouter.get('/', (req: Request, res: Response) => {
    const posts = postsRepository.getPosts();
    res.status(200).send(posts);
})

postsRouter.post('/',
    // authorizationMiddleware,
    // PostTitleValidator
    // postShortDescriptionValidator
    // postContentValidator
    // blogIdValidator
    // -customIsBlogsValidator
    // errorsResultMiddleware
    (req: Request, res: Response) => {
    const posts = req.body.blogId;
    const post = postsRepository.getBlogById(postId);

    const newPost = postsRepository.createPost(req.body, post!.name);

    if(newPost) {
        res.status(201).send(newPost);
    } else {
        res.sendStatus(400);
    }
})