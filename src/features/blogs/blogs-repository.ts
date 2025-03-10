import {db} from '../../db/db'
import {BlogDbType} from "../../db/blog-db-type";
import {BlogInputModel, BlogViewModel} from "../../input-output-types/blogs-types";
import {randomUUID} from "node:crypto";
import {blogCollection} from "../../db/mongo-db";


export const blogsRepository = {
    async getBlogs(): Promise<BlogDbType[]> {
        const result = await blogCollection.find({}).toArray();
        let arResult = [];
        for (let i = 0; i < result.length; i++) {
            arResult.push(this.map(result[i]));
        }
        return arResult;
    },
    async createBlog(blog: BlogInputModel): Promise<BlogDbType> {
        const newBlog: BlogDbType = {
            id: randomUUID(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false,
        }
        await blogCollection.insertOne(newBlog);
        return this.map(newBlog);
    },
    async findBlog(id: string): Promise<BlogDbType | null> {
        const blog = await blogCollection.findOne({id: id});
        if (blog) {
            return this.map(blog);
        }
        return null;
    },
    async updateBlog(id: string, blog: Partial<BlogDbType>): Promise<boolean> {
       let result = await blogCollection.updateOne({id: id},{
           $set: {
               name: blog.name,
               description: blog.description,
               websiteUrl: blog.websiteUrl,
           }
       })
        return result.matchedCount === 1
    },
    async deleteBlog(id: string): Promise<boolean> {
        const result = await blogCollection.deleteOne({id: id});
        return result.deletedCount === 1
    },
    map(blog: BlogDbType) {
        const blogForOutput: BlogDbType = {
            id: blog.id,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            name: blog.name,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership,
        }
        return blogForOutput;
    }
}


