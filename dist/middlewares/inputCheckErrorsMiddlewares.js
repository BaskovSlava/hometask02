"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputCheckErrorsMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputCheckErrorsMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res
            .status(400)
            .json({
            errorsMessages: errors
                .array({ onlyFirstError: true })
                .map((err) => {
                return { message: err.msg, field: err.path };
            }),
        });
    }
    else {
        next();
    }
};
exports.inputCheckErrorsMiddleware = inputCheckErrorsMiddleware;
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
