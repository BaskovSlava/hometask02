"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const db_1 = require("../../db/db");
const node_crypto_1 = require("node:crypto");
exports.blogsRepository = {
    getBlogs() {
        return db_1.db.blogs;
    },
    createBlog(blog) {
        const newBlog = {
            id: (0, node_crypto_1.randomUUID)(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
        };
        db_1.db.blogs = [...db_1.db.blogs, newBlog];
        return newBlog.id;
    },
    findBlog(id) {
        const blog = db_1.db.blogs.find(blog => blog.id === id);
        if (blog) {
            return blog;
        }
        else {
            return null;
        }
    },
    findBlogAndMap(id) {
        const blog = this.findBlog(id);
        if (!blog) {
            throw new Error('Blog not found');
        }
        return this.map(blog);
    },
    updateBlog(id, blog) {
        const index = db_1.db.blogs.findIndex(b => b.id === id);
        if (index !== -1) {
            db_1.db.blogs[index] = Object.assign(Object.assign({}, db_1.db.blogs[index]), blog);
            return true;
        }
        else {
            return false;
        }
    },
    deleteBlog(id) {
        const index = db_1.db.blogs.findIndex(b => b.id === id);
        if (index !== -1) {
            db_1.db.blogs.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    },
    map(blog) {
        const blogForOutput = {
            id: blog.id,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            name: blog.name,
        };
        return blogForOutput;
    }
};
