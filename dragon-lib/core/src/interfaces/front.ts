import { Router } from 'vue-router';
import type { App } from 'vue';

export interface DragonBridgeAPI {
    [moduleId: string]: any;
}

export interface DragonModuleSetupContext {
    app: App;
    router: Router;
}

export interface DragonModuleSetup {
    (name: string, context: DragonModuleSetupContext): void;
}

declare global {
    interface Window {
        __DRAGON_APP_BRIDGE__: DragonBridgeAPI;
    }
}
