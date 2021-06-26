import { DragonCli, DragonCliModule, MODE } from '@dragon-cli/core';

class DevModule extends DragonCliModule {
    init(context: DragonCli): Promise<void> {
        throw new Error('Method not implemented.');
    }
    destroy(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    run(options): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

export default DevModule;
