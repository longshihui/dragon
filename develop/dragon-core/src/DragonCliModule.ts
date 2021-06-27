/**
 * Cli模块抽象类
 */
import type DragonCli from './DragonCli';
import type { Command } from 'commander';
import type { RunArguments } from './types';
abstract class DragonCliModule {
    public abstract readonly id: string;
    abstract registerCommand(program: Command): Command;
    // 初始化
    init(context: DragonCli): Promise<void> {
        return Promise.resolve();
    }
    // 主程序
    abstract run(args: RunArguments<any>): Promise<void>;
    // 销毁
    destroy(): Promise<void> {
        return Promise.resolve();
    }
}

export default DragonCliModule;
