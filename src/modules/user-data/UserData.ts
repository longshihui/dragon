import path from 'path';
import lowdb from 'lowdb';
import FileAsync from 'lowdb/adapters/FileAsync';

const USER_DATA_NAME = 'Dragon.json';
const USER_DATA_PATH = path.resolve(process.env.HOME, USER_DATA_NAME);

let adpater = new FileAsync(USER_DATA_PATH);
const db = lowdb(adpater);

async function getDataBase() {
  return await db;
}

export { getDataBase };
