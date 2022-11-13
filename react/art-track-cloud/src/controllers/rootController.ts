import {Express} from "express";
import responseService from "../services/responseService";

export class RootController {
    install(app: Express) {
        // Root. No data, but considered a success for health check reasons.
        app.get("/", (req, res) => {
            responseService.respondSuccessWithoutData(res);
        });
    }

    installDefaultRoute(app: Express) {
        // Default route. This must be installed last.
        app.get("*", (req, res) => {
            responseService.respondNotFound(res);
        })
    }
}

const service = new RootController();
export default service;
