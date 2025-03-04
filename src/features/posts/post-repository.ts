
import { db } from '../../db/db'
import { PostDbType } from "../../db/post-db-type";
import { PostInputModel, PostViewModel } from "../../input-output-types/posts-types";
import { BlogDbType } from "../../db/blog-db-type";
import { blogsRepository } from "../blogs/blogs-repository";
import { randomUUID } from "node:crypto";
import { postCollection } from "../../db/mongo-db";

export const postsRepository = {
    async getPosts(): Promise<PostDbType[]> {
        const result = await postCollection.find({}).toArray();
        let arResult = [];
        for (let i = 0; i < result.length; i++) {
            arResult.push(this.map(result[i]));
        }
        return arResult;
    },
    async createPost(post: PostInputModel): Promise<PostDbType> {
        let newPost: PostDbType = {
            id: randomUUID(),
            title: post.title,
            content: post.content,
            shortDescription: post.shortDescription,
            blogId: post.blogId,
            blogName: "",
            createdAt: new Date().toISOString(),
        }

        const blogFind: BlogDbType | null = await blogsRepository.findBlog(post.blogId);
        if (blogFind) {
                newPost.blogName = blogFind.name;
                newPost.blogId = blogFind.id;
        }
        await postCollection.insertOne(newPost);
        return this.map(newPost);
    },
    async findPost(id: string): Promise<PostDbType | null> {
        const postFind = await postCollection.findOne({ id: id });
        if (postFind) {
            return this.map(postFind);
        } else {
            return null;
        }
    },
    async updatePost(id: string, post: Partial<PostDbType>): Promise<boolean> {
        const findPost = await postCollection.findOne({ id: id });
        if (findPost) {
            const result = await postCollection.updateOne({ id: id }, {
                $set: {
                    title: post.title,
                    content: post.content,
                    shortDescription: post.shortDescription,
                    blogId: post.blogId,
                }
            });
            return result.matchedCount === 1;
        } else {
            return false;
        }
    },
    async deletePost(id: string): Promise<boolean> {
        const result = await postCollection.deleteOne({ id: id });
        return result.deletedCount === 1;
    },
    map(post: PostDbType): PostViewModel {
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            shortDescription: post.shortDescription,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt,
        }
    }
}


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