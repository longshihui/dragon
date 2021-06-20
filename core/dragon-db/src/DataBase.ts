import DataBaseSource from './DataBaseSource';
import { getPath } from './util';

export default class DataBase<ModuleData> {
    private readonly namespace: string;
    private readonly source: DataBaseSource;
    constructor(namspace: string, source: DataBaseSource) {
        this.namespace = namspace;
        this.source = source;
    }
    defaults(defaultData: ModuleData) {
        return this.source.defaults(this.namespace, defaultData);
    }
    async set<K extends keyof ModuleData>(key: K, data: ModuleData[K]) {
        return await this.source.save(getPath(this.namespace, key), data);
    }
    get<K extends keyof ModuleData>(key: K): ModuleData[K] {
        return this.source.query(getPath(this.namespace, key));
    }
    getAll<K extends keyof ModuleData>(keys: K[]): Pick<ModuleData, K> {
        return keys.reduce((result, k) => {
            result[k] = this.get(k);
            return result;
        }, Object.create(null));
    }
    has<K extends keyof ModuleData>(key: K) {
        return this.source.exists(getPath(this.namespace, key));
    }
}
