import { atom, selector } from "recoil";

const value = `# WEB BASED ELECTRON EDITOR`

const textEditorState = atom({
  key: 'textEditorState',
  default: value
})

export { textEditorState }
