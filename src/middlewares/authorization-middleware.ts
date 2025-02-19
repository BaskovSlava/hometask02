import {Request, Response, NextFunction} from 'express';
import {SETTINGS} from "../settings";

export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {

    let data = `${SETTINGS.ADMIN}` // admin:qwerty

    let base64data = Buffer.from(data, 'base64').toString('base64'); // закодированная строка под base64
    const validAuthValue =  `Basic ${base64data}`;
    let authHeader = req.headers.authorization;

    if (authHeader && authHeader === validAuthValue) {
        next()
    } else res.sendStatus(401);
}