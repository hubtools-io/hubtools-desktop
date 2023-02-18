import { contextBridge, ipcRenderer } from 'electron';
import {
    DirectoryExpandResponse,
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
    closeDirectory: () => ipcRenderer.send('directory:close'),
    expandDirectory: (expandArray: string[]) =>
        ipcRenderer.send('directory:expand', expandArray),
    expandDirectoryResponse: (
        callback: (data: DirectoryExpandResponse) => void
    ) =>
        ipcRenderer.on('directory:expand-response', (_event, data) => {
            callback(data);
        }),

    /* File Manager ------------------------------------------------------ */
    openFile: (args: OpenFile) => ipcRenderer.send('file:open', args),
    fileResponse: (callback: (data: HFileResponse) => void) =>
        ipcRenderer.on('file:response', (event, data) => {
            callback(data);
        }),
    closeFile: () => ipcRenderer.send('file:close'),

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
