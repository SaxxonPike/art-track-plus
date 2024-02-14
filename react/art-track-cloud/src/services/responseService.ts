import {Response} from "express";
import {ApiResponseModel} from "../models/apiResponseModel";

export class ResponseService {

    // Send a successful response with data.
    public async respondSuccess(res: Response, data: any, message?: string) {
        const json: ApiResponseModel = {
            success: true,
            code: "DATA",
            message: message
        }

        res.status(200).json(json);
    }

    // Send a successful response with no data.
    public async respondSuccessWithoutData(res: Response, message?: string) {
        const json: ApiResponseModel = {
            success: true,
            code: "NO_DATA",
            message: message
        }

        res.status(200).json(json);
    }

    // Send an "unauthorized" response.
    public async respondUnauthorized(res: Response) {
        const json: ApiResponseModel = {
            success: false,
            code: "UNAUTHORIZED"
        };

        res.status(401).json(json);
    }

    // Send an "unauthorized" response.
    public async respondForbidden(res: Response) {
        const json: ApiResponseModel = {
            success: false,
            code: "FORBIDDEN"
        };

        res.status(403).json(json);
    }

    // Send a "bad request" response.
    public async respondBadRequest(res: Response) {
        const json: ApiResponseModel = {
            success: false,
            code: "BAD_REQUEST"
        };

        res.status(400).json(json);
    }

    // Send a "not found" response.
    public async respondNotFound(res: Response) {
        const json: ApiResponseModel = {
            success: false,
            code: "NOT_FOUND"
        };

        res.status(404).json(json);
    }

    // Send a "server error" response.
    public respondServerError(res: Response) {
        const json: ApiResponseModel = {
            success: false,
            code: "SERVER_ERROR"
        };

        res.status(500).json(json);
    }
}

const service = new ResponseService();
export default service;
