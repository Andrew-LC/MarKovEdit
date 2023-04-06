export interface IMyAPI {
  doAThing: () => string
}

export interface IFileAPI {
  openFileData: () => string,
  saveFileData: (data: string) => string,
  saveFileCommand: (callback: any) => string
}

export interface IutilAPI {
  convertPathToAbsolute: (url: string) => string,
}

declare global {
  interface Window {
    myAPI: IMyAPI,
    fileAPI: IFileAPI,
    utilAPI: IutilAPI
  }
}
