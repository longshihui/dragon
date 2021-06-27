import { DragonCliModule } from '@dragon-cli/core';
import WebpackDevServer from 'webpack-dev-server';
import PortFinder from 'portfinder';

import type { RunArguments } from '@dragon-cli/core';
import type { Command } from 'commander';
class DevModule extends DragonCliModule {
    public id: string = 'dev';
    private usePort: number;
    registerCommand(program: Command): Command {
        return program.command('dev').description('运行开发环境代码');
    }
    async init() {
        this.usePort = await PortFinder.getPortPromise();
    }
    run(options: RunArguments<null>): Promise<void> {
        console.log('dev命令运行在mode:', options.mode);
        return Promise.resolve();
    }
}

export default DevModule;
