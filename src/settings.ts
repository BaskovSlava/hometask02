import {config} from 'dotenv'
config()

export const SETTINGS = {
    PORT: process.env.PORT || 3007,
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        TESTING: '/testing',
    },
    CREDENTIALS:{
        LOGIN:'admin',
        PASSWORD: 'qwerty'
    },
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017',
    DB_NAME: process.env.DB_NAME || 'blogs-platform',
}