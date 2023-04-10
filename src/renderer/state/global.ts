import { atom } from "recoil";


const msg = `
## Welcome To MarkOvEditor
---
[](../../../public/logo.jpg)
- This is a simple Markdown and Emacs Org mode editor and viewer capable of editing and operating file commands.
- By default it uses markdown renderer when the application is without a saved file.
`

const textEditorState = atom({
  key: 'textEditorState',
  default: msg
})

const fileExtensionState = atom({
  key: 'fileExtensionState',
  default: ''
})

export { textEditorState, fileExtensionState }
