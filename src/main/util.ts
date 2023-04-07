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
    if (result.canceled) {
      console.log("Canceled !")
    }
    fs.readFile(result.filePaths[0], (err, data) => {
      const newdata: object = { 'filename': result.filePaths[0], 'data': data.toString() };
      if (err) {
        console.error(err)
      }
      mainWindow.webContents.send('file-data', newdata);
    })
  }).catch(err => {
    console.log(err)
  })
}


export function saveFile(data: any) {
  if (!data.filename) {
    dialog.showSaveDialog({
      filters: [
        { name: 'Markdown Files', extensions: ['md'] },
        { name: 'Org Files', extensions: ['org'] }
      ]
    }).then(result => {
      console.log(result.canceled)
      console.log(result.filePath)
      console.log(data)
      fs.writeFile(`${result.filePath}`, data.data.toString(), (err) => {
        if (err) throw err;
      });
    })
  } else {
    fs.writeFile(`${data.filename}`, data.data.toString(), (err) => {
      if (err) throw err;
    });

  }
}

export function convertPathToAbsolute(url: string) {
  return path.resolve(url)
}
