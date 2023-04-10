import { atom, selector } from "recoil";

const textEditorState = atom({
  key: 'textEditorState',
  default: ''
})

const fileExtensionState = atom({
  key: 'fileExtensionState',
  default: ''
})

export { textEditorState, fileExtensionState }
