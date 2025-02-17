import {db} from '../../db/db'

const blogs = [{id: 1, title: "Slava blog"}, {id: 2, title: "Ignat blog"}]

export const blogsRepository = {
    getBlogs() {
        return db.blogs
    },
    createBlog(body:blogsType){
        const blog = {
            id: Date.now() + Math.random().toString(),
            title: body.title,
            author: body.author,
        }
        db.blogs = [...db.blogs, blog];
        return blog.id;
    },
    getBlogsById(id: string) {
        return db.blogs.find(blog => blog.id === id);
    },
    updateBlogs(id: number, title: string) {
        let blog = blogs.find(b => b.id === id);
        if (blog) {
            blog.title = title;
            return true;
        } else {
            return false;
        }
    },
    deleteBlog (id: number) {
        for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}