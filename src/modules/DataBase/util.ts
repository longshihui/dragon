export function getPath(module: string, path: string) {
    if (module.trim() === '') {
        return path;
    }
    return `${module}.${path}`;
}
