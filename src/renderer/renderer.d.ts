export interface IMyAPI {
  doAThing: () => string
}

export interface IFileAPI {
  openFileData: () => string
}

declare global {
  interface Window {
    myAPI: IMyAPI,
    fileAPI: IFileAPI
  }
}
