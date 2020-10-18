import { levelLog } from './Logger';

if (!/yarn\.js$/.test(process.env.npm_execpath || '')) {
    levelLog('warning', `请使用yarn, 避免使用不同版本的包导致错误`);
}
