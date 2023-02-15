import { contextBridge, ipcRenderer } from 'electron';
import {
    DirectoryResponse,
    HFile,
    HFileResponse,
} from '../renderer/components/FrameContext/FrameContext.types';

type OpenFile = {
    filePath: HFile['path'];
};

type SaveFile = {
    filePath: HFile['path'];
    contents: HFile['contents'];
};

const electronHandler = {
    /* Directory Manager ------------------------------------------------- */
    openDirectoryDialog: () => ipcRenderer.send('directory:open-dialog'),
    directoryResponse: (callback: (data: DirectoryResponse) => void) =>
        ipcRenderer.on('directory:response', (_event, data) => {
            callback(data);
        }),

    /* File Manager ------------------------------------------------------ */
    openFile: (args: OpenFile) => ipcRenderer.send('file:open', args),
    fileResponse: (callback: (data: HFileResponse) => void) =>
        ipcRenderer.on('file:response', (event, data) => {
            callback(data);
        }),

    saveFile: (args: SaveFile) => ipcRenderer.send('file:save', args),
    saveFileResponse: (callback: (data: HFileResponse) => void) =>
        ipcRenderer.on('file:save-response', (event, data) => {
            callback(data);
        }),

    /* Message Manager --------------------------------------------------- */
    receiveMsg: (callback: any) =>
        ipcRenderer.on('message:receive', (event, data) => {
            callback(data);
        }),

    // ----------------------
    // ----------------------
    // ----------------------
    // ----------------------
    // ----------------------
    // ----------------------
    reloadDirectory: (args: any) => ipcRenderer.send('reload-directory', args),
    watchDirectory: (callback: any) =>
        ipcRenderer.on('watch-directory', (event, data) => {
            callback(data);
        }),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
