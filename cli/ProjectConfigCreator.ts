export interface ProjectConfig {
    entry: {
        main: string;
        renderer: string;
    };
    output: {
        path: string;
        mainFilename: string;
        rendererFilename: string;
    };
}

export default function (config: ProjectConfig) {
    return config;
}
