import {validationResult} from 'express-validator'
import {NextFunction,Request,Response} from "express";


export const inputCheckErrorsMiddleware = (req: Request, res: Response, next: NextFunction) =>
{
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res
            .status(400)
            .json({
                errorsMessages: errors
                    .array({onlyFirstError: true})
                    .map((err) => {
                        return {message: err.msg, field: (err as any).path}
                    }),
            })

    } else {
        next()
    }

}


//
//
// import {Request, Response, NextFunction} from "express";
// import {validationResult} from "express-validator";
// import {FieldNamesType} from "../input-output-types/output-errors-type";
//
// export const inputCheckErrorsMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     const e = validationResult(req);
//     if (!e.isEmpty()) {
//         const eArray = e.array({onlyFirstError: true}) as { path: FieldNamesType, msg: string }[]
//
//         res
//             .status(400)
//             .json({
//                 errorsMessage: eArray.map(x => ({field: x.path, message: x.msg}))
//             })
//         return
//     }
//     next()
// }
