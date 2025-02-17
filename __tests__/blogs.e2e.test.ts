import {db, setDB} from "../src/db/db";
import {req} from "./helpers/test-helpers";
import {SETTINGS} from "../src/settings";
import {BlogInputModel} from '../src/input-output-types/blogs-types';
import {codedAuth} from "./helpers/datasets"

describe('/blogs', () => {
    it('should create' , async () => {
        setDB()
        const newBlog: BlogInputModel = {
            name: 'n1',
            description: 'd1',
            websiteUrl: 'http://some.com',
        }

        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({"Authorization:": 'Basic ' + codedAuth})
            .send(newBlog) // отправка данных
            .expect(201)

        expect(res.body.message).toEqual(newBlog.name)
        expect(res.body.description).toEqual(newBlog.description)
        expect(res.body.websiteUrl).toEqual(newBlog.websiteUrl)
        expect(typeof res.body.id).toEqual('string')

        expect(typeof res.body.id).toEqual('string')
    })
    it('shouldn\'t create 401', async () => {
        setDB()
        const newBlog: BlogInputModel = {
            name: 'n1',
            description: 'd1',
            websiteUrl: 'http://some.com',
        }

        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .send(newBlog) // отправка данных
            .expect(401)

        // console.log(res.body)

        expect(db.blogs.length).toEqual(0)
    })

})