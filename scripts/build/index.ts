#!/usr/bin/env node
import { createLogger, build, createServer } from 'vite';
import electronPath from 'electron';
import { spawn } from 'child_process';
import path from 'path';

import type { LogLevel, InlineConfig, ViteDevServer } from 'vite';
import type { ChildProcessWithoutNullStreams } from 'child_process';

const mode = (process.env.MODE = process.env.MODE || 'development');

const LOG_LEVEL: LogLevel = 'info';

const MAIN_PATH = path.resolve('./dragon-app-main');
const RENDER_PATH = path.resolve('./dragon-app');

const sharedConfig: InlineConfig = {
    mode,
    build: {
        watch: {}
    },
    logLevel: LOG_LEVEL
};

/** Messages on stderr that match any of the contained patterns will be stripped from output */
const stderrFilterPatterns = [
    // warning about devtools extension
    // https://github.com/cawa-93/vite-electron-builder/issues/492
    // https://github.com/MarshallOfSound/electron-devtools-installer/issues/143
    /ExtensionLoadWarning/
];

/**
 * Start or restart App when source files are changed
 */
function setupMainPackageWatcher(viteDevServer: ViteDevServer) {
    // Write a value to an environment variable to pass it to the main process.
    {
        const protocol = `http${viteDevServer.config.server.https ? 's' : ''}:`;
        const host = viteDevServer.config.server.host || 'localhost';
        const port = viteDevServer.config.server.port; // Vite searches for and occupies the first free port: 3000, 3001, 3002 and so on
        const path = '/';
        process.env.VITE_DEV_SERVER_URL = `${protocol}//${host}:${port}${path}`;
    }

    const logger = createLogger(LOG_LEVEL, {
        prefix: '[main]'
    });

    let spawnProcess: ChildProcessWithoutNullStreams | null = null;

    return build({
        configFile: path.resolve(MAIN_PATH, 'vite.config.ts'),
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
async function setupRender() {
    const server = await createServer({
        ...sharedConfig,
        configFile: path.resolve(RENDER_PATH, 'vite.config.ts'),
        root: RENDER_PATH
    });

    await server.listen();

    server.printUrls();

    return server;
}

(async () => {
    try {
        const devServer = await setupRender();
        await setupMainPackageWatcher(devServer);
    } catch (error) {
        console.error(error);
        process.exit(-1);
    }
})();
