import DataBaseSource from './DataBaseSource';
import { getPath } from './util';

export default class DataBase {
    private readonly context: string | null = '';
    source: DataBaseSource = null;
    constructor(options: { source: DataBaseSource; context?: string }) {
        this.context = options.context || this.context;
    }
    save(path: string, data: any) {
        return this.source.save(getPath(this.context, path), data);
    }
    async query(path: string) {
        return this.source.query(getPath(this.context, path));
    }
    async exists(path: string) {
        return this.source.exists(getPath(this.context, path));
    }
    fork(subModule?: string) {
        return new DataBase({
            source: this.source,
            context: getPath(this.context, subModule)
        });
    }
}
