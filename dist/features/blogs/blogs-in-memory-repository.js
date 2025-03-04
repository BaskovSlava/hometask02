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
exports.blogsRepository = void 0;
const db_1 = require("../../db/db");
const node_crypto_1 = require("node:crypto");
exports.blogsRepository = {
    getBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.db.blogs;
        });
    },
    createBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: (0, node_crypto_1.randomUUID)(),
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false,
            };
            db_1.db.blogs = [...db_1.db.blogs, newBlog];
            return newBlog;
        });
    },
    findBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = db_1.db.blogs.find(blog => blog.id === id);
            if (blog) {
                return blog;
            }
            else {
                return null;
            }
        });
    },
    updateBlog(id, blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = db_1.db.blogs.findIndex(b => b.id === id);
            if (index !== -1) {
                db_1.db.blogs[index] = Object.assign(Object.assign({}, db_1.db.blogs[index]), blog);
                return true;
            }
            else {
                return false;
            }
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = db_1.db.blogs.findIndex(b => b.id === id);
            if (index !== -1) {
                db_1.db.blogs.splice(index, 1);
                return true;
            }
            else {
                return false;
            }
        });
    },
    map(blog) {
        const blogForOutput = {
            id: blog.id,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            name: blog.name,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership,
        };
        return blogForOutput;
    }
};
