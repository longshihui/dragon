import path from 'path';

export const STATIC_PATH =
    process.env.NODE_ENV === 'development'
        ? path.resolve(__dirname, '../', './public')
        : path.resolve(__dirname, './');

export function getIconAbsolutePath() {
    let subpath = './png/1024x1024.png';
    if (process.platform === 'darwin') {
        subpath = './mac/icon.icns';
    }
    if (process.platform === 'win32') {
        subpath = './win/icon.ico';
    }
    return path.resolve(STATIC_PATH, 'app-icon', subpath);
}

export function getLogoPngAbsolutePath() {
    return path.resolve(STATIC_PATH, 'app-icon', './png/1024x1024.png');
}
