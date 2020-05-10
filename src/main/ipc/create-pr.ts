import { dialog } from 'electron';

const RENDER_NAME = 'create-pr';

export const IPCEvents = {
    SELECT_DIRECTORY: `${RENDER_NAME}/selectDirectory`
};

export default {
    renderName: RENDER_NAME,
    handles: [
        {
            event: IPCEvents.SELECT_DIRECTORY,
            mainProcessHandle: async event => {
                const { filePaths } = await await dialog.showOpenDialog(null, {
                    properties: ['openDirectory'],
                    buttonLabel: '选择文件夹'
                });
                let dir = null;
                if (filePaths.length > 0) {
                    dir = filePaths[0];
                }
                event.reply(IPCEvents.SELECT_DIRECTORY, dir);
            }
        }
    ]
};
