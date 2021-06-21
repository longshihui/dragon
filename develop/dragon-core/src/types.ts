import type DragonCliModuleApi from './DragonCliModuleApi';

export interface CommandEntry<Options> {
    (options: Options): Promise<void>;
}

export interface DragonCliModule {
    mode: string;
    install: (api: DragonCliModuleApi) => void;
}
