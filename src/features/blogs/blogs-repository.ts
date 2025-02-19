import {db} from '../../db/db'
import {BlogDbType} from "../../db/blog-db-type";
import {BlogInputModel, BlogViewModel} from "../../input-output-types/blogs-types";

export const blogsRepository = {
    getBlogs() {
        return db.blogs
    },
    createBlog(blog: BlogInputModel) {
        const newBlog: BlogDbType = {
            id: new Date().toISOString() + Math.random(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
        }
        db.blogs = [...db.blogs, newBlog];
        return newBlog.id;
    },
    findBlog(id: string) {
        return db.blogs.find(blog => blog.id === id);
    },
    findBlogAndMap(id: string) {
        const blog = this.find(id)!
        return this.map(blog);
    },
    updateBlogs(id: number, title: string) {
        let blog = blogs.find(b => b.id === id);
        if (blog) {
            blog.title = title;
            return true;
        } else {
            return false;
        }
    },
    deleteBlog (id: number) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1);
                return true;
            }
        }
        return false;
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