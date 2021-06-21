import DragonCliModuleApi from './DragonCliModuleApi';
import type { CommandEntry, DragonCliModule } from './types';

export default class DragonCli {
    private readonly mode: string;
    // 命令集合
    readonly commands: Map<string, CommandEntry<any>> = new Map();
    constructor(mode) {
        this.mode = mode;
    }
    async registerModule(dragonModule: DragonCliModule) {
        if (!(dragonModule.mode === this.mode)) {
            return;
        }
        const api = new DragonCliModuleApi(this);
        await dragonModule.install(api);
    }
    /**
     * 运行一个命令
     * @param command 命令名
     * @param options 命令执行时的参数
     */
    async runCommand<CommandOptions>(
        command: string,
        options: CommandEntry<CommandOptions>
    ) {
        if (!this.commands.has(command)) {
            throw new Error(`命令: ${command} 未找到`);
        }
        const entry = this.commands.get(command);
        return await entry(options);
    }
}
