import fileService from "./fileService";
import configService from "./configService";
import {FileInfoModel} from "../models/fileInfoModel";
import {randomUUID} from "crypto";

class DataService {
    private getName(input: string) {
        const result = input.toLowerCase().replace(/\W/g, '');
        if (!result)
            throw "getName result is empty";
        return result;
    }

    private getTenantPattern(tenant: string) {
        return fileService.pathOf(
            configService.getConfig().db,
            `${this.getName(tenant)}`,
            `*.json`
        );
    }

    private getTablePattern(tenant: string, table: string) {
        return fileService.pathOf(
            configService.getConfig().db,
            `${this.getName(tenant)}`,
            `${this.getName(table)}.*.json`
        );
    }

    private getPath(tenant: string, table: string, id: string) {
        return fileService.pathOf(
            configService.getConfig().db,
            `${this.getName(tenant)}`,
            `${this.getName(table)}.${this.getName(id)}.json`
        );
    }

    private async resolveFileInfo(fileInfo: FileInfoModel) {
        return {
            id: fileInfo.name.split(".")[2],
            created: fileInfo.created,
            modified: fileInfo.modified,
            data: await fileService.read(fileInfo.name)
        };
    }

    public async getAllRecords(tenant: string) {
        const dir = await fileService.dirInfo(this.getTenantPattern(tenant));
        return Promise.all(dir.map(this.resolveFileInfo));
    }

    public async getRecord(tenant: string, table: string, id: string) {
        const path = this.getPath(tenant, table, id);
        const info = await fileService.dirInfo(path);
        if (!info)
            throw "Record not found";
        return this.resolveFileInfo(info[0]);
    }

    public async getRecords(tenant: string, table: string, start: number, end: number) {
        const dir = await fileService.dirInfo(this.getTablePattern(tenant, table));
        const targets = dir.filter(n => n.modified >= start && n.modified < end);
        return Promise.all(targets.map(this.resolveFileInfo));
    }

    public async createRecord(tenant: string, table: string, record: any) {
        const id = randomUUID();
        return this.setRecord(tenant, table, id, record);
    }

    public async setRecord(tenant: string, table: string, id: string, record: any) {
        await fileService.write(this.getPath(tenant, table, id), new Buffer(JSON.stringify(record)));
    }

    public async deleteRecord(tenant: string, table: string, id: string) {
        await fileService.del(this.getPath(tenant, table, id));
    }
}

const service = new DataService();
export default service;
