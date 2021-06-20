interface CommandEntry<Options> {
    (options: Options): Promise<void>;
}

export default class DragonCli {
    // 命令集合
    commands: Map<string, CommandEntry<any>> = new Map();
    /**
     * 注册一个新的命令
     * @param command 命令名
     * @param entry 命令入口
     */
    registerCommand<CommandOptions>(
        command: string,
        entry: CommandEntry<CommandOptions>
    ) {
        this.commands.set(command, entry);
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
            throw new Error();
        }
        const entry = this.commands.get(command);
        return await entry(options);
    }
}
