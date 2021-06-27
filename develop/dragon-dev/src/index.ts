import { DragonCliModule } from '@dragon-cli/core';
import type { RunArguments } from '@dragon-cli/core';
import { Command } from 'commander';

class DevModule extends DragonCliModule {
    public id: string = 'dev';
    registerCommand(program: Command): Command {
        return program.command('dev').description('运行开发环境代码');
    }
    run(options: RunArguments<null>): Promise<void> {
        console.log('dev命令运行在mode:', options.mode);
        return Promise.resolve();
    }
}

export default DevModule;
