import { NextFunction, Request, Response } from "express";
import { CustomException } from "../exceptions/setup/custom.exception";
import { ValidationError } from "express-validation";

export function onError(error, req: Request, res: Response, next: NextFunction) {
    
    console.error('#### error #####', error);
    // console.error(JSON.stringify(error, null, 4));

    let message: string;
    let statusCode: number;

    if (error instanceof CustomException) {
        message = error.message;
        statusCode = error.statusCode;
    } else if (error instanceof ValidationError) {
        const path = error.details.body?.map(x => x['context'].label).join(', ');
        message = `Invalid parameter} ${path}`;
        statusCode = 400;
    } else {
        message = 'Something wrong...';
        statusCode = 400;
    }

    res.status(statusCode)
        .json({
            statusCode,
            message,
            stack: error.stack
        });
}