import path from 'path';

export const isDev = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

export function warn(...messages: string[]) {
    if (isDev) {
        console.warn(messages);
    }
}
/**
 * 解析应用运行时worker文件对应路径
 * @param workerName worker名字
 * @description 路径为约定，默认和主进程文件在同一路径下
 */
export function resolveWorker(workerName: string): string {
    const dir = isDev ? './dist' : './';
    return path.join(process.cwd(), dir, `${workerName}.worker.js`);
}
