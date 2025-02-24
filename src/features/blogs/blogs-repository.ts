import {db} from '../../db/db'
import {BlogDbType} from "../../db/blog-db-type";
import {BlogInputModel, BlogViewModel} from "../../input-output-types/blogs-types";
import {randomUUID} from "node:crypto";

export const blogsRepository = {
    getBlogs() {
        return db.blogs
    },
    createBlog(blog: BlogInputModel) {
        const newBlog: BlogDbType = {
            id:randomUUID(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
        }
        db.blogs = [...db.blogs, newBlog];
        return newBlog.id;
    },
    findBlog(id: string) {
        const blog = db.blogs.find(blog => blog.id === id);
        if (blog) {
            return blog;
        } else {
            return null
        }
    },
    findBlogAndMap(id: string) {
        const blog = this.findBlog(id)
        if (!blog) {
            throw new Error('Blog not found');
        }
        return this.map(blog);
    },
    updateBlog(id: string, blog: Partial<BlogDbType | null>) {
        const index = db.blogs.findIndex(b => b.id === id);
        if (index !== -1) {
            db.blogs[index] = {...db.blogs[index], ...blog};
            return true;
        } else {
            return false;
        }
    },
    deleteBlog(id: string) {
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
        }
        return blogForOutput;
    }
}


