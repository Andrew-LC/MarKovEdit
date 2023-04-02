// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {
    console.log("Hello World !")
  }
})

contextBridge.exposeInMainWorld('fileAPI', {
  openFileData: (callback: any) => {
    ipcRenderer.on('file-data', callback)
  },
  saveFileData: (data: string) => {
    ipcRenderer.send('save-file-command', data)
  },
  saveFileCommand: (callback: any) => {
    ipcRenderer.on('save-file', callback)
  }
})


contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
