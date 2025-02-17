import {db} from '../../db/db'

export const postsRepository = {
    getPosts() {
        return db.post
    },
    createBlog(body:postsType){
        const post = {
            id: Date.now() + Math.random().toString(),
            title: body.title,
            author: body.author,
        }
        db.posts = [...db.posts, post];
        return blog.id;
    },
    getPostsById(id: string) {
        return db.posts.find(post => post.id === id);
    },
    updatePosts(id: number, title: string) {
        let post = posts.find(post => post.id === id);
        if (post) {
            post.title = title;
            return true;
        } else {
            return false;
        }
    },
    deleteBlog (id: number) {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}