import {Router} from 'express'
import {setDB} from '../../db/db'
import {blogCollection, postCollection} from "../../db/mongo-db";

export const testingRouter = Router()

testingRouter.delete('/all-data',async (req, res) => {
    await blogCollection.deleteMany({});
    await postCollection.deleteMany({});
    res.status(204).json({})
})