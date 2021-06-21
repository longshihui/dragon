import type { CommandEntry } from './types';
import type DragonCli from './DragonCli';

export default class DragonCliModuleInstallerApi {
    readonly context: DragonCli;
    constructor(context: DragonCli) {
        this.context = context;
    }
    registerCommand<Options>(command: string, entry: CommandEntry<Options>) {
        this.context.commands.set(command, entry);
    }
}
