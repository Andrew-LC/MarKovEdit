export interface IMyAPI {
  doAThing: () => string
}

export interface IFileAPI {
  openFileData: () => string,
  saveFileData: (data: any) => any,
  saveAsFileCommand: (callback: any) => string,
  saveFileCommand: (callback: any) => string,
  fileFormat: (callback: any) => string,
  newFile: (callback: any) => string,
}


declare global {
  interface Window {
    myAPI: IMyAPI,
    fileAPI: IFileAPI,
  }
}
