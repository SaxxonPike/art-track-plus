import {ConfigModel} from "../models/configModel";
import fileService from "./fileService";

class ConfigService {
    private values: ConfigModel;

    constructor() {
        const values = {
            port: process.env.PORT || "3001",
            host: process.env.HOST || "127.0.0.1",
            db: process.env.DB || null,
            configFile: process.env.CONFIG || null,
            rootKey: process.env.ROOT_KEY || null,
            scheme: process.env.SCHEME || "http",
            noAuth: process.env.NO_AUTH == "true"
        };

        this.values = values;

        // Override config with file, if there is one.
        if (values.configFile) {
            const configFile = fileService.read(values.configFile);
            this.doOverride(JSON.parse(configFile.toString()));
        }
    }

    private doOverride(newValues: any) {
        Object.assign(this.values, newValues);
    }

    public getConfig(): ConfigModel {
        return this.values;
    }

    public override(newValues: any): ConfigModel {
        this.doOverride(newValues);
        return this.values;
    }
}

const service = new ConfigService();
export default service;
