export function getPath(module: string, path: string | number | symbol) {
    return `${module}.${String(path)}`;
}
