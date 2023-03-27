import { atom, selector } from "recoil";

const textEditorState = atom({
  key: 'textEditorState',
  default: ''
})

export { textEditorState }
