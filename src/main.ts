/**
 * Dragon主进程
 */
import { BrowserWindow, app } from 'electron';

function createWindow(url: string) {
    let mainWindow: BrowserWindow | null = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
        //icon: path.resolve(STATIC_PATH, './app-icon/win/icon.ico')
    });

    if (import.meta.env.DEV) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.once('ready-to-show', () => {
        if (!mainWindow) {
            return;
        }
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.once('closed', () => {
        mainWindow = null;
    });

    mainWindow.loadURL(url);
}

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.exit();
    }
});

async function main() {
    try {
        await app.whenReady();
        createWindow(import.meta.env.VITE_DEV_SERVER_URL);
    } catch (error) {
        console.error(error);
        app.exit();
    }
}

main();
