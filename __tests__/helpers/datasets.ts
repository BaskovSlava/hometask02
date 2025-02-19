import {SETTINGS} from "../../src/settings";
import {fromUTF8ToBase64} from "../../src/middlewares/admin-middleware";

// готовые данные для переиспользования в тестах

export const codedAuth = fromUTF8ToBase64(SETTINGS.ADMIN)

export const createString = (length: number) => {
    let s = '';
    for(let x = 1; x <= length; x++) {
        s += x % 10
    }
    return s;
}

export const blog1 = {
    id: new Date().toISOString() + Math.random(),
    name: 'n1',
    description: 'd1',
    websiteUrl: 'http://some.com',
} as const; // dataset нельзя изменять

export const blog2 = {
    id: new Date().toISOString() + Math.random(),
    name: 'n2',
    description: 'd2',
    websiteUrl: 'http://some2.com',
} as const; // Нельзя менять dataset

export const post1 = {
    id: new Date().toISOString() + Math.random(),
    title: 't1',
    content: 'c1',
    shortDescription: 's2',
    blogId: blog1.id,
    blogName: 'n1'
} as const

export const dataset1 = {
    blogs: [blog1],
    posts: [],
} as const
export const dataset2 = {
    blogs: [blog1, blog2],
    posts: [post1],
}