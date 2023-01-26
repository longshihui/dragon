import { createLogger, build, createServer } from 'vite';
import electronPath from 'electron';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

import type { LogLevel, InlineConfig, ViteDevServer } from 'vite';
import type { ChildProcessWithoutNullStreams } from 'child_process';

const mode = (process.env.MODE = process.env.MODE || 'development');
const LOG_LEVEL: LogLevel = 'info';
const MAIN_PATH = path.resolve('./dragon-core/app-main');
const RENDER_PATH = path.resolve('./dragon-core/app-render');
const ENT_DIR = process.cwd();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// 主进程配置文件
const MAIN_PROCESS_VITE_CONFIG = path.resolve(
    __dirname,
    '../config/vite.config.main.ts'
);
// 渲染进程配置文件
const RENDER_PROCESS_VITE_CONFIG = path.resolve(
    __dirname,
    '../config/vite.config.render.ts'
);

const sharedConfig: InlineConfig = {
    mode,
    envDir: ENT_DIR,
    build: {
        watch: {}
    },
    logLevel: LOG_LEVEL
};

/** 忽略stderr的日志输出 */
const stderrFilterPatterns = [
    // warning about devtools extension
    // https://github.com/cawa-93/vite-electron-builder/issues/492
    // https://github.com/MarshallOfSound/electron-devtools-installer/issues/143
    /ExtensionLoadWarning/
];

/**
 * 启动主进程，并且当文件发生变化时重启App
 */
function startMainProcess(renderDevServer: ViteDevServer) {
    // Write a value to an environment variable to pass it to the main process.
    {
        const protocol = `http${
            renderDevServer.config.server.https ? 's' : ''
        }:`;
        const host = renderDevServer.config.server.host || 'localhost';
        const port = renderDevServer.config.server.port; // Vite searches for and occupies the first free port: 3000, 3001, 3002 and so on
        const path = '/';
        process.env.VITE_DEV_SERVER_URL = `${protocol}//${host}:${port}${path}`;
    }

    const logger = createLogger(LOG_LEVEL, {
        prefix: '[main]'
    });

    let spawnProcess: ChildProcessWithoutNullStreams | null = null;

    return build({
        configFile: MAIN_PROCESS_VITE_CONFIG,
        root: MAIN_PATH,
        plugins: [
            {
                name: 'main-process-watcher',
                writeBundle() {
                    if (spawnProcess !== null) {
                        spawnProcess.kill('SIGINT');
                        spawnProcess = null;
                    }

                    spawnProcess = spawn(String(electronPath), [
                        path.resolve(MAIN_PATH, './dist/main.cjs')
                    ]);

                    spawnProcess.stdout.on(
                        'data',
                        d =>
                            d.toString().trim() &&
                            logger.warn(d.toString(), { timestamp: true })
                    );
                    spawnProcess.stderr.on('data', d => {
                        const data = d.toString().trim();
                        if (!data) return;
                        const mayIgnore = stderrFilterPatterns.some(r =>
                            r.test(data)
                        );
                        if (mayIgnore) return;
                        logger.error(data, { timestamp: true });
                    });
                }
            }
        ]
    });
}
/**
 * 启动渲染进程
 */
async function startRender() {
    const server = await createServer({
        ...sharedConfig,
        configFile: RENDER_PROCESS_VITE_CONFIG,
        root: RENDER_PATH
    });

    await server.listen();

    server.printUrls();

    return server;
}

(async () => {
    try {
        const devServer = await startRender();
        await startMainProcess(devServer);
    } catch (error) {
        console.error(error);
        process.exit(-1);
    }
})();
