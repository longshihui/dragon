import webpack, { Compiler, Watching } from 'webpack';
import WebpackDevServer, {
    Configuration as DevServerConfiguartion
} from 'webpack-dev-server';
import MainProcessDevWebpackConfig from '../webpack-config/dev/main-process';
import RendererDevDllWebpackConfig from '../webpack-config/dev/renderer-process.dll';
import getRendererDevWebpackConfig from '../webpack-config/dev/renderer-process';
import WorkerThreadsWebpackConfig from '../webpack-config/dev/worker-threads';
import portFinder from 'portfinder';
import path from 'path';
import CheckNodeEnv from '../utils/CheckNodeEnv';
import ChildProcess from 'child_process';
import rm from 'rimraf';
import Logger, { LoggerType } from '../utils/Logger';

CheckNodeEnv('development');
// 默认启动的端口
const DEFAULT_PORT = 1212;
// 默认启动的host
const DEFAULT_HOST = 'localhost';
// renderer进程的dll文件输出路径
const DLL_OUTPUT_PATH = path.join(process.cwd(), '..', 'dll');

let WebpackCompilers: {
    main: Compiler;
    render: Compiler;
    worker: Compiler;
    dll: Compiler;
} = {
    main: null,
    render: null,
    worker: null,
    dll: null
};
let mainProcess: ChildProcess.ChildProcess = null;
let isStaringMainProcess = false;
let rendererServer = null;
let rendererServerConfig: DevServerConfiguartion = {};
const WatchingMap: {
    main: Watching;
    worker: Watching;
} = {
    main: null,
    worker: null
};
/**
 * 清理救的文件
 */
