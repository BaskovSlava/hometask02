import {Router, Request, Response, NextFunction} from "express";
import {blogsRepository} from "./blogs-repository";
import {BlogInputModel, BlogViewModel} from "../../input-output-types/blogs-types";
import {blogValidators, findBlogValidator} from "./middlewares/blogValidators";
import {adminMiddleware} from "../../middlewares/admin-middleware";

export const blogsRouter = Router();

export const blogsController = {
    getBlogs(req: Request, res: Response<BlogViewModel[]>) {
        // обращение не напрямую к базе данных, а через DAL
        const blogs = blogsRepository.getBlogs(); // получения blogs из бд
        res.status(200).json(blogs);
    },
    createBlog(req: Request<any, any, BlogInputModel>, res: Response<BlogViewModel>) {
        const newBlogId = blogsRepository.createBlog(req.body);
        const newBlog = blogsRepository.findBlogAndMap(newBlogId);

        res
            .status(200)
            .json(newBlog);
    },
    findBlog(req: Request<{ id: string }>, res: Response<BlogViewModel | {}>) {

    },
    updateBlog(req: Request, res: Response) {
        const isUpdated = blogsRepository.updateBlogs(+req.params.id, req.body.title)
        if (isUpdated) {
            const blog = blogsRepository.getBlogsById(+req.params.id)
            res.send(blog)
        } else {
            res.send(404)
        }
    },
    deleteBlog(req: Request<{ id: string }>, res: Response) {
        const isDeleted = blogsRepository.deleteBlog(+req.params.id)
        if (isDeleted) {
            res.send(204)
        } else {
            res.send(404)
        }
    }
}

blogsRouter.get('/', blogsController.getBlogs);
blogsRouter.post('/', ...blogValidators, blogsController.createBlog);
blogsRouter.get('/:id', findBlogValidator, blogsController.findBlog);
blogsRouter.delete('/:id', adminMiddleware, findBlogValidator, blogsController.deleteBlog);
blogsRouter.put('/:id', findBlogValidator, ...blogValidators, blogsController.updateBlog);

