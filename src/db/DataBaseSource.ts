import path from 'path';
import Lowdb from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';
import fs from 'fs';
import DebugFactory from 'debug';

const debug = DebugFactory('DataBaseSource');

export default class DataBaseSource {
    private readonly storePath: string;
    private lowdb: Lowdb.LowdbAsync<any>;
    constructor(options: { filename: string; dir: string }) {
        this.storePath = path.resolve(options.dir, './', options.filename);
        if (!fs.existsSync(this.storePath)) {
            fs.mkdirSync(this.storePath);
        }
        this.init();
    }
    private async init() {
        this.lowdb = await Lowdb(new FileAsync(this.storePath));
        debug('持久化数据存放路径', this.storePath);
    }
    async defaults(path: string, data: any) {
        await this.lowdb
            .defaultsDeep({
                [path]: data
            })
            .write();
    }
    async save(path: string, data: any) {
        await this.lowdb.set(path, data).write();
    }
    query(path: string) {
        const value = this.lowdb.get(path).value();
        return value ? value : null;
    }
    exists(path: string) {
        return this.lowdb.has(path).value();
    }
}
