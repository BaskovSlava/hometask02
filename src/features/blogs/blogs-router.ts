import {Router, Request, Response, NextFunction} from "express";
import {blogsRepository} from "./blogs-repository";
import {BlogInputModel, BlogViewModel} from "../../input-output-types/blogs-types";
import {blogIdValidator, blogValidators} from "./middlewares/blogValidators";

import {inputCheckErrorsMiddleware} from "../../middlewares/inputCheckErrorsMiddlewares";
import {adminMiddleware} from "../../middlewares/admin-middleware";
import {BlogDbType} from "../../db/blog-db-type";

export const blogsRouter = Router();

export const blogsController = {
    async getBlogs(req: Request, res: Response) {
        const blogs: BlogDbType[] = await blogsRepository.getBlogs();
        res.status(200).json(blogs);
    },
    async createBlog(req: Request<any, any, BlogInputModel>, res: Response<BlogViewModel>) {
        const newBlog = await blogsRepository.createBlog(req.body);
        res
            .status(201)
            .send(newBlog);
    },
    async findBlog(req: Request<{ id: string }>, res: Response<BlogViewModel | {}>) {
        const blog = await blogsRepository.findBlog(req.params.id);
        if (!blog) {
            res
                .sendStatus(404)
            return
        }
        res
            .status(200)
            .json(blog)

    },
    async updateBlog(req: Request<{ id: string }>, res: Response<BlogViewModel | {}>) {
        const updated = await blogsRepository.updateBlog(req.params.id, req.body);
        // const blog = blogsRepository.findBlog(req.params.id);
        if (!updated) {
            res.sendStatus(404);
            return
        }
        res.sendStatus(204);

    },
    async deleteBlog(req: Request<{ id: string }>, res: Response) {
        const isDeleted = await blogsRepository.deleteBlog(req.params.id)
        if (!isDeleted) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204);

    }
}

blogsRouter.get('/', blogsController.getBlogs);
blogsRouter.post('/', ...blogValidators, blogsController.createBlog);
blogsRouter.get('/:id', blogIdValidator, inputCheckErrorsMiddleware, blogsController.findBlog);
blogsRouter.delete('/:id', adminMiddleware, inputCheckErrorsMiddleware, blogsController.deleteBlog); // blogIdValidator,
blogsRouter.put('/:id', ...blogValidators, blogsController.updateBlog); // blogIdValidator,

