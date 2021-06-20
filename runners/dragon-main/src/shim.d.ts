declare module '*.scss' {
    const classNameMap: any;
    export default classNameMap;
}

declare module '*.svg' {
    const url: string;
    export default url;
}

declare module '*.thead' {
    import { Worker } from 'worker_threads';
    export default class extends Worker {}
}
