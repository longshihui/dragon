import { DragonCliModule } from '@dragon-cli/core';
import { Command } from 'commander';

class DevModule extends DragonCliModule {
    public id: string = 'dev';
    registerCommand(program: Command): Command {
        return program.command('dev').description('运行开发环境代码');
    }
    run(): Promise<void> {
        console.log('dev');
        return Promise.resolve();
    }
}

export default DevModule;
