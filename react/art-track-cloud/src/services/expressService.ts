import {Express} from "express";
import express from "express";
import compression from "compression";
import configService from "./configService";

export class ExpressService {

    app: Express;

    constructor() {
        const app = express();
        app.use(compression());
        this.app = app;
    }

    public getApp() {
        return this.app;
    }

    public serve() {
        const conf = configService.getConfig();

        this.app.listen(Number(conf.port), conf.host, () => {
            console.log("Serving on " + conf.scheme + "://" + conf.host + ":" + conf.port);
        });
    }
}

const service = new ExpressService();
export default service;
