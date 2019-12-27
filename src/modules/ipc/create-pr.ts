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
                const selectedDirectory = await new Promise(async function(
                    resolve
                ) {
                    const filePaths = await dialog.showOpenDialog(null, {
                        properties: ['openDirectory'],
                        buttonLabel: '选择文件夹'
                    });
                    if (Array.isArray(filePaths) && filePaths.length > 0) {
                        resolve(filePaths[0]);
                    } else {
                        resolve(null);
                    }
                });
                event.sender.send(
                    IPCEvents.SELECT_DIRECTORY,
                    selectedDirectory
                );
            }
        }
    ]
};
