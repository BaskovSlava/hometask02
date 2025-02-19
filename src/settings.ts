import {config} from 'dotenv'
config()

export const SETTINGS = {
    PORT: process.env.PORT || 3007,
    PATH: {
        __test__: '/__test__',
        BLOGS: '/blogs',
        POSTS: '/posts',
        TESTING: '/testing',
    },
    ADMIN: process.env.ADMIN || 'admin:qwerty',
}