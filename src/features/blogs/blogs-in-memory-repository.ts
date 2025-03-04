import {db} from '../../db/db'
import {BlogDbType} from "../../db/blog-db-type";
import {BlogInputModel, BlogViewModel} from "../../input-output-types/blogs-types";
import {randomUUID} from "node:crypto";

export const blogsRepository = {
    async getBlogs(): Promise<BlogDbType[]> {
        return db.blogs
    },
    async createBlog(blog: BlogInputModel): Promise<BlogDbType> {
        const newBlog: BlogDbType = {
            id: randomUUID(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false,
        }
        db.blogs = [...db.blogs, newBlog];
        return newBlog;
    },
    async findBlog(id: string): Promise<BlogDbType | null> {
        const blog = db.blogs.find(blog => blog.id === id);
        if (blog) {
            return blog;
        } else {
            return null
        }
    },
    async updateBlog(id: string, blog: Promise<BlogDbType | null>) {
        const index = db.blogs.findIndex(b => b.id === id);
        if (index !== -1) {
            db.blogs[index] = {...db.blogs[index], ...blog};
            return true;
        } else {
            return false;
        }
    },
    async deleteBlog(id: string): Promise<BlogDbType | boolean> {
        const index = db.blogs.findIndex(b => b.id === id);
        if (index !== -1) {
            db.blogs.splice(index, 1);
            return true;
        } else {
            return false;
        }
    },
    map(blog: BlogDbType) {
        const blogForOutput: BlogViewModel = {
            id: blog.id,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            name: blog.name,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership,
        }
        return blogForOutput;
    }
}


