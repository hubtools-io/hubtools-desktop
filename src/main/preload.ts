import { contextBridge, ipcRenderer } from 'electron';

const electronHandler = {
  openDirectory: (args: any) => ipcRenderer.send('open-directory', args),
  reloadDirectory: (args: any) => ipcRenderer.send('reload-directory', args),
  getOpenDirectory: (callback: any) =>
    ipcRenderer.on('get-open-directory', (event, data) => {
      callback(data);
    }),
  watchDirectory: (callback: any) =>
    ipcRenderer.on('watch-directory', (event, data) => {
      callback(data);
    }),

  openFile: (args: any) => ipcRenderer.send('open-file', args),
  getOpenFile: (callback: any) =>
    ipcRenderer.on('get-open-file', (event, data) => {
      callback(data);
    }),

  saveFile: (args: any) => ipcRenderer.send('save-file', args),
  getSavedFile: (callback: any) =>
    ipcRenderer.on('get-saved-file', (event, data) => {
      callback(data);
    }),
  receiveMsg: (callback: any) =>
    ipcRenderer.on('receive-msg', (event, data) => {
      callback(data);
    }),
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
