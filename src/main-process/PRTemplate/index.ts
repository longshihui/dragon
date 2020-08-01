import { ipcMain } from 'electron';
import { dialog } from 'electron';
import { IPCEvents } from './constants';

ipcMain.on(IPCEvents.SELECT_DIRECTORY, async event => {
    const { filePaths } = await await dialog.showOpenDialog(null, {
        properties: ['openDirectory'],
        buttonLabel: '选择文件夹'
    });
    let dir = null;
    if (filePaths.length > 0) {
        dir = filePaths[0];
    }
    event.reply(IPCEvents.SELECT_DIRECTORY, dir);
});
