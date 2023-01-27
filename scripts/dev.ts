/**
 * dev脚本用于本地调试应用程序
 * 此脚本将会做以下工作：
 * 1. 构建并监听渲染进程代码，当渲染进程代码变化更新后，通过HMR的方式更新至渲染进程中
 * 2. 构建并监听主进程代码，当主进程代码发生变化后，重启整个应用
 * 3. 构建并监听预加载脚本代码，当预加载脚本代码发生变化和更新后，重启整个应用
 */
import { createLogger, build, createServer } from 'vite';
import electronPath from 'electron';
import { spawn } from 'child_process';
import path from 'node:path';
import { existsSync } from 'node:fs';

import type { LogLevel } from 'vite';
import type { ChildProcessWithoutNullStreams } from 'child_process';

const LOG_LEVEL: LogLevel = 'info';
const OUTPUT = path.join(process.cwd(), 'dist');

process.env.MODE = 'development';

const mainProcess = (function () {
    const logger = createLogger(LOG_LEVEL, {
        prefix: '[main]'
    });

    let spawnProcess: ChildProcessWithoutNullStreams | null = null;
    const entryFile = path.resolve(OUTPUT, './main.cjs');

    const start = () => {
        if (!existsSync(entryFile)) {
            return;
        }

        if (spawnProcess !== null) {
            spawnProcess.kill('SIGINT');
            spawnProcess = null;
        }

        spawnProcess = spawn(String(electronPath), [entryFile]);

        spawnProcess.stdout.on(
            'data',
            d =>
                d.toString().trim() &&
                logger.warn(d.toString(), { timestamp: true })
        );
        spawnProcess.stderr.on('data', d => {
            const data = d.toString().trim();
            if (!data) return;
            logger.error(data, { timestamp: true });
        });
    };

    return {
        start,
        reload: start
    };
})();

async function watchRender() {
    const devServer = await createServer({
        mode: process.env.MODE,
        configFile: path.resolve(process.cwd(), './vite.config.render.ts'),
        root: path.resolve(process.cwd(), './src/app-render'),
        envDir: process.cwd()
    });

    await devServer.listen();

    const protocol = `http${devServer.config.server.https ? 's' : ''}:`;
    const host = devServer.config.server.host || 'localhost';
    const port = devServer.config.server.port;

    process.env.VITE_DEV_SERVER_URL = `${protocol}//${host}:${port}/`;

    devServer.printUrls();
}

function watchPreload() {
    return build({
        mode: process.env.MODE,
        configFile: path.resolve(process.cwd(), './vite.config.preload.ts'),
        plugins: [
            {
                name: 'preload-watcher',
                writeBundle() {
                    mainProcess.reload();
                }
            }
        ]
    });
}

/**
 * 启动主进程，并且当文件发生变化时重启App
 */
function watchMainProcess() {
    return build({
        mode: process.env.MODE,
        configFile: path.resolve(process.cwd(), './vite.config.ts'),
        plugins: [
            {
                name: 'main-process-watcher',
                writeBundle() {
                    mainProcess.start();
                }
            }
        ]
    });
}

(async () => {
    try {
        await watchRender();
        await watchPreload();
        await watchMainProcess();
    } catch (error) {
        console.error(error);
        process.exit(-1);
    }
})();
