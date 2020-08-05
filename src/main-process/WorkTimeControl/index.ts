import { ipcMain, Notification, dialog } from 'electron';
import { IPCEvents } from './contants';
import { getLogoPngAbsolutePath } from '@/utils/assets';
import { execSync, exec } from 'child_process';

ipcMain.on(IPCEvents.NOTIFICATION_EXAMPLE, () => {
    const notification = new Notification({
        title: 'Dragon - 工作时间控制器',
        body: '本段工作时间结束啦，快起来活动一下！',
        icon: getLogoPngAbsolutePath()
    });
    notification.show();
});

ipcMain.on(IPCEvents.ALERT_EXAMPLE, () => {
    dialog.showMessageBoxSync({
        type: 'info',
        title: 'Dragon - 工作时间控制器',
        message: '本段工作时间结束啦，拉伸一下吧！',
        icon: getLogoPngAbsolutePath()
    });
});

ipcMain.on(IPCEvents.AUTO_LOCK_SCREEN_EXAMPLE, () => {
    const notification = new Notification({
        title: 'Dragon - 工作时间控制器',
        body: '本段工作时间结束啦，30秒后即将自动锁屏，拉伸一下吧！',
        icon: getLogoPngAbsolutePath()
    });
    notification.show();
    setTimeout(function () {
        notification.close();
        if (process.platform === 'win32') {
            execSync('rundll32.exe user32.dll,LockWorkStation');
        }
        if (process.platform === 'darwin') {
            execSync(
                '/System/Library/CoreServices/Menu Extras/User.menu/Contents/Resources/CGSession -suspend'
            );
        }
    }, 1000 * 30);
});
