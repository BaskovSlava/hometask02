import {body} from 'express-validator'
import {blogsRepository} from "../../blogs/blogs-repository";
import {postsRepository} from "../post-repository";

// title: string // max 30
// shortDescription: string // max 100
// content: string // max 1000
// blogId: string // valid

export const contentValidator = body('content').isString().withMessage('not string')
    .trim().isLength({min: 1, max: 1000}).withMessage('more then 1000 or 0')
export const blogIdValidator = body('blogId').isString().withMessage('not string')
    .trim().custom(blogId => {
        const blog = blogsRepository.findBlog(blogId)
        // console.log(blog)
        return !!blog
    }).withMessage('no blog')

export const findPostValidator = (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const post = postsRepository.(req.params.id)
    if (!post) {

        res
            .status(404)
            .json({})
        return
    }

    next()
}


export const postValidators = [
    adminMiddleware,

    // titleValidator,
    // shortDescriptionValidator,
    contentValidator,
    blogIdValidator,

    inputCheckErrorsMiddleware,
]