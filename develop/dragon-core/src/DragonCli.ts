import type DragonCliModule from './DragonCliModule';
import { Command } from 'commander';
export default class DragonCli {
    // 命令集合
    readonly modules: Map<string, DragonCliModule> = new Map();
    mode: string;
    async registerModule(dragonModule: DragonCliModule) {
        this.modules.set(dragonModule.id, dragonModule);
    }
    init(mode: string) {
        this.mode = mode;
    }
    /**
     * 运行一个命令
     */
    async runModule(mode: string, moduleId: string, data: any) {
        if (this.modules.has(moduleId)) {
            throw new Error(`Dragon Cli: 模块${moduleId}不存在!`);
        }
        const cliModule = this.modules.get(moduleId);

        await cliModule.init(this);
        await cliModule.run({
            mode,
            data,
            context: this
        });
    }
    async destroy() {
        const modules = [...this.modules.values()];
        await Promise.all(modules.map(m => m.destroy()));
        process.exit(0);
    }
    run(mode: string) {
        const modules = [...this.modules.values()];
        const program = new Command();

        program
            .version('beta', '-v, --version', '当前cli版本')
            .name('dragon-cli')
            .usage('<command> --mode <mode>')
            .description('Dragon Cli, 为Dragon App量身打造。')
            .helpOption('-h, --help', '显示帮助信息')
            .addHelpCommand(false)
            .addHelpCommand('help', '显示帮助信息');

        program.on('command:*', () => {
            program.help();
        });

        modules.forEach(module => {
            module.registerCommand(program).action(options => {
                this.runModule(mode, module.id, options);
            });
        });

        program.parse();
    }
}
