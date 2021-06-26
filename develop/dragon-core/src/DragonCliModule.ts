/**
 * Cli模块抽象类
 */
import type DragonCli from './DragonCli';
import type { MODE } from './constants';
import type { Command } from 'commander';

interface runArguments<Data> {
    data: Data;
    mode: MODE;
    context: DragonCli;
}

abstract class DragonCliModule {
    public abstract readonly id: string;
    abstract registerCommand(): Command;
    // 初始化
    abstract init(context: DragonCli): Promise<void>;
    // 主程序
    abstract run<Data>(args: runArguments<Data>): Promise<void>;
    // 销毁
    abstract destroy(): Promise<void>;
}

export default DragonCliModule;
