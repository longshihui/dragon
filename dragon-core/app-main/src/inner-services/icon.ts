/**
 * 图标相关的设置
 */
import { app } from 'electron';
import path from 'path';
import { useService } from '@dragon-app/core';

export default useService({
    id: 'app图标',
    async setup() {
        // if (process.platform === 'darwin') {
        //     app.dock.setIcon(
        //         path.resolve(STATIC_PATH, './app-icon/png/1024x1024.png')
        //     );
        // }
    }
});
