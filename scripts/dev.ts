import webpack, { Compiler } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import MainProcessDevWebpackConfig from '../build/webpack-config/dev/main-process';
import RendererDevDllWebpackConfig from '../build/webpack-config/dev/renderer-process.dll';
import RendererDevWebpackConfig from '../build/webpack-config/dev/renderer-process';
import WorkerThreadsWebpackConfig from '../build/webpack-config/dev/worker-threads';
import portFinder from 'portfinder';
import path from 'path';
import CheckNodeEnv from '../build/utils/CheckNodeEnv';
import ChildProcess from 'child_process';
import rm from 'rimraf';
import Logger from '../build/utils/Logger';

CheckNodeEnv('development');
// 默认启动的端口
const DEFAULT_PORT = 1212;
// 默认启动的host
const DEFAULT_HOST = 'localhost';
// renderer进程的dll文件输出路径
const DLL_OUTPUT_PATH = path.join(__dirname, '..', 'dll');

/**
 * 清理救的文件
 */
async function cleanOldFiles() {
    Logger('default', '清理旧的构造文件中...');
    await new Promise((resolve, reject) => {
        rm(path.resolve(__dirname, '..', './dist'), err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
    Logger('default', '清理完成...');
}

/**
 * 构建renderer的dll文件
 */
async function buildDll() {
    Logger('renderer', '开始构建dll');
    await new Promise((resolve, reject) => {
        webpack(
            RendererDevDllWebpackConfig({
                outputPath: DLL_OUTPUT_PATH
            }),
            err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            }
        );
    });
    Logger('renderer', 'dll构建完成');
}
/**
 * 构建主进程代码
 */
async function buildMainProcess() {
    Logger('main', '主进程代码开始构建...');
    let complier = null;
    await new Promise<webpack.Compiler>((resolve, reject) => {
        complier = webpack(MainProcessDevWebpackConfig, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
    Logger('main', '主进程代码构建完成！');
    return complier;
}
async function buildWorkerThreads() {
    Logger('default', '工作线程打包中...');
    await new Promise((resolve, reject) => {
        const complier = webpack(WorkerThreadsWebpackConfig) as Compiler;
        complier.run(err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
    Logger('default', '工作线程打包完成！');
}
/**
 * 运行renderer所托管的静态资源服务器
 */
async function runServer() {
    portFinder.basePort = Number(process.env.PORT) || DEFAULT_PORT;
    const port = await portFinder.getPortPromise();
    const host = process.env.HOST || DEFAULT_HOST;
    const webpackConfig = RendererDevWebpackConfig({
        host,
        port,
        dllManifestPath: path.resolve(DLL_OUTPUT_PATH, 'renderer.json')
    });
    WebpackDevServer.addDevServerEntrypoints(
        webpackConfig,
        webpackConfig.devServer
    );
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(compiler, webpackConfig.devServer);
    server.listen(port, host);
    return server;
}
/**
 * 运行主进程
 * @param isRestart 是否为重启
 */
async function runMainProcess(isRestart?: boolean) {
    Logger('main', isRestart ? '重启中' : '启动App...');
    let childProcess = null;
    await new Promise((resolve, reject) => {
        childProcess = ChildProcess.exec(
            'electron ./dist/main.js',
            (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                    return;
                }
                Logger('main', stdout);
                console.error(stderr);
                resolve();
            }
        );
    });
    return childProcess;
}

(async function main() {
    await cleanOldFiles();
    await buildDll();
    const complier = await buildMainProcess();
    await buildWorkerThreads();
    const server = await runServer();
    let mainProcess = await runMainProcess();
    const handleProcessClose = () => {
        server.close(() => {
            process.exit(0);
        });
        if (!mainProcess.killed) {
            mainProcess.kill();
        }
    };
    process.on('SIGINT', handleProcessClose);
    process.on('SIGTERM', handleProcessClose);
    complier.watch({}, async err => {
        if (err) {
            console.error(err);
            return;
        }
        if (mainProcess && !mainProcess.killed) {
            mainProcess.kill();
            mainProcess = await runMainProcess(true);
        }
    });
})();
