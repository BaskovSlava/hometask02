import {db} from '../../db/db'
import {PostDbType} from "../../db/post-db-type";
import {PostInputModel, PostViewModel} from "../../input-output-types/posts-types";
import {BlogDbType} from "../../db/blog-db-type";
import {blogsRepository} from "../blogs/blogs-repository";
import {randomUUID} from "node:crypto";

export const postsRepository = {
    async getPosts(): Promise<PostDbType[]> {
        return db.posts;
    },
    async createPost(post: PostInputModel): Promise<PostDbType> {
        let newPost: PostDbType = {
            id: randomUUID(),
            title: post.title,
            content: post.content,
            shortDescription: post.shortDescription,
            blogId: post.blogId,
            blogName: "",
            createdAt: new Date().toISOString()
        }
        const blogFind: BlogDbType | null = await blogsRepository.findBlog(post.blogId);
        if (blogFind) {
                newPost.blogName = blogFind.name;
        }
        db.posts = [...db.posts, newPost];
        return newPost;
    },
    async findPost(id: string): Promise<PostDbType | null> {
        const postFind = db.posts.find(post => post.id === id);
        if (postFind) {
            return postFind
        } else {
            return null
        }
    },
    // async findPostAndMap(id: string): Promise<PostDbType | null> {
    //     const post = this.findPost(id);
    //     if (!post) {
    //         throw new Error('Post not found');
    //     }
    //     return this.map(post);
    // },
    async updatePost(id: string, post: Partial<PostDbType>): Promise<PostDbType | boolean> {
        const index = db.posts.findIndex(p => p.id === id);
        if (index !== -1) {
            db.posts[index] = {...db.posts[index], ...post};
            return true;
        } else {
            return false;
        }
    },
    async deletePost(id: string): Promise<boolean> {
        const index = db.posts.findIndex(p => p.id === id);
        if (index !== -1) {
            db.posts.splice(index, 1);
            return true;
        } else {
            return false;
        }
    },
    async map(post: PostDbType): Promise<PostDbType> {
        const postForOutput: PostViewModel = {
            id: post.id,
            title: post.title,
            content: post.content,
            shortDescription: post.shortDescription,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt,
        }
        return postForOutput;
    }
}
