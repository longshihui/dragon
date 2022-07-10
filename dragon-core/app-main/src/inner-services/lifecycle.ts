import { app } from 'electron';
import { useService } from '@dragon-app/core';

export default useService({
    id: 'app生命周期监控',
    setup: async function LifecycleSetup() {
        app.on('window-all-closed', () => {
            // Respect the OSX convention of having the application in memory even
            // after all windows have been closed
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });
        return await app.whenReady();
    }
});
