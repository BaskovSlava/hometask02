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
}