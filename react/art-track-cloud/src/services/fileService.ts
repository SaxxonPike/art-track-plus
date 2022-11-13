import fs from "fs";
import path from "path";
import {FileInfoModel} from "../models/fileInfoModel";

class FileService {
    read(name: string) {
        return new Promise((resolve, reject) => {
            try {
                resolve(fs.readFileSync(name));
            } catch (e) {
                reject(e);
            }
        });
    }

    pathOf(...frags: string[]) {
        return path.resolve(...frags.filter(f => !!f));
    }

    write(name: string, data: Buffer) {
        return new Promise<void>((resolve, reject) => {
            try {
                fs.writeFileSync(name, data);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    del(name: string) {
        return new Promise<void>((resolve, reject) => {
            try {
                fs.rmSync(name);
                resolve();
            } catch (e) {
                reject(e);
            }
        })
    }

    dirInfo(pattern: string, recursive: boolean = false) {
        return new Promise<FileInfoModel[]>((resolve, reject) => {
            try {
                resolve(fs.readdirSync(pattern)
                    .map(n => ({name: n, info: fs.statSync(n)}))
                    .map(i => ({
                        name: i.name,
                        created: i.info.ctimeMs,
                        modified: i.info.mtimeMs
                    })));
            } catch (e) {
                reject(e);
            }
        });
    }

    info(name: string) {
        return new Promise<FileInfoModel>((resolve, reject) => {
            try {
                const stat = fs.statSync(name)
                resolve({
                    name: name,
                    created: stat.ctimeMs,
                    modified: stat.mtimeMs
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}

const service = new FileService();
export default service;
