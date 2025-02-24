import {Router, Request, Response, NextFunction} from "express";
import {blogsRepository} from "./blogs-repository";
import {BlogInputModel, BlogViewModel} from "../../input-output-types/blogs-types";
import {blogIdValidator, blogValidators} from "./middlewares/blogValidators";

import {inputCheckErrorsMiddleware} from "../../middlewares/inputCheckErrorsMiddlewares";
import {adminMiddleware} from "../../middlewares/admin-middleware";

export const blogsRouter = Router();

export const blogsController = {
    getBlogs(req: Request, res: Response<BlogViewModel[]>) {
        const blogs = blogsRepository.getBlogs();
        res.status(200).json(blogs);
    },
    createBlog(req: Request<any, any, BlogInputModel>, res: Response<BlogViewModel>) {

        const newBlogId = blogsRepository.createBlog(req.body);
        const newBlog = blogsRepository.findBlogAndMap(newBlogId);
        res
            .status(201)
            .send(newBlog);
    },
    findBlog(req: Request<{ id: string }>, res: Response<BlogViewModel | {}>) {
        const blog = blogsRepository.findBlog(req.params.id);
        blog ?
            res
                .status(200)
                .json(blog)
            : res
                .sendStatus(404)
    },
    updateBlog(req: Request<{ id: string }>, res: Response<BlogViewModel | {}>) {
        const updated = blogsRepository.updateBlog(req.params.id, req.body);
        // const blog = blogsRepository.findBlog(req.params.id);
        if (updated) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    },
    deleteBlog(req: Request<{ id: string }>, res: Response) {
        const isDeleted = blogsRepository.deleteBlog(req.params.id)
        if (isDeleted) {
            res.send(204).json();
        } else {
            res.send(404).json();
        }
    }
}

blogsRouter.get('/', blogsController.getBlogs);
blogsRouter.post('/', ...blogValidators, blogsController.createBlog);
blogsRouter.get('/:id', blogIdValidator, inputCheckErrorsMiddleware, blogsController.findBlog);
blogsRouter.delete('/:id', adminMiddleware, inputCheckErrorsMiddleware, blogsController.deleteBlog); // blogIdValidator,
blogsRouter.put('/:id', ...blogValidators, blogsController.updateBlog); // blogIdValidator,

