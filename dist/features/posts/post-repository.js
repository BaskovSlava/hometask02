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
const blogs_repository_1 = require("../blogs/blogs-repository");
const node_crypto_1 = require("node:crypto");
const mongo_db_1 = require("../../db/mongo-db");
exports.postsRepository = {
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_db_1.postCollection.find({}).toArray();
            let arResult = [];
            for (let i = 0; i < result.length; i++) {
                arResult.push(this.map(result[i]));
            }
            return arResult;
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
                createdAt: new Date().toISOString(),
            };
            const blogFind = yield blogs_repository_1.blogsRepository.findBlog(post.blogId);
            if (blogFind) {
                newPost.blogName = blogFind.name;
                newPost.blogId = blogFind.id;
            }
            yield mongo_db_1.postCollection.insertOne(newPost);
            return this.map(newPost);
        });
    },
    findPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const postFind = yield mongo_db_1.postCollection.findOne({ id: id });
            if (postFind) {
                return this.map(postFind);
            }
            else {
                return null;
            }
        });
    },
    updatePost(id, post) {
        return __awaiter(this, void 0, void 0, function* () {
            const findPost = yield mongo_db_1.postCollection.findOne({ id: id });
            if (findPost) {
                const result = yield mongo_db_1.postCollection.updateOne({ id: id }, {
                    $set: {
                        title: post.title,
                        content: post.content,
                        shortDescription: post.shortDescription,
                        blogId: post.blogId,
                    }
                });
                return result.matchedCount === 1;
            }
            else {
                return false;
            }
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_db_1.postCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    map(post) {
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            shortDescription: post.shortDescription,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt,
        };
    }
};
/*
* // import {db} from '../../db/db'
// import {PostDbType} from "../../db/post-db-type";
// import {PostInputModel, PostViewModel} from "../../input-output-types/posts-types";
// import {BlogDbType} from "../../db/blog-db-type";
// import {blogsRepository} from "../blogs/blogs-repository";
// import {randomUUID} from "node:crypto";
// import {blogCollection, postCollection} from "../../db/mongo-db";
//
// export const postsRepository = {
//     async getPosts(): Promise<PostDbType[]> {
//         const result = await blogCollection.find({}).toArray();
//         let arResult = []
//         for (let i = 0; i < result.length; i++) {
//             arResult.push(this.map(result[i]));
//         }
//         return arResult;
//     },
//     async createPost(post: PostInputModel): Promise<PostDbType> {
//         let newPost: PostDbType = {
//             id: randomUUID(),
//             title: post.title,
//             content: post.content,
//             shortDescription: post.shortDescription,
//             blogId: post.blogId,
//             blogName: "",
//             createdAt: new Date().toISOString(),
//         }
//
//         const blogFind: BlogDbType | boolean = await blogsRepository.findBlog(post.blogId);
//         if (blogFind) {
//             if (typeof blogFind !== "boolean") {
//                 newPost.blogName = blogFind.name
//                 newPost.blogId = blogFind.id
//             }
//         }
//         let result = postCollection.insertOne(newPost);
//         return this.map(newPost);
//     },
//     async findPost(id: string): Promise<PostDbType | null> {
//         const postFind = await postCollection.findOne({id:id})
//         if (postFind) {
//             return this.map(postFind);
//         } else {
//             return null
//         }
//     },
//     async updatePost(id: string, post: Partial<PostDbType>): Promise<PostDbType | boolean> {
//         const findpost = await postCollection.findOne({id:id})
//         if (findpost) {
//             const result = await postCollection.updateOne({id:id}, {
//                 $set: {
//                     title: post.title,
//                     content: post.content,
//                     shortDescription: post.shortDescription,
//                     blogId: post.blogId,
//                 }
//             })
//             return result.matchedCount === 1
//         } else {
//             return false;
//         }
//     },
//     async deletePost(id: string): Promise<boolean> {
//         const result = await postCollection.deleteOne({id: id})
//         return result.deletedCount === 1
//
//     },
//     map(post: PostDbType) {
//         const postForOutput: PostViewModel = {
//             id: post.id,
//             title: post.title,
//             content: post.content,
//             shortDescription: post.shortDescription,
//             blogId: post.blogId,
//             blogName: post.blogName,
//             createdAt: post.createdAt,
//         }
//         return postForOutput;
//     }
// }


* */ 
