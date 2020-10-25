import path from 'path';
import Lowdb from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';
import fs from 'fs';
import { warn } from '@/utils';

export default class DataBaseSource {
    private readonly storePath: string;
    private readonly storeDir: string;
    private lowdb: Lowdb.LowdbAsync<any>;
    constructor(options: { filename: string; dir: string }) {
        this.storeDir = options.dir;
        this.storePath = path.resolve(options.dir, './', options.filename);
        this.init();
    }
    private async init() {
        const { storePath, storeDir } = this;
        const adapter = new FileAsync(storePath);
        if (!fs.existsSync(storePath)) {
            fs.mkdirSync(storeDir);
        }
        this.lowdb = await Lowdb(adapter);
        warn('持久化数据存放路径', storePath);
    }
    async save(path: string, data: any) {
        this.lowdb.set(path, data).write();
    }
    async query(path: string) {
        const value = this.lowdb.get(path).value();
        return value ? value : null;
    }
    async exists(path: string) {
        return this.lowdb.has(path);
    }
}
