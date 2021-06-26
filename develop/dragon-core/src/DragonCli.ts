import type DragonCliModule from './DragonCliModule';
import { MODE } from './constants';
import type { Command } from 'commander';

const MODE_VALUES = Object.keys(MODE);
export default class DragonCli {
    // 命令集合
    readonly modules: Map<string, DragonCliModule> = new Map();
    mode: MODE;
    async registerModule(dragonModule: DragonCliModule) {
        this.modules.set(dragonModule.id, dragonModule);
    }
    init(mode: MODE) {
        this.mode = mode;
    }
    /**
     * 运行一个命令
     */
    async runModule(mode: MODE, moduleId: string, data: any) {
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
    run(program: Command) {
        const modules = [...this.modules.values()];

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
            const command = module.registerCommand();
            command.requiredOption(
                '-m, --mode <mode>',
                `模式 ${MODE_VALUES.join(' | ')}`
            );
            command.action(options => {
                const data = Object.assign({}, options);
                delete data.mode;
                this.runModule(options.mode, module.id, data);
            });
        });

        program.parse();
    }
}
