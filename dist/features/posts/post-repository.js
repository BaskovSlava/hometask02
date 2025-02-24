"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const db_1 = require("../../db/db");
const blogs_repository_1 = require("../blogs/blogs-repository");
const node_crypto_1 = require("node:crypto");
exports.postsRepository = {
    getPosts() {
        return db_1.db.posts;
    },
    createPost(post) {
        let newPost = {
            id: (0, node_crypto_1.randomUUID)(),
            title: post.title,
            content: post.content,
            shortDescription: post.shortDescription,
            blogId: post.blogId,
            blogName: "",
        };
        const blogFind = blogs_repository_1.blogsRepository.findBlog(post.blogId);
        if (blogFind) {
            newPost.blogName = blogFind.name;
        }
        db_1.db.posts = [...db_1.db.posts, newPost];
        return newPost.id;
    },
    findPost(id) {
        const postFind = db_1.db.posts.find(post => post.id === id);
        if (postFind) {
            return postFind;
        }
        else {
            return null;
        }
    },
    findPostAndMap(id) {
        const post = this.findPost(id);
        if (!post) {
            throw new Error('Post not found');
        }
        return this.map(post);
    },
    updatePost(id, post) {
        const index = db_1.db.posts.findIndex(p => p.id === id);
        if (index !== -1) {
            db_1.db.posts[index] = Object.assign(Object.assign({}, db_1.db.posts[index]), post);
            return true;
        }
        else {
            return false;
        }
    },
    deletePost(id) {
        const index = db_1.db.posts.findIndex(p => p.id === id);
        if (index !== -1) {
            db_1.db.posts.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    },
    map(post) {
        const postForOutput = {
            id: post.id,
            title: post.title,
            content: post.content,
            shortDescription: post.shortDescription,
            blogId: post.blogId,
            blogName: post.blogName,
        };
        return postForOutput;
    }
};
