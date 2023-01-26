import type { DragonModuleSetup } from './interfaces/front';
/**
 * 桥接器hook
 * 用于获取模块桥接器api，用于与主进程通信
 * @param moduleId 模块id
 * @returns
 */
export function useBridge<BridgeAPI>(bridgeId: string): BridgeAPI {
    return window.__DRAGON_APP_BRIDGE__[bridgeId];
}
/**
 * 创建一个模块前端
 * @param options
 */
export function createDragonModule(setup: DragonModuleSetup) {
    return setup;
}
