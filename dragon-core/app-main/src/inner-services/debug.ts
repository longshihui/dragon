/**
 * Debug相关安装程序
 */

import ElectronDebug from 'electron-debug';
import { useService } from '@dragon-app/core';

export default useService({
    id: 'Debug',
    async setup() {
        if (import.meta.env.DEV) {
            ElectronDebug();
        }
    }
});
