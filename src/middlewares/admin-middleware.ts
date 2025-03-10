import {NextFunction, Request, Response} from "express";
import {SETTINGS} from "../settings";

export const fromUTF8ToBase64 = (data: string) => {
    let buff = Buffer.from(data, 'utf-8')
    let dataBase64 = buff.toString('base64')
    return dataBase64;
}

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let data = `${SETTINGS.CREDENTIALS.LOGIN}:${SETTINGS.CREDENTIALS.PASSWORD}`;

    const headerAuth = req.headers.authorization
    const codedAuth = fromUTF8ToBase64(data)
    const authValidValue = `Basic ${codedAuth}`


    if (headerAuth && headerAuth == authValidValue) {
        next()
    } else {
        res.sendStatus(401)
    }
}


// import {Request, Response, NextFunction} from 'express'
// import {SETTINGS} from "../settings";
//
// // Этот мидлвар
//
// export const fromBase64ToUTF8 = (code: string) => {
//     const buff = Buffer.from(code, "base64")
//     const decodedAuth = buff.toString('utf8')
//     return decodedAuth;
// }
//

//
// export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     const auth = req.headers['authorization'] as string // 'Basic xxxx'
//     let data = `${SETTINGS.CREDENTIALS.LOGIN}:${SETTINGS.CREDENTIALS.PASSWORD}`
//     console.log(auth);
//     if (!auth) {
//         res
//             .status(401)
//             .json({})
//         return
//     }
//     if (auth.slice(0, 6) !== 'Basic ') {
//         res
//             .status(401)
//             .json({})
//         return
//     }
//     const codedAuth = fromBase64ToUTF8(data)
//
//     if (auth.slice(6) !== codedAuth) {
//         res
//             .status(401)
//             .json({})
//         return
//     }
//     next()
// }
//
