// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import path from 'path'
import { app } from 'electron'

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

    return () => {
      ipcRenderer.removeAllListeners('file-data')
    }
  },
  saveFileData: (data: any) => {
    ipcRenderer.send('save-file-command', data)
  },
  saveAsFileCommand: (callback: any) => {
    ipcRenderer.on('save-as-file', callback)
  },
  saveFileCommand: (callback: any) => {
    ipcRenderer.on('save-file', callback)

    return () => {
      ipcRenderer.removeAllListeners('save-file')
    }
  },
  fileFormat: (callback: any) => {
    ipcRenderer.on('file-format', callback)

    return () => {
      ipcRenderer.removeAllListeners('file-format')
    }
  },
  newFile: (callback: any) => {
    ipcRenderer.on('new-file', callback)

    return () => {
      ipcRenderer.removeAllListeners('file-format')
    }
  }
})


contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
