import chalk, { Color } from 'chalk';

type MessageType = 'main' | 'renderer' | 'default';

export default function(type: MessageType, message: string) {
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
