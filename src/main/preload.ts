import { contextBridge, ipcRenderer } from 'electron';
import {
    DirectoryResponse,
    HFileResponse,
} from '../renderer/components/FrameContext/FrameContext.types';
import { OpenFile, SaveFile } from './util';

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

    /* Terminal Manager -------------------------------------------------- */
    terminalSend: (data: any) => ipcRenderer.send('terminal:send', data),
    terminalReceive: (callback: any) =>
        ipcRenderer.on('terminal:receive', (event, data) => {
            callback(data);
        }),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
