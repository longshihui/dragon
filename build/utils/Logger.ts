import chalk, { Color } from 'chalk';

export function paint(
    level: 'success' | 'error' | 'warning' | 'info',
    text: string
) {
    let color: typeof Color = 'cyan';
    switch (level) {
        case 'success':
            color = 'green';
            break;
        case 'error':
            color = 'red';
            break;
        case 'warning':
            color = 'yellow';
            break;
    }
    return chalk[color].bold(text);
}

export function levelLog(
    level: 'success' | 'error' | 'warning' | 'info',
    message: string
) {
    console.log(paint(level, message));
}

export default function(
    type: 'main' | 'renderer' | 'default',
    message: string
) {
    let color: typeof Color = 'cyan';
    let title = '';
    let log = '';
    const columns = process.stdout.columns;
    let startPrefix = '┏  ';
    let endPrefix = '┗  ';
    switch (type) {
        case 'main': {
            color = 'red';
            title = 'Main';
            break;
        }
        case 'renderer': {
            color = 'yellow';
            title = 'Renderer';
            break;
        }
        default: {
            color = 'cyan';
            title = '主控';
        }
    }
    startPrefix += `${title} Process `;
    log += chalk[color].bold(
        `${startPrefix}${'-'.repeat(columns - startPrefix.length - 10)}`
    );
    log += '\n\n';
    log += message;
    log +=
        '\n\n' +
        chalk[color].bold('-'.repeat(columns - endPrefix.length - 10)) +
        '\n';
    console.log(log);
}
