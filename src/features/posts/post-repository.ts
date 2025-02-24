import {db} from '../../db/db'
import {PostDbType} from "../../db/post-db-type";
import {PostInputModel, PostViewModel} from "../../input-output-types/posts-types";
import {BlogDbType} from "../../db/blog-db-type";
import {blogsRepository} from "../blogs/blogs-repository";
import {randomUUID} from "node:crypto";

export const postsRepository = {
    getPosts() {
        return db.posts;
    },
    createPost(post: PostInputModel) {
        let newPost: PostDbType = {
            id:randomUUID(),
            title: post.title,
            content: post.content,
            shortDescription: post.shortDescription,
            blogId: post.blogId ,
            blogName: "",
        }

        const blogFind: BlogDbType | null = blogsRepository.findBlog(post.blogId);
        if (blogFind) {
                newPost.blogName = blogFind.name;
        }

        db.posts = [...db.posts, newPost];
        return newPost.id;
    },
    findPost(id: string) {
        const postFind =  db.posts.find(post => post.id === id);
        if (postFind) {
            return postFind
        } else {
            return null
        }
    },
    findPostAndMap(id: string) {
        const post = this.findPost(id);
        if (!post) {
            throw new Error('Post not found');
        }
        return this.map(post);
    },
    updatePost(id: string, post: Partial<PostDbType>) {
        const index = db.posts.findIndex(p => p.id === id);
        if (index !== -1) {
            db.posts[index] = {...db.posts[index], ...post};
            return true;
        } else {
            return false;
        }
    },
    deletePost(id: string) {
        const index = db.posts.findIndex(p => p.id === id);
        if (index !== -1) {
            db.posts.splice(index, 1);
            return true;
        } else {
            return false;
        }
    },
    map(post: PostDbType) {
        const postForOutput: PostViewModel = {
            id: post.id,
            title: post.title,
            content: post.content,
            shortDescription: post.shortDescription,
            blogId: post.blogId,
            blogName: post.blogName,
        }
        return postForOutput;
    }
}
