import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import MainProcessDevWebpackConfig from '../build/webpack.config.main.dev';
import RendererDevDllWebpackConfig from '../build/webpack.config.renderer.dev.dll';
import RendererDevWebpackConfig from '../build/webpack.config.renderer.dev';
import portFinder from 'portfinder';
import path from 'path';
import CheckNodeEnv from '../build/utils/CheckNodeEnv';
import ChildProcess from 'child_process';
import rm from 'rimraf';
import Logger from '../build/utils/Logger';

CheckNodeEnv('development');

const DEFAULT_PORT = 1212;
const DEFAULT_HOST = 'localhost';
const DLL_OUTPUT_PATH = path.join(__dirname, '..', 'dll');

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

async function main() {
    await cleanOldFiles();
    await buildDll();
    const complier = await buildMainProcess();
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
        console.log('change');
        if (err) {
            console.error(err);
            return;
        }
        if (mainProcess && !mainProcess.killed) {
            mainProcess.kill();
            mainProcess = await runMainProcess();
        }
    });
}

main();
