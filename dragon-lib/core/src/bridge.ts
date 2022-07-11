import { contextBridge } from 'electron';
import type { DragonAPPBridge } from './interfaces/bridge';

/**
 * 创建一个桥接器，用于与主进程通信
 */
export function createBridge<BridgeAPI>(
    bridgeId: string,
    bridgeAPI: BridgeAPI
): DragonAPPBridge<BridgeAPI> {
    return {
        id: bridgeId,
        api: bridgeAPI
    };
}

/**
 * 创建一个桥接器容器，用于组合桥接器
 */
export function createBridgeContainer(bridgeList: DragonAPPBridge<any>[]) {
    const exposeAPI = Object.create(null);

    for (const bridgeConf of bridgeList) {
        exposeAPI[bridgeConf.id] = bridgeConf.api;
    }

    contextBridge.exposeInMainWorld('__DRAGON_APP_BRIDGE__', exposeAPI);
}
