import { app, remote } from 'electron';
import DataBaseSource from './DataBaseSource';
import DataBase from './DataBase';

const source = new DataBaseSource({
    filename: 'Dragon.json',
    dir:
        process.type === 'main'
            ? app.getPath('userData')
            : remote.app.getPath('userData')
});

export default function DataBaseFactory<ModuleData>(namespacee: string) {
    return new DataBase<ModuleData>(namespacee, source);
}