async function cleanOldFiles() {
    Logger('master', '清理旧的构造文件中...');
    await new Promise((resolve, reject) => {
        rm(path.resolve(__dirname, '..', './dist'), err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
    Logger('master', '清理完成...');
}

// 准备webpack环境
async function prepareCompliers() {
    Logger('master', '准备Compiler');
    portFinder.basePort = Number(process.env.PORT) || DEFAULT_PORT;

    const port = await portFinder.getPortPromise();
    const host = process.env.HOST || DEFAULT_HOST;

    const RendererDevWebpackConfig = getRendererDevWebpackConfig({
        host,
        port,
        dllManifestPath: path.resolve(DLL_OUTPUT_PATH, 'renderer.json')
    });

    rendererServerConfig = RendererDevWebpackConfig.devServer;

    WebpackDevServer.addDevServerEntrypoints(
        RendererDevWebpackConfig,
        RendererDevWebpackConfig.devServer
    );

    WebpackCompilers.main = webpack(MainProcessDevWebpackConfig);
    WebpackCompilers.dll = webpack(
        RendererDevDllWebpackConfig({
            outputPath: DLL_OUTPUT_PATH
        })
    );
    WebpackCompilers.render = WebpackCompilers.render = webpack(
        RendererDevWebpackConfig
    );
    WebpackCompilers.worker = WebpackCompilers.worker = webpack(
        WorkerThreadsWebpackConfig
    );
    Logger('master', 'Compiler准备完毕！');
}
// 注入logger钩子
function prepareCompilerLoggerHooks() {
    injectLoggerHooks(WebpackCompilers.main, {
        type: 'main',
        firstCompileBeginText: '开始编译Main',
        firstCompileEndText: 'Main编译完成',
        watchRunBeginText: '开始更新Main代码...',
        watchRunEndText: 'Main代码更新完成'
    });

    injectLoggerHooks(WebpackCompilers.worker, {
        type: 'worker',
        firstCompileBeginText: '开始编译Worker',
        firstCompileEndText: 'Worker编译完成',
        watchRunBeginText: '开始更新Worker代码',
        watchRunEndText: 'Worker更新完成'
    });

    injectLoggerHooks(WebpackCompilers.dll, {
        type: 'renderer',
        firstCompileBeginText: '开始编译Renderer DLL',
        firstCompileEndText: 'Renderer DLL编译完成'
    });

    injectLoggerHooks(WebpackCompilers.render, {
        type: 'renderer',
        firstCompileBeginText: '开始编译Renderer',
        firstCompileEndText: 'Renderer编译完成',
        watchRunBeginText: '开始更新Renderer代码',
        watchRunEndText: 'Renderer文件更新完成'
    });

    function injectLoggerHooks(
        compiler: Compiler,
        options: {
            type: LoggerType;
            firstCompileBeginText?: string;
            firstCompileEndText?: string;
            watchRunBeginText?: string;
            watchRunEndText?: string;
        }
    ) {
        let isFirstComplie = true;
        if (options.firstCompileBeginText) {
            compiler.hooks.beforeRun.tap('dragon:firstRun', function () {
                Logger(options.type, options.firstCompileBeginText);
            });
        }
        if (options.watchRunBeginText) {
            compiler.hooks.watchRun.tap('dragon:watchRun', function () {
                Logger(options.type, options.watchRunBeginText);
            });
        }
        compiler.hooks.done.tap('dragon:done', function () {
            if (isFirstComplie) {
                isFirstComplie = false;
                if ((options.type, options.firstCompileEndText)) {
                    Logger(options.type, options.firstCompileEndText);
                }
                return;
            }
            if (options.watchRunEndText) {
                Logger(options.type, options.watchRunEndText);
            }
        });
    }
}

async function startMainProcess() {
    if (mainProcess) {
        mainProcess.kill(9);
        mainProcess = null;
    }
    if (mainProcess === null && isStaringMainProcess) {
        return;
    }
    try {
        Logger('main', '启动主进程');
        await new Promise((resolve, reject) => {
            isStaringMainProcess = true;
            mainProcess = ChildProcess.exec(
                'electron ./dist/main.js',
                (err, stdout, stderr) => {
                    if (err) {
                        reject(err);
                        Logger('main', err.message);
                        Logger('main', stderr);
                        return;
                    }
                    Logger('main', stdout);
                    resolve();
                }
            );
        });
    } catch (error) {
        Logger('main', '启动主进程失败');
    }
    isStaringMainProcess = false;
}

async function runCompilers() {
    await Promise.all([
        new Promise(function (resolve, reject) {
            let isFirstCompile = true;
            WebpackCompilers.main.hooks.done.tap(
                'dragon:main-process:run',
                function () {
                    resolve();
                }
            );
            WebpackCompilers.main.hooks.failed.tap(
                'dragon:main-process:run',
                function (err) {
                    reject(err);
                }
            );
            WebpackCompilers.main.watch({}, (err, stats) => {
                if (isFirstCompile) {
                    isFirstCompile = false;
                    return;
                }
                if (err) {
                    Logger('main', err.message);
                    return;
                }
                startMainProcess();
            });
        }),
        new Promise(function (resolve, reject) {
            WebpackCompilers.dll.run(err => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        }),
        new Promise(function (resolve, reject) {
            let isFirstCompile = true;
            WebpackCompilers.worker.hooks.done.tap(
                'dragon:worker:run',
                function () {
                    resolve();
                }
            );
            WebpackCompilers.worker.hooks.failed.tap(
                'dragon:worker:run',
                function (err) {
                    reject(err);
                }
            );
            WebpackCompilers.worker.watch({}, (err, stats) => {
                if (isFirstCompile) {
                    isFirstCompile = false;
                    return;
                }
                if (err) {
                    Logger('worker', err.message);
                    return;
                }
                startMainProcess();
            });
        }),
        new Promise(function (resolve, reject) {
            WebpackCompilers.render.hooks.done.tap(
                'dragon:renderer:run',
                () => {
                    resolve();
                }
            );
            WebpackCompilers.worker.hooks.failed.tap(
                'dragon:worker:run',
                function (err) {
                    reject(err);
                }
            );
            rendererServer = new WebpackDevServer(
                WebpackCompilers.render,
                rendererServerConfig
            );
            rendererServer.listen(
                rendererServerConfig.port,
                rendererServerConfig.host,
                err => {
                    if (err) {
                        Logger('renderer', err);
                        return;
                    }
                    Logger(
                        'renderer',
                        `http服务启动在: http://${rendererServerConfig.host}:${rendererServerConfig.port}`
                    );
                }
            );
        })
    ]);
}

async function killMasterProcess() {
    try {
        await Promise.all([
            await new Promise(resolve => {
                rendererServer.close(() => {
                    resolve();
                });
            }),
            Object.keys(WatchingMap).map(name => {
                return new Promise(resolve => {
                    (WatchingMap[name] as Watching).close(resolve);
                });
            })
        ]);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(-1);
    }
}
function listenProcessSignals() {
    process.on('SIGINT', killMasterProcess);
    process.on('SIGTERM', killMasterProcess);
}

(async function main() {
    try {
        await Promise.all([cleanOldFiles(), prepareCompliers()]);
        prepareCompilerLoggerHooks();
        await runCompilers();
        listenProcessSignals();
        startMainProcess();
    } catch (error) {
        Logger('master', error.message);
        process.exit(-1);
    }
})();
