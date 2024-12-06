import {ErrorRequestHandler, Express, NextFunction, Request, Response} from "express";
import responseService from "../services/responseService";

class ErrorMiddleware {
    install(app: Express) {
        const handler: ErrorRequestHandler = (err, req, res, next) => {
            console.error(err.stack);
            if (res.headersSent) {
                return next(err);
            }
            responseService.respondServerError(res);
        };

        app.use(handler);
    }
}

const service = new ErrorMiddleware();
export default service;
