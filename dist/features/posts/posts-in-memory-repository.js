"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const db_1 = require("../../db/db");
const blogs_repository_1 = require("../blogs/blogs-repository");
const node_crypto_1 = require("node:crypto");
exports.postsRepository = {
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.db.posts;
        });
    },
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            let newPost = {
                id: (0, node_crypto_1.randomUUID)(),
                title: post.title,
                content: post.content,
                shortDescription: post.shortDescription,
                blogId: post.blogId,
                blogName: "",
                createdAt: new Date().toISOString()
            };
            const blogFind = yield blogs_repository_1.blogsRepository.findBlog(post.blogId);
            if (blogFind) {
                newPost.blogName = blogFind.name;
            }
            db_1.db.posts = [...db_1.db.posts, newPost];
            return newPost;
        });
    },
    findPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const postFind = db_1.db.posts.find(post => post.id === id);
            if (postFind) {
                return postFind;
            }
            else {
                return null;
            }
        });
    },
    // async findPostAndMap(id: string): Promise<PostDbType | null> {
    //     const post = this.findPost(id);
    //     if (!post) {
    //         throw new Error('Post not found');
    //     }
    //     return this.map(post);
    // },
    updatePost(id, post) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = db_1.db.posts.findIndex(p => p.id === id);
            if (index !== -1) {
                db_1.db.posts[index] = Object.assign(Object.assign({}, db_1.db.posts[index]), post);
                return true;
            }
            else {
                return false;
            }
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = db_1.db.posts.findIndex(p => p.id === id);
            if (index !== -1) {
                db_1.db.posts.splice(index, 1);
                return true;
            }
            else {
                return false;
            }
        });
    },
    map(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const postForOutput = {
                id: post.id,
                title: post.title,
                content: post.content,
                shortDescription: post.shortDescription,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt,
            };
            return postForOutput;
        });
    }
};
