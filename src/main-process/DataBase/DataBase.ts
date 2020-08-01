import path from 'path';
import lowdb from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';
import { app, remote } from 'electron';
import fs from 'fs';
import { warn } from '@/utils';
// 持久化数据文件名
const USER_DATA_NAME = 'Dragon.json';
// 持久化数据存放路径
const USER_DATA_PATH =
    process.type === 'main'
        ? app.getPath('userData')
        : remote.app.getPath('userData');

if (!fs.existsSync(USER_DATA_PATH)) {
    fs.mkdirSync(USER_DATA_PATH);
}

warn('持久化数据存放路径', USER_DATA_PATH);

let adapter = new FileAsync(path.resolve(USER_DATA_PATH, './', USER_DATA_NAME));
const Database = lowdb(adapter);

export default {
    async connect() {
        return Database;
    },
    async defaults(key, value) {
        const db = await this.connect();
        if (!db.has(key).value()) {
            db.set(key, value).write();
        }
    }
};
