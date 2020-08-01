/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 */
import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';
import ElectronDebug from 'electron-debug';
import sourceMapSupport from 'source-map-support';
import ElectronDevtoolsInstaller, {
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS
} from 'electron-devtools-installer';

const STATIC_PATH =
    process.env.NODE_ENV === 'development'
        ? path.resolve(__dirname, '..', './public')
        : path.resolve(__dirname, './');

(async function bootstarp() {
    await developmentEnvSetup();
    await appSetup();
    await initMainBrowserWindow();
})();

// 开发模式设置
async function developmentEnvSetup() {
    if (process.env.NODE_ENV === 'production') {
        sourceMapSupport.install();
    }

    if (
        process.env.NODE_ENV === 'development' ||
        process.env.DEBUG_PROD === 'true'
    ) {
        ElectronDebug();
    }

    if (
        process.env.NODE_ENV === 'development' ||
        process.env.DEBUG_PROD === 'true'
    ) {
        await installExtensions();
    }

    async function installExtensions() {
        // 无vpn环境下
        // BrowserWindow.addDevToolsExtension(
        //   path.resolve(
        //     process.env.HOME,
        //     "./Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0"
        //   )
        // );
        const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
        const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];

        return Promise.all(
            extensions.map(name =>
                ElectronDevtoolsInstaller(name, forceDownload)
            )
        ).catch(console.log);
    }
}

async function appSetup() {
    app.setName('Dragon');
    // 隐藏原生菜单栏
    Menu.setApplicationMenu(null);
    if (process.platform === 'darwin') {
        app.dock.setIcon(
            path.resolve(STATIC_PATH, './app-icon/png/1024x1024.png')
        );
    }
    app.on('window-all-closed', () => {
        // Respect the OSX convention of having the application in memory even
        // after all windows have been closed
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
    return new Promise(resolve => {
        app.on('ready', resolve);
    });
}

function initMainBrowserWindow() {
    let mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        },
        icon: path.resolve(STATIC_PATH, './app-icon/win/icon.ico')
    });

    if (
        process.env.NODE_ENV === 'development' ||
        process.env.DEBUG_PROD === 'true'
    ) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.once('ready-to-show', () => {
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    });

    mainWindow.once('closed', () => {
        mainWindow = null;
    });

    mainWindow.loadURL(
        `file://${path.resolve(__dirname, '..', './public/app.html')}`
    );
}
