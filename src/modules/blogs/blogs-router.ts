import {Router, Request, Response, NextFunction} from "express";
import {blogsRepository} from "./blogs-repository";
import {BlogViewModel} from "../../input-output-types/blogs-types";

export const blogsRouter = Router();

export const blogsController = {
    getBlogs(req: Request, res: Response, next: NextFunction) {
        // обращение не напрямую к базе данных, а через DAL
        const blogs = blogsRepository.getBlogs(); // получения blogs из бд
        res.status(200).json(blogs);
    },
    createBlog(req: Request, res: Response, next: NextFunction) {
        const title = req.body.title;
        const author = req.body.author;

        if (!title && !author && !title.length) {
            res.status(400)
            return
        }

        const blogsId = blogsRepository.createBlog(req.body);
        const blog = blogsRepository.getBlogs(blogsId)

        res.status(200).json(blog);
    },
    findBlog(req: Request<{id: string}>, res: Response<BlogViewModel | {}>) {

    },
    updateBlog(req: Request, res: Response, next: NextFunction) {
        const isUpdated = blogsRepository.updateBlogs(+req.params.id, req.body.title)
        if (isUpdated) {
            const blog = blogsRepository.getBlogsById(+req.params.id)
            res.send(blog)
        } else {
            res.send(404)
        }
    },
    deleteBlog(req: Request, res: Response, next: NextFunction) {
        const isDeleted = blogsRepository.deleteBlog(+req.params.id)
        if (isDeleted) {
            res.send(204)
        } else {
            res.send(404)
        }
    }
}

blogsRouter.get('/', blogsController.getBlogs);
blogsRouter.post('/', ...blogValidators ,blogsController.createBlog);
blogsRouter.get('/:id', blogsController.findBlog);
blogsRouter.delete('/:id', blogsController.deleteBlog);
blogsRouter.put('/:id', blogsController.updateBlog);

