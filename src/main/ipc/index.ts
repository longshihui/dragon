import { ipcMain } from 'electron';
import CreatePRIPCEvents from './create-pr';

const eventCollection = [...CreatePRIPCEvents.handles];

export default {
    register() {
        eventCollection.forEach(function({ event, mainProcessHandle }) {
            ipcMain.on(event, mainProcessHandle);
        });
    }
};
