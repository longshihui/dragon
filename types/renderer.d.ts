export interface DragonAppRendererAPI {
    loadPreferences: () => Promise<void>;
}

declare global {
    interface Window {
        electronAPI: DragonAppRendererAPI;
    }
}
