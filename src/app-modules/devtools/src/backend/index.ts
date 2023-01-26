/**
 * DevTools插件安装
 */
import ElectronDevtoolsInstaller, {
    VUEJS3_DEVTOOLS
} from 'electron-devtools-installer';
import { app } from 'electron';
import { useService } from '@dragon-app/core';

export default useService({
    id: 'devtools',
    setup: async function DevtoolSetup() {
        if (import.meta.env.DEV) {
            await app.whenReady();
            await ElectronDevtoolsInstaller(VUEJS3_DEVTOOLS, false);
        }
    }
});
