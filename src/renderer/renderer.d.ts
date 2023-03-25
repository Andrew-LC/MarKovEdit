export interface IMyAPI {
  doAThing: () => string
}

declare global {
  interface Window {
    myAPI: IMyAPI
  }
}
