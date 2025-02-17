import express from "express";
import cors from "cors";
import {SETTINGS} from "./settings";
import {Request, Response , NextFunction} from "express";
import {blogsRouter} from './modules/blogs/blogs-router';
import {postsRouter} from './modules/posts/post-router'
import {testingRouter} from "./modules/testing";

export const app = express();

// можно писать кастомные промежуточные слои

app.use(express.json());
app.use(cors())

app.get("/", (req: Request, res: Response, next: NextFunction) => {

    res.status(200).json({version: '1.0'});
})

app.use(SETTINGS.PATH.BLOGS, blogsRouter );
app.use(SETTINGS.PATH.POSTS, postsRouter);
app.use(SETTINGS.PATH.TESTING, testingRouter);