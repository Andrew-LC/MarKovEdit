/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { dialog, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';

export function resolveHtmlPath(htmlFileName: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export function openFile(mainWindow: BrowserWindow) {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Markdown Files', extensions: ['md'] },
      { name: 'Org Files', extensions: ['org'] }
    ]
  }).then(result => {
    console.log(result.canceled)
    console.log(result.filePaths)
    fs.readFile(result.filePaths[0], (err, data) => {
      const newdata: string = data.toString();
      if (err) {
        console.error(err)
      }
      console.log(typeof newdata)
      mainWindow.webContents.send('file-data', newdata);
    })
  }).catch(err => {
    console.log(err)
  })
}


export function saveFile(data: string) {
  dialog.showSaveDialog({
    filters: [
      { name: 'Markdown Files', extensions: ['md'] },
      { name: 'Org Files', extensions: ['org'] }
    ]
  }).then(result => {
    console.log(result.canceled)
    console.log(result.filePath)
    console.log(data)
    fs.writeFile(`${result.filePath}`, data.toString(), (err) => {
      if (err) throw err;
    });
  })
}
