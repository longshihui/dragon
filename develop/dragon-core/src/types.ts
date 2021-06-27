import type DragonCli from './DragonCli';

export interface RunArguments<Data> {
    data: Data;
    mode: string;
    context: DragonCli;
}
