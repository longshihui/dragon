import { BrowserWindow } from 'electron';
import { useService } from '@dragon-app/core';

export default useService({
    id: '渲染进程',
    async setup() {
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

        mainWindow.loadURL(import.meta.env.VITE_DEV_SERVER_URL);
    }
});
