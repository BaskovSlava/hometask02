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
const node_crypto_1 = require("node:crypto");
const mongo_db_1 = require("../../db/mongo-db");
exports.blogsRepository = {
    getBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_db_1.blogCollection.find({}).toArray();
            let arResult = [];
            for (let i = 0; i < result.length; i++) {
                arResult.push(this.map(result[i]));
            }
            return arResult;
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
            yield mongo_db_1.blogCollection.insertOne(newBlog);
            return this.map(newBlog);
        });
    },
    findBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield mongo_db_1.blogCollection.findOne({ id: id });
            if (blog) {
                return this.map(blog);
            }
            return null;
        });
    },
    updateBlog(id, blog) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield mongo_db_1.blogCollection.updateOne({ id: id }, {
                $set: {
                    name: blog.name,
                    description: blog.description,
                    websiteUrl: blog.websiteUrl,
                }
            });
            return result.matchedCount === 1;
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_db_1.blogCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
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
