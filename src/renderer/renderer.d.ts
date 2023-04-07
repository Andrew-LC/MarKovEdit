export interface IMyAPI {
  doAThing: () => string
}

export interface IFileAPI {
  openFileData: () => string,
  saveFileData: (data: any) => any,
  saveFileCommand: (callback: any) => string,
}


declare global {
  interface Window {
    myAPI: IMyAPI,
    fileAPI: IFileAPI,
  }
}
