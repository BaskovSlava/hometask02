import {Collection, MongoClient} from 'mongodb';
import {SETTINGS} from "../settings";
import {BlogDbType} from "./blog-db-type";
import {PostDbType} from "./post-db-type";

export let blogCollection:Collection<BlogDbType>
export let postCollection:Collection<PostDbType>


export async function connectToDB(url:string): Promise<boolean> {
    // Проверка подключения к базе данных
    let client: MongoClient = new MongoClient(url)
    let db = client.db(SETTINGS.DB_NAME)
    // Получение доступа к коллекциям
    blogCollection = db.collection<BlogDbType>(SETTINGS.PATH.BLOGS)
    postCollection = db.collection<PostDbType>(SETTINGS.PATH.POSTS)

    try {
        await client.connect()
        await db.command({ping: 1})
        console.log("Connected to DB")
        return true
    } catch (error) {
        console.log(error)
        await client.close()
        return false
    }
}