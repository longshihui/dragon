import { levelLog } from './Logger';

export default function CheckNodeEnv(expectedEnv: string) {
    if (!expectedEnv) {
        throw new Error('未指定运行环境');
    }

    if (process.env.NODE_ENV !== expectedEnv) {
        levelLog(
            'error',
            `当前的运行环境需要指定为：${expectedEnv}，请检查process.env.NODE_ENV配置`
        );
        process.exit(2);
    }
}
